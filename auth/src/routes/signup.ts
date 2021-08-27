import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.post("/api/users/signup",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").trim().isLength({ min: 4, max: 20 }).withMessage("Invalid password")
  ],
  (request: Request, response: Response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).send(errors.array());
    }

    const { email, password } = request.body;

    console.log("creating user");

    response.send({});
    // new user (email, pass)
  });

export { router as signupRouter };