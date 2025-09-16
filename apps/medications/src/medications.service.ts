import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/prisma/prisma.service';
import { AddMedicationDto } from 'libs/contracts/medication/add-medication.dto';
import { UpdateMedicationDto } from 'libs/contracts/medication/update-medication.dto';

@Injectable()
export class MedicationsService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    return await this.prisma.medications.findUnique({ where: { id } });
  }

  async findByChildId(id: string) {
    return await this.prisma.medications.findMany({ where: { childId: id } });
  }

  async addMedication(addMedicationDto: AddMedicationDto) {
    return await this.prisma.medications.create({ 
      data: addMedicationDto
    });
  }

  async updateMedicationById(id: string, updateMedicationDto: UpdateMedicationDto) {
    return await this.prisma.medications.update({
      where: { id },
      data: updateMedicationDto,
    });
  }

  async deleteMedicationById(id: string) {
    return await this.prisma.medications.delete({ where: { id } });
  }
}
