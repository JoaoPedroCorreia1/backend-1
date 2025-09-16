import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/prisma/prisma.service';
import { CreateSpecialistDto } from 'libs/contracts/specialist/create-specialist.dto';
import { UpdateSpecialistDto } from 'libs/contracts/specialist/update-specialist.dto';

@Injectable()
export class SpecialistsService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    return await this.prisma.specialists.findUnique({ where: { id } });
  }

  async findByAccountId(id: string) {
    return await this.prisma.specialists.findUnique({ where: { accountId: id } });
  }

  async createSpecialist(createSpecialistDto: CreateSpecialistDto) {
    return await this.prisma.specialists.create({ data: createSpecialistDto });
  }

  async updateSpecialistById(id: string, updateSpecialistDto: UpdateSpecialistDto) {
    return await this.prisma.specialists.update({
      where: { id },
      data: updateSpecialistDto
    });
  }

  async deleteSpecialistById(id: string) {
    return await this.prisma.specialists.delete({ where: { id } });
  }
}
