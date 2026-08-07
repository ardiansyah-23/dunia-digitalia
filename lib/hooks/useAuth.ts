'use client';

import { useState, useEffect } from 'react';
import { onAuthChange } from '@/lib/supabase/auth';
import { supabase } from '@/lib/supabase/config';

export interface AuthState {
  user: { email: string; displayName?: string; role: 'Super Admin' | 'Admin' | 'Customer' } | null;
  loading: boolean;
  isAuthenticated: boolean;
}

export function useAuth(): AuthState {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleUserSession = async (email: string, displayName?: string) => {
      setLoading(true);
      // Hardcoded fallback for the admin demo login
      if (email.toLowerCase() === 'admin@duniadigitalia.com') {
        setUser({
          email,
          displayName: displayName || 'Admin Utama',
          role: 'Super Admin',
        });
        setLoading(false);
        return;
      }

      try {
        // Query users table for real-time role
        const { data, error } = await supabase
          .from('users')
          .select('role, name')
          .eq('email', email)
          .maybeSingle();

        if (data) {
          setUser({
            email,
            displayName: data.name || displayName || email,
            role: data.role || 'Customer',
          });
        } else {
          // If user not in database, fallback to Customer
          setUser({
            email,
            displayName: displayName || email,
            role: 'Customer',
          });
        }
      } catch (err) {
        console.error('Error loading user role:', err);
        setUser({
          email,
          displayName: displayName || email,
          role: 'Customer',
        });
      } finally {
        setLoading(false);
      }
    };

    // Check localStorage demo user first
    const demoUserStr = typeof window !== 'undefined' ? localStorage.getItem('admin_demo_user') : null;
    if (demoUserStr) {
      try {
        const demoUser = JSON.parse(demoUserStr);
        handleUserSession(demoUser.email, demoUser.displayName);
        return;
      } catch (e) {
        console.error(e);
      }
    }

    const unsubscribe = onAuthChange((sbUser) => {
      if (sbUser) {
        handleUserSession(sbUser.email || '', sbUser.user_metadata?.display_name);
      } else {
        const stored = localStorage.getItem('admin_demo_user');
        if (stored) {
          try {
            const demoUser = JSON.parse(stored);
            handleUserSession(demoUser.email, demoUser.displayName);
          } catch {
            setUser(null);
            setLoading(false);
          }
        } else {
          setUser(null);
          setLoading(false);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, loading, isAuthenticated: !!user };
}
