export type Role = "ADMIN" | "OWNER" | "TENANT";

export interface AuthTokenPayload {
  sub: string;           // email
  roles?: Role[];        // από το JWT claims
  exp?: number;
  iat?: number;
}

export interface Property {
  id: number;
  title: string;
  type: string;
  city: string;
  address?: string;
  price: number;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  status: "PENDING_APPROVAL" | "APPROVED" | "REJECTED" | "ARCHIVED";
}
