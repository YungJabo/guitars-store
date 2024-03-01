export const middleWareUser = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refresh;
    const decodedAccess = jwt.verify(refreshToken, secretKey);
    if (decodedAccess) {
      const { email } = decodedAccess;
      const user = await UserModel.findOne({ email: email }); // Находим пользователя в базе данных по email
      if (user) {
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
