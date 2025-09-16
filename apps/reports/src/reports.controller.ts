import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ReportsService } from './reports.service';
import { REPORT_PATTERNS } from 'libs/contracts/report/report.patterns';
import { CreateReportDto } from 'libs/contracts/report/create-report.dto';
import { UpdateReportDto } from 'libs/contracts/report/update-report.dto';

@Controller()
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @MessagePattern(REPORT_PATTERNS.GET_REPORT_BY_ID)
  async getReportById(id: string) {
    return await this.reportsService.findById(id);
  }

  @MessagePattern(REPORT_PATTERNS.GET_REPORTS_BY_CLINIC_ID)
  async getReportsByClinicId(id: string) {
    return await this.reportsService.findByClinicId(id);
  }

  @MessagePattern(REPORT_PATTERNS.GET_REPORTS_BY_CHILD_ID)
  async getReportsByChildId(id: string) {
    return await this.reportsService.findByChildId(id);
  }

  @MessagePattern(REPORT_PATTERNS.GET_REPORTS_BY_SPECIALIST_ID)
  async getReportsBySpecialistId(id: string) {
    return await this.reportsService.findBySpecialistId(id);
  }

  @MessagePattern(REPORT_PATTERNS.CREATE_REPORT)
  async createReport(createReportDto: CreateReportDto) {
    return await this.reportsService.createReport(createReportDto);
  }

  @MessagePattern(REPORT_PATTERNS.UPDATE_REPORT_BY_ID)
  async updateReportById([id, updateReportDto]: [string, UpdateReportDto]) {
    return await this.reportsService.updateReportById(id, updateReportDto);
  }

  @MessagePattern(REPORT_PATTERNS.DELETE_REPORT_BY_ID)
  async deleteReportById(id: string) {
    return await this.reportsService.deleteReportById(id);
  }
}
