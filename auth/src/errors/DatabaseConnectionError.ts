import { CustomError } from "./CustomError";

export class DatabaseConnectionError extends CustomError {

  statusCode = 500;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [
      { message: this.message }
    ]
  }
}