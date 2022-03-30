import { ICreateGoodDTO } from "../dtos/ICreateGoodDTO";
import { Good } from "../infra/typeorm/entities/Good";

export interface IGoodsRepository{
  create(data: ICreateGoodDTO): Promise<Good>
  findByName(name: string): Promise<Good>
}
