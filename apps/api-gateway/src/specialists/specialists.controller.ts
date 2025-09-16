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
import { SpecialistsService } from './specialists.service';
import { CreateSpecialistDto } from 'libs/contracts/specialist/create-specialist.dto';
import { UpdateSpecialistDto } from 'libs/contracts/specialist/update-specialist.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller("specialists")
export class SpecialistsController {
  constructor(
    private readonly specialistsService: SpecialistsService
  ) {}

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async getSpecialistById(@Param("id") id: string) {
    return this.specialistsService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createSpecialist(@Body() createSpecialistDto: CreateSpecialistDto) {
    return this.specialistsService.createSpecialist(createSpecialistDto);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  async updateSpecialistById(
    @Param("id") id: string,
    @Body() updateSpecialistDto: UpdateSpecialistDto
  ) {
    return this.specialistsService.updateSpecialistById(id, updateSpecialistDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteSpecialistById(@Param("id") id) {
    return this.specialistsService.deleteSpecialistById(id);
  }
}
