require("dotenv").config();
import express = require("express");
import cors = require("cors");
import cookieParser = require("cookie-parser");
import morgan = require("morgan");
import userRouter from "./modules/users/usersRouter";

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
