'use client';

import { useState, useEffect } from 'react';
import { onAuthChange } from '@/lib/supabase/auth';

export interface AuthState {
  user: { email: string; displayName?: string } | null;
  loading: boolean;
  isAuthenticated: boolean;
}

export function useAuth(): AuthState {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage demo user first for local dev testing
    const demoUser = typeof window !== 'undefined' ? localStorage.getItem('admin_demo_user') : null;
    if (demoUser) {
      try {
        setUser(JSON.parse(demoUser));
        setLoading(false);
        return;
      } catch (e) {
        console.error(e);
      }
    }

    const unsubscribe = onAuthChange((sbUser) => {
      if (sbUser) {
        setUser({
          email: sbUser.email,
          displayName: sbUser.user_metadata?.display_name || sbUser.email,
        });
      } else {
        const stored = localStorage.getItem('admin_demo_user');
        setUser(stored ? JSON.parse(stored) : null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { user, loading, isAuthenticated: !!user };
}
