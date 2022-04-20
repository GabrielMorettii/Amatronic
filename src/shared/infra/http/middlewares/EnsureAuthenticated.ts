import { NextFunction, Request, Response } from "express";
import {verify} from 'jsonwebtoken'
import AppError from "@shared/errors/AppError";

interface tokenResponse{
  sub: string;
}

export async function EnsureAuthenticated(request: Request, response: Response, next: NextFunction){
  const tokenBody = request.headers.authorization;

  if(!tokenBody){
    throw new AppError('Token is missing!', 401)
  }

  const [, token] = tokenBody.split(' ');

  try{
    const {sub: id} = verify(token, process.env.JWT_SECRET) as tokenResponse;

    request.user = {
      id
    }

    return next();
  } catch {
    throw new AppError('Invalid token!', 401)
  }
}
