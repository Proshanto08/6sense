import jwt, { JwtPayload, } from 'jsonwebtoken';
import { config } from '../config/config';
import AuthKey from '../models/authKeyModel';
import { IApiResponse } from '../types';

export const generateToken = (): IApiResponse => {
  try {
   
    const key = 'express'; 
    const token = jwt.sign({ key }, config.jwtSecret, { expiresIn: '1h' });

    return {
      status: 200,
      data: { token },
      message: 'Token generated successfully',
    };
  } catch (error: any) {
    return {
      status: 500,
      errorCode: 'TOKEN_GENERATION_FAILED',
      message: error.message,
      data: {},
    };
  }
};

export const verifyToken = async (token: string): Promise<IApiResponse> => {
  try {
    
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
    const validKey = await AuthKey.findOne({ key: decoded.key });

    if (validKey) {
      return {
        status: 200,
        data: decoded,
        message: 'Token verified successfully',
      };
    } else {
      return {
        status: 401,
        errorCode: 'INVALID_KEY',
        message: 'Invalid key in token',
        data: {},
      };
    }
  } catch (error: any) {
    return {
      status: error.response?.status || 401,
      errorCode: 'TOKEN_VERIFICATION_FAILED',
      message: error.message || 'An error occurred while verifying the token',
      data: {},
    };
  }
};
