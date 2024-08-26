import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/authService';
import { IApiResponse } from '../types';

export const authToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    const response: IApiResponse = {
      status: 401,
      errorCode: 'NO_TOKEN_PROVIDED',
      message: 'No token provided',
      data: {},
    };
    res.status(response.status).json(response);
    return;
  }

  try {
    const result = await verifyToken(token);

    if (result.status !== 200) {
      res.status(result.status).json(result);
      return;
    }

    next();
  } catch (err) {
    const response: IApiResponse = {
      status: 401,
      errorCode: 'TOKEN_VERIFICATION_FAILED',
      message: 'Token verification failed',
      data: {},
    };
    res.status(response.status).json(response);
  }
};
