import 'reflect-metadata'
import AppError from "@shared/errors/AppError";
import express, { NextFunction, Request, Response } from "express";
import 'express-async-errors';
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from '../../../swagger.json'
import path from 'path'
import createConnection from '../typeorm';
import {router} from './routes'
import "@shared/container"
import RateLimiter from './middlewares/RateLimiter';

createConnection();

const app = express();
app.use(RateLimiter)

app.use(express.json())
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(cors())
app.use(router)

app.use((err: Error, request: Request, response: Response, next: NextFunction)=>{
  if(err instanceof AppError){
    return response.status(err.statusCode).json({
      message: err.message
    })
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal Server Error: ${err.message}`
  })
})

app.use((req, res, next)=>{
  res.status(404).sendFile(path.join(process.cwd(), 'public', 'views', '404.html'))
})

export { app };
