import express from "express";
import { db } from "./db.js";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import cors from "cors";
import path from "path";
import multer from "multer";
import { addItem } from "./api/addItem.js";
import { getItems } from "./api/getItems.js";
import { addUser } from "./api/addUser.js";
import { loginUser } from "./api/loginUser.js";
import { refreshToken, verifyToken } from "./api/tokens.js";
import { getUser } from "./api/tokens.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;

config();

const staticFilesPath = path.join(__dirname, "dist");
app.use(express.static(staticFilesPath));
app.use(express.json());
app.use(cors({ origin: "*" }));
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.sendFile(path.join(staticFilesPath, "index.html"));
});
app.get("/admin", (req, res) => {
  res.sendFile(path.join(staticFilesPath, "index.html"));
});
app.post("/api/add", upload.single("image"), async (req, res) => {
  const { title, cost, category } = req.body;
  const image = req.file;
  await addItem(title, cost, category, image.buffer, image.mimetype);
});

app.post("/api/sign_up", async (req, res) => {
  const { name, email, pass } = req.body;
  const response = await addUser(name, email, pass);
  res.json(response);
});

app.post("/api/login", async (req, res) => {
  const { email, pass } = req.body;
  const response = await loginUser(email, pass);
  res.json(response);
});
app.get("/api/verify-token", async (req, res) => {
  const response = await verifyToken(req.headers.access);
  res.json(response);
});
app.get("/api/refresh-token", async (req, res) => {
  const response = await refreshToken(req.headers.refresh);
  res.json(response);
});
app.get("/api/getItems", async (req, res) => {
  try {
    const items = await getItems();
    res.json(items);
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/getUser", async (req, res) => {
  const response = await getUser(req.headers.access);
  res.json(response);
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
  db(process.env.DB_URL);
});
