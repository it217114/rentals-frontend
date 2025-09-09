import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import type { AuthTokenPayload, Role } from "../types";

type AuthCtx = {
  email: string | null;
  roles: Role[];
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (body: {email:string;fullName:string;password:string;roles?:Role[]}) => Promise<void>;
  logout: () => void;
  hasRole: (r: Role) => boolean;
};

const Ctx = createContext<AuthCtx>(null as any);

function decodePayload(token: string): AuthTokenPayload | null {
  try {
    const part = token.split(".")[1];
    const json = atob(part.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json);
  } catch { return null; }
}

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  const payload = useMemo(() => token ? decodePayload(token) : null, [token]);
  const email = payload?.sub ?? null;
  const roles: Role[] = (payload?.roles as Role[]) ?? [];

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE}/auth/login`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error("Login failed");
    const data = await res.json();
    setToken(data.token);
  };

  const register = async (body: {email:string;fullName:string;password:string;roles?:Role[]}) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE}/auth/register`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(body)
    });
    if (!res.ok) {
      const t = await res.text();
      throw new Error(`Register failed: ${t}`);
    }
  };

  const logout = () => setToken(null);
  const hasRole = (r: Role) => roles.includes(r);

  const value: AuthCtx = { email, roles, token, login, register, logout, hasRole };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useAuth = () => useContext(Ctx);
