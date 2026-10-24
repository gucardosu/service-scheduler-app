import express from "express";
import healthRoutes from "./modules/health/routes/health.routes.js";
import userRoutes from "./modules/user/routes/user.routes.js";

const app = express();

app.use(express.json());
app.use(healthRoutes);
app.use(userRoutes);

export default app;
