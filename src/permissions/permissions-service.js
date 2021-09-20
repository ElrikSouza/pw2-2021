import { Roles } from "../roles/role.model.js";
import { Users } from "../users/users.model.js";

const isUserAdm = async (user_id) => {
  const { role_id } = await Users.findOne({
    where: { user_id },
    attributes: ["role_id"],
  });

  const { role_name } = await Roles.findOne({
    where: { role_id },
    attributes: ["role_name"],
  });

  return role_name === "ADM";
};

export const PermissionsService = {
  isUserAdm,
};
