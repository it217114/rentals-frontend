import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import type { Role } from "../types";
import type { ReactElement } from "react";

export function RequireAuth({ children }: { children: ReactElement }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export function RequireRole({ roles, children }: { roles: Role[]; children: ReactElement }) {
  const { token, roles: myRoles } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  if (!roles.some(r => myRoles.includes(r))) return <Navigate to="/" replace />;
  return children;
}
