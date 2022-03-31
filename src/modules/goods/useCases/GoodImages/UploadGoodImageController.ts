import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadGoodImageUseCase } from "./UploadGoodImageUseCase";

interface IFile{
  filename: string;
}

export class UploadGoodImageController{
  async handle(request: Request, response: Response):Promise<Response>{
    const {id} = request.params
    const images = request.files as IFile[];

    const uploadGoodImageUseCase = container.resolve(UploadGoodImageUseCase);

    const images_name = images.map(image => image.filename);

    await uploadGoodImageUseCase.execute({good_id: id, images_name})

    return response.status(201).send();
  }
}

