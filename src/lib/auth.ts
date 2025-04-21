import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is missing from the environment variables");
}
// Hash password
export const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, 10); // Hashing with a salt round of 10
};

// Verify password
export const verifyPassword = (
  password: string,
  hashedPassword: string
): boolean => {
  return bcrypt.compareSync(password, hashedPassword); // Check if password matches the hashed one
};

// Generate JWT Token
export const generateToken = (userId: number): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1d" }); // Expiry of 1 day
};

// Verify JWT Token
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET); // Verifying JWT
  } catch (err) {
    return null; // Return null if token is invalid or expired
  }
};
