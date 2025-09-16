import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { REPORT_PATTERNS } from 'libs/contracts/report/report.patterns';
import { CreateReportDto } from 'libs/contracts/report/create-report.dto';
import { UpdateReportDto } from 'libs/contracts/report/update-report.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ReportsService {
  constructor(
    @Inject("REPORTS") private readonly reportsClient: ClientKafka
  ) {}

  async onModuleInit() {
    for (let pattern of Object.values(REPORT_PATTERNS)) {
      this.reportsClient.subscribeToResponseOf(pattern);
    }

    await this.reportsClient.connect();
  }

  async findById(id: string) {
    const report = await firstValueFrom(
      this.reportsClient.send(REPORT_PATTERNS.GET_REPORT_BY_ID, id));

    if (report == null) {
      throw new NotFoundException("Report not found");
    }

    return report;
  }

  async findByClinicId(id: string) {
    return await firstValueFrom(this.reportsClient
      .send(REPORT_PATTERNS.GET_REPORTS_BY_CLINIC_ID, id));
  }

  async findByChildId(id: string) {
    return await firstValueFrom(this.reportsClient
      .send(REPORT_PATTERNS.GET_REPORTS_BY_CHILD_ID, id));
  }

  async findBySpecialistId(id: string) {
    return await firstValueFrom(this.reportsClient
      .send(REPORT_PATTERNS.GET_REPORTS_BY_SPECIALIST_ID, id));
  }

  async createReport(createReportDto: CreateReportDto) {
    return await firstValueFrom(this.reportsClient
      .send(REPORT_PATTERNS.CREATE_REPORT, createReportDto));
  }

  async updateReportById(id: string, updateReportDto: UpdateReportDto) {
    return await firstValueFrom(this.reportsClient
      .send(REPORT_PATTERNS.UPDATE_REPORT_BY_ID, [id, updateReportDto]));
  }

  async deleteReportById(id: string) {
    return await firstValueFrom(this.reportsClient
      .send(REPORT_PATTERNS.DELETE_REPORT_BY_ID, id));
  }
}
