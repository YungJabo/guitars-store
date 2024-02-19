import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { UserModel } from "../schemas/userSchema.js";

config();

const secretKey = process.env.JWT_SECRET;
export const createTokens = async (email) => {
  const accessToken = jwt.sign({ email: email }, secretKey, {
    expiresIn: "10s",
  });
  const refreshToken = jwt.sign({ email: email }, secretKey, {
    expiresIn: "4m",
  });

  return { accessToken, refreshToken };
};

export const verifyToken = async (access) => {
  try {
    const decodedAccess = jwt.verify(access, secretKey);
    if (decodedAccess) {
      return true;
    }
  } catch (error) {
    return false;
  }
};

export const refreshToken = async (refresh) => {
  try {
    const decodedRefresh = jwt.verify(refresh, secretKey);
    if (decodedRefresh) {
      const newTokens = await createTokens(decodedRefresh.email);
      return newTokens;
    }
  } catch (error) {
    return false;
  }
};

export const getUser = async (access) => {
  try {
    const decodedAccess = jwt.verify(access, secretKey);
    if (decodedAccess) {
      const { email } = decodedAccess;
      const user = await UserModel.findOne({ email: email });
      return {
        name: user.name,
      };
    }
  } catch (error) {
    return false;
  }
};
