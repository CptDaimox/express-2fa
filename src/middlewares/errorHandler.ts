import { NextFunction, Request, Response } from "express";

/**
 * Custom error class. Only addition is the code. This ensures that
 * the error handler must always be given a code along with a message.
 */
class HttpException extends Error {
  code: number;

  constructor(message: string, code: number) {
    super(message);
    this.code = code;
    Object.setPrototypeOf(this, HttpException.prototype);
  }

  getErrorMessage() {
    return this.message;
  }

  getCode() {
    return this.code;
  }
}

/**
 * Error handler that has the sole pupose of logging errors. For now it will only log errors on console.
 *
 * @param err Thrown Error.
 * @param req Express request that caused the error.
 * @param res Express response that the error will be sent to.
 * @param next Express next function in case the error thrown was not an HttpException.
 */
function errorLogger(err: Error | HttpException, _req: Request, _res: Response, next: NextFunction) {
  console.log(err.message);
  next(err);
}

/**
 * Error handler that handles the custom HttpException class.
 * Handler will only call next function if the error is not of
 * HttpException class otherwise the handler will respond with
 * the appopriate code and message and then quit.
 *
 * @param err Thrown JoyceError.
 * @param req Express request that caused the error.
 * @param res Express response that the error will be sent to.
 * @param next Express next function in case the error thrown was not an HttpException.
 */
function httpErrorHandler(err: HttpException, _req: Request, res: Response, next: NextFunction) {
  if (err instanceof HttpException) {
    res
      .status(err.code)
      .json({
        message: err.message,
      })
      .end();
  } else {
    next(err);
  }
}

/**
 * Error handler that is defaulted to if the error thrown is not an HttpException.
 *
 * @param err Error that was thrown.
 * @param req Express request that caused the error.
 * @param res Express response that the error will be sent to.
 * @param next Needs to be in signature, however this error handler should be the last middleware function.
 */
function defaultErrorHandler(err: Error, _req: Request, res: Response, next: NextFunction) {
  res
    .status(500)
    .json({
      message: "Something went wrong.",
    })
    .end();
  next(err);
}

export { defaultErrorHandler, errorLogger, httpErrorHandler, HttpException };
