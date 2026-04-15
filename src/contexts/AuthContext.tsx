import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

export type AuthUser = {
  name: string;
  email: string;
  emailVerified: boolean;
};

type AuthContextValue = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (user: { name: string; email: string }) => void;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  verifyEmail: (code: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = useCallback((u: { name: string; email: string }) => {
    setUser({ name: u.name, email: u.email, emailVerified: true });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const register = useCallback(async (name: string, email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 400));
    setUser({
      name,
      email,
      emailVerified: false,
    });
  }, []);

  const verifyEmail = useCallback(async (code: string) => {
    const digits = code.replace(/\D/g, '');
    if (digits.length !== 6) {
      throw new Error('Please enter the 6-digit code.');
    }
    await new Promise((r) => setTimeout(r, 400));
    setUser((prev) => (prev ? { ...prev, emailVerified: true } : prev));
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated: user !== null,
      user,
      login,
      logout,
      register,
      verifyEmail,
    }),
    [user, login, logout, register, verifyEmail],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
