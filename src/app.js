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
import tableRouter from "./routes/table.routes.js";
import menuRouter from "./routes/menu.routes.js";
import orderRouter from "./routes/order.routes.js"

//Route Declaration
app.use("/api/v1/user", userRouter);
app.use("/api/v1/table", tableRouter);
app.use("/api/v1/menu", menuRouter);
app.use("/api/v1/order", orderRouter);

export default app;
