import { sign } from "hono/jwt";

interface TokenPayload {
  sub?: string;
  roles?: string[];
  claims?: Record<string, any>;
}

export async function generateToken(payload: TokenPayload): Promise<string> {
  const { sub, roles, claims } = payload;

  const tokenPayload = {
    ...(sub ? { sub } : {}),
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": roles,
    ...Object.fromEntries(Object.entries(claims || {})),
    iss: process.env.JWT_ISSUER,
    aud: process.env.JWT_AUDIENCE,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 hours
  };

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set");
  }

  const token = await sign(tokenPayload, secret);
  return token;
}
