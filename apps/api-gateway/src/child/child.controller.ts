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
  BadRequestException
} from '@nestjs/common';
import { ChildService } from './child.service';
import { MedicationsService } from '../medications/medications.service';
import { CreateChildDto } from 'libs/contracts/child/create-child.dto';
import { UpdateChildDto } from 'libs/contracts/child/update-child.dto';
import { GetAllChildDto as GetAllChildrenDto } from './dto/get-all-child.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller("child")
export class ChildController {
  constructor(
    private readonly ChildService: ChildService,
    private readonly MedicationsService: MedicationsService
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllChildren(@Query() query: GetAllChildrenDto) {
    if (query.clinicId != undefined) {
      return this.ChildService.findAllByClinicId(query.clinicId);
    }

    throw new BadRequestException("Invalid query");
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async getChildById(@Param("id") id: string) {
    return this.ChildService.findById(id);
  }

  @Get(":id/medications")
  @UseGuards(JwtAuthGuard)
  async getMedicationsByChildId(@Param("id") id: string) {
    return this.MedicationsService.findByChildId(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createChild(@Body() createChildDto: CreateChildDto) {
    return this.ChildService.createChild(createChildDto);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  async updateChildById(@Param("id") id: string, @Body() updateChildDto: UpdateChildDto
  ) {
    return this.ChildService.updateChildById(id, updateChildDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteChildById(@Param("id") id) {
    return this.ChildService.deleteChildById(id);
  }
}
