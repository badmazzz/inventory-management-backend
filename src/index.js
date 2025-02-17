import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";
import mongoose from "mongoose";

dotenv.config({
  path: "../.env",
});
mongoose.set("strictQuery", true);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`The app is listening on ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("ERROR: ", err);
  });

/*
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("ERROR: ", error);
      throw error;
    });
      app.listen(process.env.PORT, () => {
          console.log(`App is listening on ${process.env.PORT}`)
      })
  } catch (error) {
    console.error("ERROR: ", error);
    throw error;
  }
})();
*/
