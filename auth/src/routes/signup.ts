import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { UserModel } from "../models/User";

import { RequestValidationError } from "../errors/RequestValidationError";
import { BadRequestError } from "../errors/BadRequestError";

const router = express.Router();

router.post("/api/users/signup",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").trim().isLength({ min: 4, max: 20 }).withMessage("Invalid password")
  ],
  async (request: Request, response: Response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array(), "Error on signup",);
    }

    const { email, password } = request.body;

    const existingUser = await UserModel.findOne({ email });

    if(existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = UserModel.build({email, password});
    await user.save();

    response.status(201).send(user);

  });

export { router as signupRouter };