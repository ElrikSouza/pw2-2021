import { Roles } from "./role.model.js";

let userRole = null;

const getUserRoleId = async () => {
  if (userRole != null) {
    return userRole.role_id;
  }

  userRole = await Roles.findOne({ where: { role_name: "USER" } });

  return userRole.role_id;
};

export const RolesService = { getUserRoleId };
