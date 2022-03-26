import { NextFunction, Request, Response } from "express";
import AppError from "@shared/errors/AppError";
import { CustomersRepository } from "@modules/customers/infra/typeorm/repositories/CustomersRepository";

export async function EnsureAdmin(request: Request, response: Response, next: NextFunction){
  const {id} = request.user;

  const customersRepository = new CustomersRepository();

  const user = await customersRepository.findById(id);

  if(!user.admin){
    throw new AppError("The user isn't an admin", 401)
  }

  return next();
}
