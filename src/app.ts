import { Hono } from "hono";
import { logger } from "hono/logger";
import { jwtRoutes } from "./routes/jwt";

const app = new Hono();

app.use("*", logger());
app.basePath("/api").route("/jwt", jwtRoutes);

export default app;
