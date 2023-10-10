import { Response } from 'express';

interface ErrorResponse {
  error: {
    name: string;
    message?: string;
    stack?: string;
  };
}

const sendErrorResponse = (res: Response, status: number, error: unknown, message?: string) => {
  const errorObject = error instanceof Error ? error : new Error('An unknown error occurred.');

  const errorResponse: ErrorResponse = {
    error: {
      name: errorObject.name || 'UnknownError',
      message: message || errorObject.message,
      stack: errorObject.stack,
    },
  };

  res.status(status).json(errorResponse);
};

const sendNotFoundResponse = (res: Response, error?: unknown, message: string = 'Not Found') => {
  sendErrorResponse(res, 404, error, message);
};

const sendInternalErrorResponse = (res: Response, error: unknown, message: string = 'Internal Server Error') => {
  sendErrorResponse(res, 500, error, message);
};

const handlePrismaError = (error: unknown) => {
  if (error instanceof Error) {
    throw new Error(`Prisma error: ${error.message}`);
  } else {
    throw new Error('An unknown error occurred.');
  }
};

const errorHandler = {
  sendNotFoundResponse,
  sendInternalErrorResponse,
  handlePrismaError
};

export default errorHandler;
