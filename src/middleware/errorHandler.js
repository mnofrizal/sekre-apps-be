import { Prisma } from '@prisma/client';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const errorHandler = (err, req, res, next) => {
  // Prisma Error handling
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002':
        return res.status(409).json(
          ApiResponse.error('A unique constraint would be violated.', [{
            field: err.meta?.target?.[0] || 'unknown',
            message: 'This value already exists'
          }])
        );
      case 'P2025':
        return res.status(404).json(
          ApiResponse.error('Record not found.', [{
            field: 'id',
            message: 'The requested record does not exist'
          }])
        );
      default:
        console.error('Prisma Error:', err);
        return res.status(500).json(
          ApiResponse.error('Database error occurred.', [{
            field: 'database',
            message: 'An unexpected database error occurred'
          }])
        );
    }
  }

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json(
      ApiResponse.error(err.message, [{
        field: err.field || 'general',
        message: err.message
      }])
    );
  }

  console.error('Unhandled Error:', err);
  return res.status(500).json(
    ApiResponse.error('Internal server error', [{
      field: 'server',
      message: 'An unexpected error occurred'
    }])
  );
};