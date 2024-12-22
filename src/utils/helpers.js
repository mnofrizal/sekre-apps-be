import { randomBytes } from "crypto";
import { nanoid } from "nanoid";

export const generateToken = () => {
  return nanoid(
    6,
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  ).toUpperCase();
};
