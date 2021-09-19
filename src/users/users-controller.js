import { wrapWithErrorHandling } from "../errors/error-handling.js";
import { UsersService } from "./users-service.js";

const signUp = wrapWithErrorHandling(async (req, res) => {
  const { body: user } = req;

  await UsersService.signUp(user);

  return res.status(201).send({ message: "User has been created." });
});

export const UsersController = {
  signUp,
};
