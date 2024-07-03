import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

const corsOptions = {
  origin: "https://inventory-management-elvf.onrender.com",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Import router

import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
import purchaseRouter from "./routes/purchase.routes.js";
import storeRouter from "./routes/store.routes.js";
import sellRouter from "./routes/sell.routes.js";

//Route Declaration
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/purchase", purchaseRouter);
app.use("/api/v1/store", storeRouter);
app.use("/api/v1/sell", sellRouter);

export default app;
