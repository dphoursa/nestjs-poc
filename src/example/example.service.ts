import { Injectable, Inject } from '@nestjs/common';
import { IExample } from './interfaces/example.interface';
import { ExampleInput } from './dto/input-example.input';
import { ExampleRepository } from './model/example.repository';
import { IExampleRepository } from './interfaces/example-repository.interface';
import { IPaginate } from '../common/pagination/paginate.interface';
import { IOrderByInput } from '../common/order/order-by.input.interface';

@Injectable()
export class ExampleService {
  constructor(
    @Inject(ExampleRepository) private readonly repository: IExampleRepository,
  ) {}

  async create(createExampleDto: ExampleInput): Promise<IExample> {
    return await this.repository.create(createExampleDto);
  }

  async getAll(paginate?: IPaginate, orderBy?: IOrderByInput[]): Promise<IExample[]> {
    return await this.repository.getAll(paginate, orderBy);
  }

  async getByID(id: string): Promise<IExample> {
    return await this.repository.getByID(id);
  }

  async delete(id: string) {
    return await this.repository.delete(id);
  }

  async update(id: string, exampleInput: ExampleInput): Promise<IExample> {
    return await this.repository.update(id, exampleInput);
  }
}
