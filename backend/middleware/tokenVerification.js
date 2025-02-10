import jwt from "jsonwebtoken";
import "dotenv/config";

const jwtSecret = process.env.JWT_SECRET;

export default function tokenVerification(req, res, next) {
  const token = req.cookies?.token;
  if (token) {
    const isVerified = jwt.verify(token, jwtSecret);
    req.user = isVerified;
  } else {
    res.status(401).json("Unauthorized");
    return;
  }
  next();
}
