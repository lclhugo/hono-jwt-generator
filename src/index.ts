import { serve } from "@hono/node-server";
import app from "./app";
require("dotenv").config();

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
