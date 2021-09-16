import Express, { json } from "express";
import { errorHandlingMiddleware } from "./errors/error-handler.middleware.js";

export const app = Express();

app.use(json());
app.use(errorHandlingMiddleware);
