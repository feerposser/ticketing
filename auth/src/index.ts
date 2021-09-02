import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";

// test async error handler express-async-errors
import { NotFoundError } from "./errors/NotFoundError";

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// test async error handler express-async-errors
app.all("*", async(request, response) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async() => {
  try{
    await mongoose.connect("mongodb://auth-mongodb-srv:27017/auth");
  } catch (error) {
    console.log(error);
  }

  console.log("connected with mongodb!");

  app.listen(3000, () => {
    console.log("Listening on port 3000!");
  });

};

start();