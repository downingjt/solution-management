import React from 'react';
import { AlertCircle, Mail, Lock } from 'lucide-react';

interface AuthFormProps {
  isSignUp: boolean;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  setIsSignUp: (isSignUp: boolean) => void;
  handleAuth: (e: React.FormEvent) => Promise<void>;
  error: string | null;
}

export function AuthForm({
  isSignUp,
  email,
  setEmail,
  password,
  setPassword,
  setIsSignUp,
  handleAuth,
  error
}: AuthFormProps) {
  return (
    <div className="bg-dark-card p-8 rounded-lg shadow-xl w-full max-w-md">
      <h1 className="text-2xl font-bold text-gray-100 mb-6">
        {isSignUp ? 'Create Account' : 'Sign In'}
      </h1>

      {error && (
        <div className="bg-red-900/50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-300">{error}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleAuth} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email address
          </label>
          <div className="mt-1 relative">
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field appearance-none block w-full px-3 py-2 pl-10"
            />
            <Mail className="h-5 w-5 text-gray-500 absolute left-3 top-2.5" />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">
            Password
          </label>
          <div className="mt-1 relative">
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field appearance-none block w-full px-3 py-2 pl-10"
            />
            <Lock className="h-5 w-5 text-gray-500 absolute left-3 top-2.5" />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="btn-primary w-full flex justify-center"
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </form>

      <div className="mt-6">
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="w-full text-center text-sm text-primary hover:text-primary-hover"
        >
          {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
        </button>
      </div>
    </div>
  );
}