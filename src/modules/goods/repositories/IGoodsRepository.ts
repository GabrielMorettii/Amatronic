import { ICreateGoodDTO } from "../dtos/ICreateGoodDTO";
import { IUpdateGoodDTO } from "../dtos/IUpdateGoodDTO";
import { Good } from "../infra/typeorm/entities/Good";

export interface IGoodsRepository{
  create(data: ICreateGoodDTO): Promise<Good>
  findByName(name: string): Promise<Good>
  list(): Promise<Good[]>
  findById(id: string): Promise<Good>
  update(data: IUpdateGoodDTO): Promise<Good>
}
