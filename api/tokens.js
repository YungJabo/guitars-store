import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { UserModel } from "../schemas/userSchema.js";

config();

const secretKey = process.env.JWT_SECRET;
export const createTokens = async (email) => {
  const accessToken = jwt.sign({ email: email }, secretKey, {
    expiresIn: "2h",
  });
  const refreshToken = jwt.sign({ email: email }, secretKey, {
    expiresIn: "2d",
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
        email: user.email,
        role: user.role,
      };
    }
  } catch (error) {
    return false;
  }
};

export const middleWareAdmin = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refresh;
    const decodedAccess = jwt.verify(refreshToken, secretKey);

    if (decodedAccess) {
      const { email } = decodedAccess;
      const user = await UserModel.findOne({ email: email }); // Находим пользователя в базе данных по email
      if (user && (user.role === "admin" || user.role === "superadmin")) {
        req.user = user; // Добавляем информацию о пользователе в объект запроса для последующего использования
        next(); // Продолжаем выполнение запроса
      } else {
        res
          .status(403)
          .json({ error: "Access denied. Admin permissions required." });
      }
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const middleWareSuperAdmin = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refresh;
    const decodedAccess = jwt.verify(refreshToken, secretKey);
    console.log(refreshToken);
    if (decodedAccess) {
      const { email } = decodedAccess;
      const user = await UserModel.findOne({ email: email }); // Находим пользователя в базе данных по email
      if (user && user.role === "superadmin") {
        req.user = user; // Добавляем информацию о пользователе в объект запроса для последующего использования
        next(); // Продолжаем выполнение запроса
      } else {
        res
          .status(403)
          .json({ error: "Access denied. Admin permissions required." });
      }
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unauthorized" });
  }
};
