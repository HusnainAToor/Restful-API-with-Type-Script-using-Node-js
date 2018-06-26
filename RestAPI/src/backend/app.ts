import express from "express";
import { getUsersRouter } from "./controllers/users_controller";
import { getLinksRouter } from "./controllers/links_controller";
import { getAuthRouter } from "./controllers/auth_controller";

export async function getApp() {
    const app = express();
    app.use("/api/v1/users", getUsersRouter());
    app.use("/api/v1/link", getLinksRouter());
    return app;
}
