import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/CustomError";

export const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {

  if (error instanceof CustomError) {
    return response.status(error.statusCode).send({ errors: error.serializeErrors() })
  } else {
    response.status(400).send({ errors: [{ message: error.message }] });
  }
};