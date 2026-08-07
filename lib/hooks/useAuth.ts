'use client';

import { useState, useEffect, useRef } from 'react';
import { onAuthChange } from '@/lib/supabase/auth';
import { supabase } from '@/lib/supabase/config';

export interface AuthUser {
  email: string;
  displayName?: string;
  role: 'Super Admin' | 'Admin' | 'Customer';
}

export interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
}

// Cache role lookups to avoid repeated Supabase queries within the same session
const roleCache = new Map<string, { role: string; name: string }>();

function resolveLocalUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem('admin_demo_user');
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed?.email) return null;
    // Fast-path for admin demo account — no DB query needed
    if (parsed.email.toLowerCase() === 'admin@duniadigitalia.com') {
      return { email: parsed.email, displayName: parsed.displayName || 'Admin Utama', role: 'Super Admin' };
    }
    // Return a preliminary user immediately (role resolved async below)
    return { email: parsed.email, displayName: parsed.displayName || parsed.email, role: 'Customer' };
  } catch {
    return null;
  }
}

export function useAuth(): AuthState {
  // Resolve localStorage synchronously to avoid blank flash
  const [user, setUser] = useState<AuthUser | null>(() => resolveLocalUser());
  const [loading, setLoading] = useState(() => {
    // If we already resolved a user from localStorage, skip the loading state
    return resolveLocalUser() === null;
  });
  const resolvedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    const resolveRole = async (email: string, displayName?: string) => {
      // Admin demo — instant, no DB call
      if (email.toLowerCase() === 'admin@duniadigitalia.com') {
        if (!cancelled) {
          setUser({ email, displayName: displayName || 'Admin Utama', role: 'Super Admin' });
          setLoading(false);
          resolvedRef.current = true;
        }
        return;
      }

      // Check cache first
      const cached = roleCache.get(email.toLowerCase());
      if (cached) {
        if (!cancelled) {
          setUser({ email, displayName: cached.name || displayName || email, role: (cached.role as AuthUser['role']) || 'Customer' });
          setLoading(false);
          resolvedRef.current = true;
        }
        return;
      }

      // Query users table once
      try {
        const { data } = await supabase
          .from('users')
          .select('role, name')
          .eq('email', email)
          .maybeSingle();

        if (!cancelled) {
          const role = (data?.role as AuthUser['role']) || 'Customer';
          const name = data?.name || displayName || email;
          roleCache.set(email.toLowerCase(), { role, name });
          setUser({ email, displayName: name, role });
          setLoading(false);
          resolvedRef.current = true;
        }
      } catch {
        if (!cancelled) {
          setUser({ email, displayName: displayName || email, role: 'Customer' });
          setLoading(false);
          resolvedRef.current = true;
        }
      }
    };

    // 1. Check localStorage immediately
    const localUser = resolveLocalUser();
    if (localUser) {
      // If it's admin, we already have the full user — just ensure role is resolved
      if (localUser.role === 'Super Admin') {
        setUser(localUser);
        setLoading(false);
        resolvedRef.current = true;
      } else {
        // For non-admin, resolve actual role from DB
        setUser(localUser); // Show immediately with preliminary role
        setLoading(false);  // Don't block rendering
        resolveRole(localUser.email, localUser.displayName);
      }
    }

    // 2. Listen for Supabase auth state changes (covers real Supabase Auth sessions)
    const unsubscribe = onAuthChange((sbUser) => {
      if (sbUser) {
        // Only process if we haven't already resolved from localStorage
        if (!resolvedRef.current) {
          resolveRole(sbUser.email || '', sbUser.user_metadata?.display_name);
        }
      } else {
        // No Supabase session — check localStorage fallback
        if (!resolvedRef.current) {
          const stored = resolveLocalUser();
          if (stored) {
            resolveRole(stored.email, stored.displayName);
          } else {
            if (!cancelled) {
              setUser(null);
              setLoading(false);
            }
          }
        }
      }
    });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  return { user, loading, isAuthenticated: !!user };
}
