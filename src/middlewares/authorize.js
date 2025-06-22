import { rolePermissions } from "../config/permissions.js";
const message = "Permission denied";

const authorize = (permission) => (req, res, next) => {
  try {
    const role = req.user.role;

    const havePermission = rolePermissions[role].includes(permission);
    if (!havePermission) throw Error(message);

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message });
  }
};

export default authorize;
