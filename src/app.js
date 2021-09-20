import Express, { json } from "express";
import { errorHandlingMiddleware } from "./errors/error-handler.middleware.js";
import { UsersModule } from "./users/users-routes.js";
import { ProductsModule } from "./products/products-routes.js";

export const app = Express();

app.use(json());
app.use(UsersModule);
app.use(ProductsModule);
app.use(errorHandlingMiddleware);
