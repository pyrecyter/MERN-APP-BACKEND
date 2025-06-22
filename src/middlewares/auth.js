import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) throw Error("Token not found");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) throw Error("Auth user not found");

    req.user = user.toJSON();
    next();
  } catch (error) {
    const message = "Not Authenticated";
    console.error(error);
    res.status(401).json({ message });
  }
};

export default auth;
