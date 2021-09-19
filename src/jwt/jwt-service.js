import jwt from "jsonwebtoken";

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;

  if (typeof secret !== "string") {
    console.error("Critical error: JWT_SECRET is undefined.");
    process.exit(1);
  }

  return secret;
};

const secret = getJwtSecret();

const createToken = (user_id) => {
  return jwt.sign({ user_id }, secret, { expiresIn: "2d" });
};

export const JwtService = { createToken };
