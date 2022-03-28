import 'reflect-metadata'
import AppError from "@shared/errors/AppError";
import express, { NextFunction, Request, Response } from "express";
import createConnection from '../typeorm';
import 'express-async-errors';
import cors from 'cors'
import {router} from './routes'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from '../../../swagger.json'

import "@shared/container"

createConnection();

const app = express();


app.use(express.json())
app.use(cors())
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
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

export { app };
