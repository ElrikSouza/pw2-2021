import { wrapWithErrorHandling } from "../errors/error-handling.js";
import { UserService } from "./user-service.js";

const signUp = wrapWithErrorHandling(async (req, res) => {
  const { body: user } = req;

  await UserService.signUp(user);

  return res.status(201).send({ message: "User has been created." });
});

export const UserController = {
  signUp,
};
