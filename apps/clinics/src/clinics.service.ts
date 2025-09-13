import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/prisma/prisma.service';
import { CreateClinicDto } from 'libs/contracts/clinic/create-clinic.dto';
import { UpdateClinicDto } from 'libs/contracts/clinic/update-clinic.dto';

@Injectable()
export class ClinicsService {
  constructor(private readonly prisma: PrismaService) {}

  async createClinic(createClinicDto: CreateClinicDto) {
    return this.prisma.clinics.create({
      data: createClinicDto,
    });
  }

  async findById(id: string) {
    return this.prisma.clinics.findUnique({
      where: { id },
    });
  }

  async findByAccountId(id: string) {
    return this.prisma.clinics.findUnique({
      where: { accountId: id },
    });
  }

  async updateClinicById(id: string, updateClinicDto: UpdateClinicDto) {
    return this.prisma.clinics.update({
      where: { id },
      data: updateClinicDto,
    });
  }

  async deleteClinicById(id: string) {
    return this.prisma.clinics.delete({
      where: { id },
    });
  }
}
