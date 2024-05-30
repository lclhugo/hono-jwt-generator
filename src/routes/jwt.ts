require("dotenv").config();

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { sign } from "hono/jwt";

const jwtRequestSchema = z.object({
  sub: z.string().optional(),
  roles: z.array(z.string()).optional(),
  claims: z.record(z.string(), z.any()).optional(),
});

export const jwtRoutes = new Hono()
  // route /api/jwt/generate
  .post("/generate", zValidator("json", jwtRequestSchema), async (c) => {
    const { sub, roles, claims } = c.req.valid("json");

    const payload = {
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
    const token = await sign(payload, secret);

    return c.json({ token });
  });
