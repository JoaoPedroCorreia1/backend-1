import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MedicationsService } from './medications.service';
import { MEDICATION_PATTERNS } from 'libs/contracts/medication/medication.patterns';
import { AddMedicationDto } from 'libs/contracts/medication/add-medication.dto';
import { UpdateMedicationDto } from 'libs/contracts/medication/update-medication.dto';

@Controller()
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  @MessagePattern(MEDICATION_PATTERNS.GET_MEDICATION_BY_ID)
  async getMedicationById(id: string) {
    return await this.medicationsService.findById(id);
  }
  
  @MessagePattern(MEDICATION_PATTERNS.GET_MEDICATIONS_BY_CHILD_ID)
  async getMedicationsByChildId(id: string) {
    return await this.medicationsService.findByChildId(id);
  }

  @MessagePattern(MEDICATION_PATTERNS.ADD_MEDICATION)
  async createMedication(addMedicationDto: AddMedicationDto) {
    return await this.medicationsService.addMedication(addMedicationDto);
  }

  @MessagePattern(MEDICATION_PATTERNS.UPDATE_MEDICATION_BY_ID)
  async updateMedicationById([id, updateMedicationDto]: [string, UpdateMedicationDto]) {
    return await this.medicationsService.updateMedicationById(id, updateMedicationDto);
  }

  @MessagePattern(MEDICATION_PATTERNS.DELETE_MEDICATION_BY_ID)
  async deleteMedicationById(id: string) {
    return await this.medicationsService.deleteMedicationById(id);
  }
}
