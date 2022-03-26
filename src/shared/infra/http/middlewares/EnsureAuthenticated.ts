import { NextFunction, Request, Response } from "express";
import {verify} from 'jsonwebtoken'
import {credentials} from '@config/auth'
import AppError from "@shared/errors/AppError";

interface tokenResponse{
  sub: string;
}

export async function EnsureAuthenticated(request: Request, response: Response, next: NextFunction){
  const tokenBody = request.headers.authorization;

  if(!tokenBody){
    throw new AppError('Token is missing!', 401)
  }

  const [, token] = tokenBody;

  try{
    const {sub: id} = verify(token, credentials.tokenSecretKey) as tokenResponse;

    request.user = {
      id
    }

    return next();
  } catch {
    throw new AppError('Invalid token!', 401)
  }
}
