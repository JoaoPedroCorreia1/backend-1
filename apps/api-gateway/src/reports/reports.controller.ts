import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from 'libs/contracts/report/create-report.dto';
import { UpdateReportDto } from 'libs/contracts/report/update-report.dto';
import { GetAllReportsDto } from './dto/get-all-reports.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller("reports")
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllReports(@Query() query: GetAllReportsDto) {
    if (query.clinicId != undefined) {
      return this.reportsService.findByClinicId(query.clinicId);
    }
    
    if (query.childId != undefined) {
      return this.reportsService.findByChildId(query.clinicId);
    }

    if (query.specialistId != undefined) {
      return this.reportsService.findBySpecialistId(query.clinicId);
    }

    throw new BadRequestException("Invalid query");
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async getReportById(@Param("id") id: string) {
    return this.reportsService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createReport(@Body() createReportDto: CreateReportDto) {
    return this.reportsService.createReport(createReportDto);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  async updateReportById(
    @Param("id") id: string,
    @Body() updateReportDto: UpdateReportDto
  ) {
    return this.reportsService.updateReportById(id, updateReportDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteReportById(@Param("id") id) {
    return this.reportsService.deleteReportById(id);
  }
}
