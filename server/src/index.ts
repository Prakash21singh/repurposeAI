import express, { NextFunction, Response } from "express";
import { config } from "./config";
import userRoute from "./routes/user.route";
import { ResponseUtil } from "./utils/index";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb" }));

app.use("/api/user", userRoute);

app.use((err: Error, _: any, res: Response, next: NextFunction) => {
  if (err) {
    console.log(err);
    res.json(ResponseUtil.error(err.message, 400));
  }
  next();
});

app.listen(config.PORT, () => {
  console.log(`App is listening on port : ${config.PORT}`);
});
