import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ClinicsService } from './clinics.service';
import { CLINIC_PATTERNS } from 'libs/contracts/clinic/clinic.patterns';
import { CreateClinicDto } from 'libs/contracts/clinic/create-clinic.dto';
import { UpdateClinicDto } from 'libs/contracts/clinic/update-clinic.dto';

@Controller()
export class ClinicsController {
  constructor(private readonly clinicService: ClinicsService) {}

  @MessagePattern(CLINIC_PATTERNS.GET_CLINIC_BY_ID)
  async findClinicById(id: string) {
    return this.clinicService.findById(id);
  }

  @MessagePattern(CLINIC_PATTERNS.GET_CLINIC_BY_ACCOUNT_ID)
  async findClinicByAccountId(id: string) {
    return this.clinicService.findByAccountId(id);
  }

  @MessagePattern(CLINIC_PATTERNS.GET_CLINICS_BY_CHILD_ID)
  async findClinicsByChildId(id: string) {
    return this.clinicService.findClinicsByClildId(id);
  }

  @MessagePattern(CLINIC_PATTERNS.GET_CLINICS_BY_PARENT_ID)
  async findClinicsByParentId(id: string) {
    return this.clinicService.findClinicsByParentId(id);
  }

  @MessagePattern(CLINIC_PATTERNS.ADD_CHILD_TO_CLINIC)
  async addChildToClinic([id, childId]: [string, string]) {
    return this.clinicService.addChildToClinic(id, childId);
  }

  @MessagePattern(CLINIC_PATTERNS.ADD_PARENT_TO_CLINIC)
  async addParentToClinic([id, parentId]: [string, string]) {
    return this.clinicService.addParentToClinic(id, parentId);
  }

  @MessagePattern(CLINIC_PATTERNS.CREATE_CLINIC)
  async createClinic(createClinicDto: CreateClinicDto) {
    return this.clinicService.createClinic(createClinicDto);
  }

  @MessagePattern(CLINIC_PATTERNS.REMOVE_CHILD_FROM_CLINIC)
  async removeChildFromClinic([id, childId]: [string, string]) {
    return this.clinicService.removeChildFromClinic(id, childId);
  }

  @MessagePattern(CLINIC_PATTERNS.REMOVE_PARENT_FROM_CLINIC)
  async removeParentFromClinic([id, parentId]: [string, string]) {
    return this.clinicService.removeParentFromClinic(id, parentId);
  }

  @MessagePattern(CLINIC_PATTERNS.UPDATE_CLINIC_BY_ID)
  async updateClinicById([id, updateClinicDto]: [string, UpdateClinicDto],
  ) {
    return this.clinicService.updateClinicById(id, updateClinicDto);
  }

  @MessagePattern(CLINIC_PATTERNS.DELETE_CLINIC_BY_ID)
  async deleteClinicById(id: string) {
    return this.clinicService.deleteClinicById(id);
  }
}
