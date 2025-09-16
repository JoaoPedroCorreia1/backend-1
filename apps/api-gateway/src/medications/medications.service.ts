import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { MEDICATION_PATTERNS } from 'libs/contracts/medication/medication.patterns';
import { AddMedicationDto } from 'libs/contracts/medication/add-medication.dto';
import { UpdateMedicationDto } from 'libs/contracts/medication/update-medication.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MedicationsService {
  constructor(
    @Inject("MEDICATIONS") private readonly medicationsClient: ClientKafka
  ) {}

  async onModuleInit() {
    for (let pattern of Object.values(MEDICATION_PATTERNS)) {
      this.medicationsClient.subscribeToResponseOf(pattern);
    }

    await this.medicationsClient.connect();
  }

  async findById(id: string) {
    const medication = await firstValueFrom(
      this.medicationsClient.send(MEDICATION_PATTERNS.GET_MEDICATION_BY_ID, id));

    if (medication == null) {
      throw new NotFoundException("Medication not found");
    }

    return medication;
  }

  async findByChildId(id: string) {
    return await firstValueFrom(this.medicationsClient
        .send(MEDICATION_PATTERNS.GET_MEDICATIONS_BY_CHILD_ID, id));
  }

  async addMedication(addMedicationDto: AddMedicationDto) {
    return await firstValueFrom(this.medicationsClient
      .send(MEDICATION_PATTERNS.ADD_MEDICATION, addMedicationDto));
  }

  async updateMedicationById(id: string, updateMedicationDto: UpdateMedicationDto) {
    return await firstValueFrom(this.medicationsClient
      .send(MEDICATION_PATTERNS.UPDATE_MEDICATION_BY_ID, [id, updateMedicationDto]));
  }

  async deleteMedicationById(id: string) {
    return await firstValueFrom(this.medicationsClient
      .send(MEDICATION_PATTERNS.DELETE_MEDICATION_BY_ID, id));
  }
}
