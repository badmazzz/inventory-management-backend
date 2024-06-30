import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
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

//Route Declaration
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/purchase", purchaseRouter);
app.use("/api/v1/store", storeRouter);

export default app;
