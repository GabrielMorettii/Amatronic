import { ICustomerResponseDTO } from "../dtos/ICustomerResponseDTO";
import { Customer } from "../infra/typeorm/entities/Customer";

class CustomerMap{
  static toDTO({id,name,email,created_at,updated_at, avatar, admin}: Customer): ICustomerResponseDTO {
    const customer = {
      id,name,email,created_at,updated_at,  avatar, admin
    }

    return customer;
  }

  static toDTOS(customers: Customer[]): ICustomerResponseDTO[] {
    const customersDTO = customers.map(({
      id,
      name,
      email,
      admin,
      avatar,
      created_at,
      updated_at
    }) => (
      {
        id,
        name,
        email,
        admin,
        avatar,
        created_at,
        updated_at
      }
    ));

    return customersDTO;
  }
}

export {CustomerMap}
