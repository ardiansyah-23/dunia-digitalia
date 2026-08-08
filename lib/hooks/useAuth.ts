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
    return { email: parsed.email, displayName: parsed.displayName || parsed.email, role: parsed.role || 'Customer' };
  } catch {
    return null;
  }
}

export function useAuth(): AuthState {
  const [user, setUser] = useState<AuthUser | null>(() => resolveLocalUser());
  const [loading, setLoading] = useState(() => {
    return resolveLocalUser() === null;
  });
  const resolvedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    const resolveRole = async (email: string, displayName?: string) => {
      const cached = roleCache.get(email.toLowerCase());
      if (cached) {
        if (!cancelled) {
          setUser({ email, displayName: cached.name || displayName || email, role: (cached.role as AuthUser['role']) || 'Customer' });
          setLoading(false);
          resolvedRef.current = true;
        }
        return;
      }

      try {
        const { data } = await supabase
          .from('users')
          .select('role, name')
          .eq('email', email.toLowerCase())
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

    const updateFromLocal = () => {
      const localUser = resolveLocalUser();
      if (localUser) {
        setUser(localUser);
        setLoading(false);
        resolveRole(localUser.email, localUser.displayName);
      } else {
        setUser(null);
        setLoading(false);
      }
    };

    // Initial check
    updateFromLocal();

    // Event listeners for login / logout in same or other tabs
    window.addEventListener('storage', updateFromLocal);
    window.addEventListener('auth_change', updateFromLocal);

    const unsubscribe = onAuthChange((sbUser) => {
      if (sbUser) {
        if (!resolvedRef.current) {
          resolveRole(sbUser.email || '', sbUser.user_metadata?.display_name);
        }
      } else {
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
      window.removeEventListener('storage', updateFromLocal);
      window.removeEventListener('auth_change', updateFromLocal);
      unsubscribe();
    };
  }, []);

  return { user, loading, isAuthenticated: !!user };
}
