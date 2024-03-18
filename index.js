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
import { updateItem } from "./api/updateItem.js";
import { deleteItem } from "./api/deleteItem.js";
import { getUsers } from "./api/getUsers.js";
import { changeRole } from "./api/changeRole.js";
import { middleWareAdmin, middleWareSuperAdmin } from "./api/tokens.js";
import cookieParser from "cookie-parser";
import { createOrder } from "./api/createOrder.js";
import { middleWareUser } from "./api/middleWareUser.js";
import { getOrders } from "./api/getOrders.js";
import { getPopularItems } from "./api/getPopularItems.js";
import { findAddress } from "./api/findAddress.js";
import { sendRating } from "./api/setRating.js";
import { getItem } from "./api/getItem.js";
import { getReviews } from "./api/getReviews.js";
import { getAllReviews } from "./api/getAllReviews.js";
import { deleteReview } from "./api/deleteReview.js";
import { approveReview } from "./api/approveReview.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;

config();

const staticFilesPath = path.join(__dirname, "dist");
app.use(express.static(staticFilesPath));
app.use(express.json());
app.use(
  cors({ origin: "https://guitars-store.onrender.com", credentials: true })
  // cors({ origin: "http://localhost:5173", credentials: true })
);
app.use(cookieParser());
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.sendFile(path.join(staticFilesPath, "index.html"));
});
app.get("/admin", middleWareSuperAdmin, (req, res) => {
  res.sendFile(path.join(staticFilesPath, "index.html"));
});
app.get("/reviews", middleWareSuperAdmin, (req, res) => {
  res.sendFile(path.join(staticFilesPath, "index.html"));
});

app.get("/profile", middleWareUser, (req, res) => {
  res.sendFile(path.join(staticFilesPath, "index.html"));
});

app.get("/catalog", (req, res) => {
  res.sendFile(path.join(staticFilesPath, "index.html"));
});
app.post(
  "/api/add",
  middleWareAdmin,
  upload.single("image"),
  async (req, res) => {
    const { title, cost, category, description, property } = req.body;
    const image = req.file;
    await addItem(
      title,
      cost,
      category,
      image.buffer,
      image.mimetype,
      description,
      property
    );
    res.json(true);
  }
);

app.post(
  "/api/update",
  middleWareAdmin,
  upload.single("image"),
  async (req, res) => {
    const { title, cost, category, id, description, property } = req.body;
    const image = req.file;
    let imgData = null;
    let imgType = null;
    if (image) {
      imgData = image.buffer;
      imgType = image.mimetype;
    }
    console.log(description, property);
    await updateItem(
      title,
      cost,
      category,
      imgData,
      imgType,
      id,
      description,
      property
    );
  }
);

app.delete("/api/deleteItem/:id", middleWareAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await deleteItem(id);
    res.json("ok");
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/sign_up", async (req, res) => {
  const { name, email, pass } = req.body;
  const response = await addUser(name, email, pass);
  res.json(response);
});

app.get("/api/getOrders", middleWareUser, async (req, res) => {
  const refreshToken = req.cookies.refresh;
  const orders = await getOrders(refreshToken);
  res.json(orders);
});

app.patch("/api/changeRole", middleWareSuperAdmin, async (req, res) => {
  try {
    const { id, role } = req.body;
    await changeRole(id, role);
    res.json("ok");
  } catch (error) {
    console.log(error);
  }
});
app.get("/api/getUsers", async (req, res) => {
  const users = await getUsers();
  res.json(users);
});

app.get("/api/popularItems", async (req, res) => {
  const items = await getPopularItems();
  res.json(items);
});

app.get("/api/findAddress", async (req, res) => {
  const address = req.query.address;
  const addresses = await findAddress(address);
  res.json(addresses);
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

app.post("/api/makeOrder", async (req, res) => {
  const { email, name, items, address } = req.body;
  const response = await createOrder(email, name, items, address);
  res.json(response);
});

app.patch("/api/setRating/:id", middleWareUser, async (req, res) => {
  const id = req.params.id;
  const { rating, review } = req.body;
  const response = await sendRating(id, rating, review, req.user);
  res.json(response);
});

app.get("/api/getItem", async (req, res) => {
  const id = req.query.id;
  const response = await getItem(id);
  res.json(response);
});

app.get("/api/getReviews", async (req, res) => {
  const id = req.query.id;
  const response = await getReviews(id);
  res.json(response);
});

app.get("/api/getAllReviews", middleWareAdmin, async (req, res) => {
  const response = await getAllReviews();
  res.json(response);
});

app.delete("/api/review/:id", middleWareAdmin, async (req, res) => {
  const id = req.params.id;
  const response = await deleteReview(id);
  res.json(response);
});

app.patch("/api/review", middleWareAdmin, async (req, res) => {
  const { id } = req.body;
  const response = await approveReview(id);
  res.json(response);
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
  db(process.env.DB_URL);
});
