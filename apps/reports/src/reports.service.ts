import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/prisma/prisma.service';
import { CreateReportDto } from 'libs/contracts/report/create-report.dto';
import { UpdateReportDto } from 'libs/contracts/report/update-report.dto';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    return await this.prisma.reports.findUnique({ where: { id } });
  }

  async findByClinicId(id: string) {
    return await this.prisma.reports.findMany({ where: { clinicId: id } });
  }

  async findByChildId(id: string) {
    return await this.prisma.reports.findMany({ where: { childId: id } });
  }

  async findBySpecialistId(id: string) {
    return await this.prisma.reports.findMany({ where: { specialistId: id } });
  }

  async createReport(createReportDto: CreateReportDto) {
    return await this.prisma.reports.create({ data: createReportDto });
  }

  async updateReportById(id: string, updateReportDto: UpdateReportDto) {
    return await this.prisma.reports.update({
      where: { id },
      data: updateReportDto
    });
  }

  async deleteReportById(id: string) {
    return await this.prisma.reports.delete({ where: { id } });
  }
}
