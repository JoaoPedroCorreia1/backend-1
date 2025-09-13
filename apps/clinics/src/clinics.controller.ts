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

  @MessagePattern(CLINIC_PATTERNS.CREATE_CLINIC)
  async createClinic(createClinicDto: CreateClinicDto) {
    return this.clinicService.createClinic(createClinicDto);
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
