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
import { MedicationsService } from './medications.service';
import { AddMedicationDto } from 'libs/contracts/medication/add-medication.dto';
import { UpdateMedicationDto } from 'libs/contracts/medication/update-medication.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller("medications")
export class MedicationsController {
  constructor(
    private readonly medicationsService: MedicationsService,
  ) {}

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async getMedicationById(@Param("id") id: string) {
    return this.medicationsService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async addMedication(@Body() addMedicationDto: AddMedicationDto) {
    return this.medicationsService.addMedication(addMedicationDto);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  async updateMedicationById(
    @Param("id") id: string,
    @Body() updateMedicationDto: UpdateMedicationDto
  ) {
    return this.medicationsService.updateMedicationById(id, updateMedicationDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteMedicationById(@Param("id") id) {
    return this.medicationsService.deleteMedicationById(id);
  }
}
