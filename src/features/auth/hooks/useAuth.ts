import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabaseClient } from '../../../lib/supabase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    if (!supabaseClient) return;

    // Check current session
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    if (!supabaseClient) return;

    try {
      setError(null);
      setAuthLoading(true);

      if (isSignUp) {
        const { error } = await supabaseClient.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabaseClient.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setAuthLoading(false);
    }
  }

  async function handleSignOut() {
    if (!supabaseClient) return;
    await supabaseClient.auth.signOut();
  }

  return {
    user,
    setUser,
    authLoading,
    setAuthLoading,
    error,
    setError,
    email,
    setEmail,
    password,
    setPassword,
    isSignUp,
    setIsSignUp,
    handleAuth,
    handleSignOut
  };
}