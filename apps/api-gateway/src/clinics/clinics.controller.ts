import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { ClinicsService } from './clinics.service';
import { CreateClinicDto } from 'libs/contracts/clinic/create-clinic.dto';
import { UpdateClinicDto } from 'libs/contracts/clinic/update-clinic.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller("clinics")
export class ClinicsController {
  constructor(
    private readonly clinicsService: ClinicsService
  ) {}

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async getClinicById(@Param("id") id: string) {
    return this.clinicsService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createClinic(@Body() createClinicDto: CreateClinicDto) {
    return this.clinicsService.createClinic(createClinicDto);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  async updateClinicById(@Param("id") id: string, @Body() updateClinicDto: UpdateClinicDto
  ) {
    return this.clinicsService.updateClinicById(id, updateClinicDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteClinicById(@Param("id") id) {
    return this.clinicsService.deleteClinicById(id);
  }
}
