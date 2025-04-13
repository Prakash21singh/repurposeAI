"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const user_route_1 = __importDefault(require("./routes/user.route"));
const index_1 = require("./utils/index");
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ limit: "10mb" }));
app.use("/api/user", user_route_1.default);
app.use((err, _, res, next) => {
  if (err) {
    res.json(index_1.ResponseUtil.error(err.message, 500));
  }
  next();
});
app.listen(config_1.config.PORT, () => {
  console.log(`App is listening on port : ${config_1.config.PORT}`);
});
