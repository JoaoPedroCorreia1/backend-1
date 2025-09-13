import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { PARENT_PATTERNS } from 'libs/contracts/parent/parent.patterns';
import { CreateParentDto } from 'libs/contracts/parent/create-parent.dto';
import { UpdateParentDto } from 'libs/contracts/parent/update-parent.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ParentsService {
  constructor(
    @Inject("PARENTS") private readonly parentsClient: ClientKafka
  ) {}

  async onModuleInit() {
    for (let pattern of Object.values(PARENT_PATTERNS)) {
      this.parentsClient.subscribeToResponseOf(pattern);
    }

    await this.parentsClient.connect();
  }

  async findById(id: string) {
    const parent = await firstValueFrom(
      this.parentsClient.send(PARENT_PATTERNS.GET_PARENT_BY_ID, id));

    if (parent == null) {
      throw new NotFoundException("Parent not found");
    }

    return parent;
  }

  async findByAccountId(id: string) {
    const parent = await firstValueFrom(
      this.parentsClient.send(PARENT_PATTERNS.GET_PARENT_BY_ACCOUNT_ID, id));

    if (parent == null) {
      throw new NotFoundException("Parent not found");
    }

    return parent;
  }

  async createParent(createParentDto: CreateParentDto) {
    return await firstValueFrom(this.parentsClient
      .send(PARENT_PATTERNS.CREATE_PARENT, createParentDto));
  }

  async updateParentById(id: string, updateParentDto: UpdateParentDto) {
    return await firstValueFrom(this.parentsClient
      .send(PARENT_PATTERNS.UPDATE_PARENT_BY_ID, [id, updateParentDto]));
  }

  async deleteParentById(id: string) {
    return await firstValueFrom(this.parentsClient
      .send(PARENT_PATTERNS.DELETE_PARENT_BY_ID, id));
  }
}
