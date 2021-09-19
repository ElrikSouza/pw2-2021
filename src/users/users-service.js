import { CryptService } from "../crypt/crypt.js";
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

export const UsersService = {
  signUp,
};
