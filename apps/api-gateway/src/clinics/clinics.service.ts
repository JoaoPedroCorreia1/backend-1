import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CLINIC_PATTERNS } from 'libs/contracts/clinic/clinic.patterns';
import { CreateClinicDto } from 'libs/contracts/clinic/create-clinic.dto';
import { UpdateClinicDto } from 'libs/contracts/clinic/update-clinic.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ClinicsService {
  constructor(
    @Inject("CLINICS") private readonly clinicsClient: ClientKafka
  ) {}

  async onModuleInit() {
    for (let pattern of Object.values(CLINIC_PATTERNS)) {
      this.clinicsClient.subscribeToResponseOf(pattern);
    }

    await this.clinicsClient.connect();
  }

  async findById(id: string) {
    const clinic = await firstValueFrom(
      this.clinicsClient.send(CLINIC_PATTERNS.GET_CLINIC_BY_ID, id));

    if (clinic == null) {
      throw new NotFoundException("Clinic not found");
    }

    return clinic;
  }

  async findByAccountId(id: string) {
    const clinic = await firstValueFrom(
      this.clinicsClient.send(CLINIC_PATTERNS.GET_CLINIC_BY_ACCOUNT_ID, id));

    if (clinic == null) {
      throw new NotFoundException("Clinic not found");
    }

    return clinic;
  }

  async findByChildId(id: string) {
    return await firstValueFrom(this.clinicsClient
      .send(CLINIC_PATTERNS.GET_CLINICS_BY_CHILD_ID, id));
  }

  async findByParentId(id: string) {
    return await firstValueFrom(this.clinicsClient
      .send(CLINIC_PATTERNS.GET_CLINICS_BY_PARENT_ID, id));
  }

  async addChildToClinic(id: string, childId: string) {
    return await firstValueFrom(this.clinicsClient
      .send(CLINIC_PATTERNS.ADD_CHILD_TO_CLINIC, [id, childId]));
  }

  async addParentToClinic(id: string, parentId: string) {
    return await firstValueFrom(this.clinicsClient
      .send(CLINIC_PATTERNS.ADD_PARENT_TO_CLINIC, [id, parentId]));
  }

  async createClinic(createClinicDto: CreateClinicDto) {
    return await firstValueFrom(this.clinicsClient
      .send(CLINIC_PATTERNS.CREATE_CLINIC, createClinicDto));
  }

  async updateClinicById(id: string, updateClinicDto: UpdateClinicDto) {
    return await firstValueFrom(this.clinicsClient
      .send(CLINIC_PATTERNS.UPDATE_CLINIC_BY_ID, [id, updateClinicDto]));
  }

  async removeChildFromClinic(id: string, childId: string) {
    return await firstValueFrom(this.clinicsClient
      .send(CLINIC_PATTERNS.REMOVE_CHILD_FROM_CLINIC, [id, childId]));
  }

  async removeParentFromClinic(id: string, parentId: string) {
    return await firstValueFrom(this.clinicsClient
      .send(CLINIC_PATTERNS.REMOVE_PARENT_FROM_CLINIC, [id, parentId]));
  }

  async deleteClinicById(id: string) {
    return await firstValueFrom(this.clinicsClient
      .send(CLINIC_PATTERNS.DELETE_CLINIC_BY_ID, id));
  }
}
