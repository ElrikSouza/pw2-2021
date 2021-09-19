import { CryptService } from "../crypt/crypt.js";
import { BadRequest, Unauthenticated } from "../errors/errors.js";
import { JwtService } from "../jwt/jwt-service.js";
import { RolesService } from "../roles/role-service.js";
import { Users } from "./users.model.js";

const signUp = async (user) => {
  const hashedPassword = await CryptService.hashPassword(user.password);
  const userRoleId = await RolesService.getUserRoleId();

  await Users.create({
    role_id: userRoleId,
    password: hashedPassword,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  });
};

const signIn = async (user) => {
  if (typeof user.password !== "string") {
    throw new BadRequest("Password not found");
  }

  const userRegister = await Users.findOne({
    where: { email: user.email },
    attributes: ["user_id", "password"],
  });

  const doPasswordsMatch = await CryptService.comparePassword(
    user.password,
    userRegister.password
  );

  if (!doPasswordsMatch) {
    throw new Unauthenticated("Wrong password.");
  }

  const token = JwtService.createToken(userRegister.user_id);

  return token;
};

export const UsersService = {
  signUp,
  signIn,
};
