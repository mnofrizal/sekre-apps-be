import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config/index.js";
import { ApiError } from "../utils/ApiError.js";
import * as userService from "./user.service.js";

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};

export const login = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new ApiError(401, "Invalid email or password");
  }

  const accessToken = generateAccessToken(user.id);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    },
    accessToken,
  };
};

export const register = async (userData) => {
  const existingUser = await userService.getUserByEmail(userData.email);
  if (existingUser) {
    throw new ApiError(409, "Email already exists");
  }

  const hashedPassword = await bcrypt.hash(
    userData.password,
    config.bcrypt.rounds
  );

  const user = await userService.createUser({
    ...userData,
    password: hashedPassword,
  });

  const accessToken = generateAccessToken(user.id);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    },
    accessToken,
  };
};
