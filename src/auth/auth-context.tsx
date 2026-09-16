import * as React from "react";

type SessionUser = {
  name: string;
  email: string;
};

type StoredUser = SessionUser & {
  password: string;
};

type AuthContextValue = {
  user: SessionUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const USERS_KEY = "cartorioedu.users";
const SESSION_KEY = "cartorioedu.session";

function safeJsonParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function readUsers(): StoredUser[] {
  const parsed = safeJsonParse<StoredUser[]>(localStorage.getItem(USERS_KEY));
  return Array.isArray(parsed) ? parsed : [];
}

function writeUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function readSession(): SessionUser | null {
  const parsed = safeJsonParse<SessionUser>(localStorage.getItem(SESSION_KEY));
  if (!parsed) return null;
  if (typeof parsed.email !== "string" || typeof parsed.name !== "string") return null;
  return parsed;
}

function writeSession(user: SessionUser | null) {
  if (!user) {
    localStorage.removeItem(SESSION_KEY);
    return;
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

const AuthContext = React.createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<SessionUser | null>(() => readSession());

  const login = React.useCallback(async (email: string, password: string) => {
    const users = readUsers();
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!found || found.password !== password) {
      throw new Error("Email ou senha inválidos");
    }

    const sessionUser: SessionUser = { name: found.name, email: found.email };
    writeSession(sessionUser);
    setUser(sessionUser);
  }, []);

  const register = React.useCallback(async (name: string, email: string, password: string) => {
    const users = readUsers();
    const emailExists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());

    if (emailExists) {
      throw new Error("Este email já está cadastrado");
    }

    const next: StoredUser = { name, email, password };
    writeUsers([...users, next]);

    const sessionUser: SessionUser = { name, email };
    writeSession(sessionUser);
    setUser(sessionUser);
  }, []);

  const logout = React.useCallback(() => {
    writeSession(null);
    setUser(null);
  }, []);

  const value = React.useMemo<AuthContextValue>(
    () => ({ user, login, register, logout }),
    [user, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
