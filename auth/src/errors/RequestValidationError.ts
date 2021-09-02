import { ValidationError } from "express-validator";
import { CustomError } from "./CustomError";

export class RequestValidationError extends CustomError {

  statusCode = 400;

  // private is the same as define a atribute in class
  constructor(public errors: ValidationError[], message: string) {
    super(message);

    // onlye because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map(error => {
      return { message: error.msg, field: error.param }
    });
  }
}