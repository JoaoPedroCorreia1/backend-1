import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { SPECIALIST_PATTERNS } from 'libs/contracts/specialist/specialist.patterns';
import { CreateSpecialistDto } from 'libs/contracts/specialist/create-specialist.dto';
import { UpdateSpecialistDto } from 'libs/contracts/specialist/update-specialist.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SpecialistsService {
  constructor(
    @Inject("SPECIALISTS") private readonly specialistsClient: ClientKafka
  ) {}

  async onModuleInit() {
    for (let pattern of Object.values(SPECIALIST_PATTERNS)) {
      this.specialistsClient.subscribeToResponseOf(pattern);
    }

    await this.specialistsClient.connect();
  }

  async findById(id: string) {
    const specialist = await firstValueFrom(
      this.specialistsClient.send(SPECIALIST_PATTERNS.GET_SPECIALIST_BY_ID, id));

    if (specialist == null) {
      throw new NotFoundException("Specialist not found");
    }

    return specialist;
  }

  async findByAccountId(id: string) {
    const specialist = await firstValueFrom(
      this.specialistsClient.send(SPECIALIST_PATTERNS.GET_SPECIALIST_BY_ACCOUNT_ID, id));

    if (specialist == null) {
      throw new NotFoundException("Specialist not found");
    }

    return specialist;
  }

  async createSpecialist(createSpecialistDto: CreateSpecialistDto) {
    return await firstValueFrom(this.specialistsClient
      .send(SPECIALIST_PATTERNS.CREATE_SPECIALIST, createSpecialistDto));
  }

  async updateSpecialistById(id: string, updateSpecialistDto: UpdateSpecialistDto) {
    return await firstValueFrom(this.specialistsClient
      .send(SPECIALIST_PATTERNS.UPDATE_SPECIALIST_BY_ID, [id, updateSpecialistDto]));
  }

  async deleteSpecialistById(id: string) {
    return await firstValueFrom(this.specialistsClient
      .send(SPECIALIST_PATTERNS.DELETE_SPECIALIST_BY_ID, id));
  }
}
