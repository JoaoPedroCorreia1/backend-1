import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CHILD_PATTERNS } from 'libs/contracts/child/child.patterns';
import { CreateChildDto } from 'libs/contracts/child/create-child.dto';
import { UpdateChildDto } from 'libs/contracts/child/update-child.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ChildService {
  constructor(
    @Inject("CHILD") private readonly childClient: ClientKafka,
  ) {}

  async onModuleInit() {
    for (let pattern of Object.values(CHILD_PATTERNS)) {
      this.childClient.subscribeToResponseOf(pattern);
    }

    await this.childClient.connect();
  }

  async findAllByClinicId(id: string) {
    return await firstValueFrom(this.childClient
      .send(CHILD_PATTERNS.GET_ALL_CHILDREN_BY_CLINIC_ID, id));
  }

  async findAllByParentId(id: string) {
    return await firstValueFrom(this.childClient
      .send(CHILD_PATTERNS.GET_ALL_CHILDREN_BY_PARENT_ID, id));
  }

  async findById(id: string) {
    const child = await firstValueFrom(
      this.childClient.send(CHILD_PATTERNS.GET_CHILD_BY_ID, id));

    if (child == null) {
      throw new NotFoundException("Child not found");
    }

    return child;
  }

  async findByAccountId(id: string) {
    const child = await firstValueFrom(
      this.childClient.send(CHILD_PATTERNS.GET_CHILD_BY_ACCOUNT_ID, id));

    if (child == null) {
      throw new NotFoundException("Child not found");
    }

    return child;
  }

  async createChild(createChildDto: CreateChildDto) {
    return await firstValueFrom(this.childClient
      .send(CHILD_PATTERNS.CREATE_CHILD, createChildDto));
  }

  async updateChildById(id: string, updateChildDto: UpdateChildDto) {
    return await firstValueFrom(this.childClient
      .send(CHILD_PATTERNS.UPDATE_CHILD_BY_ID, [id, updateChildDto]));
  }

  async deleteChildById(id: string) {
    return await firstValueFrom(this.childClient
      .send(CHILD_PATTERNS.DELETE_CHILD_BY_ID, id));
  }
}
