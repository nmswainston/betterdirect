'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type User = {
  email: string;
  name?: string;
  role?: string;
};

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
};

const AUTH_COOKIE_NAME = 'bd_auth';
const USER_STORAGE_KEY = 'bd_user';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function parseAuthCookie() {
  if (typeof document === 'undefined') return false;

  return document.cookie.split('; ').some((cookie) => cookie.startsWith(`${AUTH_COOKIE_NAME}=`));
}

function readStoredUser(): User | null {
  if (typeof window === 'undefined') return null;

  const stored = localStorage.getItem(USER_STORAGE_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored) as User;
  } catch (error) {
    console.error('Failed to parse stored user', error);
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasAuthCookie = parseAuthCookie();
    const storedUser = readStoredUser();

    if (hasAuthCookie && storedUser) {
      setUser(storedUser);
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }

    setIsLoading(false);
  }, []);

  const login = (userData: User) => {
    setIsLoading(true);

    document.cookie = `${AUTH_COOKIE_NAME}=1; path=/; max-age=604800; SameSite=Lax`;
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    setUser(userData);

    setIsLoading(false);
  };

  const logout = () => {
    document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
    localStorage.removeItem(USER_STORAGE_KEY);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      logout,
    }),
    [isLoading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

