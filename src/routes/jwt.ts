// src/routes/jwtRoutes.ts
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { FetchFromEnv } from "../utils/env";
import { generateToken } from "../utils/tokenGenerator";

const jwtRequestSchema = z.object({
  sub: z.string().optional(),
  roles: z.array(z.string()).optional(),
  claims: z.record(z.string(), z.any()).optional(),
});

export const jwtRoutes = new Hono().post(
  "/generate",
  zValidator("json", jwtRequestSchema),
  async (c) => {
    const { sub, roles, claims } = c.req.valid("json");

    const token = await generateToken({ sub, roles, claims });

    return c.json({ token });
  }
);
