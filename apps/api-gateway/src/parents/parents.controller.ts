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
import { ParentsService } from './parents.service';
import { CreateParentDto } from 'libs/contracts/parent/create-parent.dto';
import { UpdateParentDto } from 'libs/contracts/parent/update-parent.dto';
import { GetAllParentsDto } from './dto/get-all-parents.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller("parents")
export class ParentsController {
  constructor(
    private readonly parentsService: ParentsService
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllParents(@Query() query: GetAllParentsDto) {
    if (query.clinicId != undefined) {
      return this.parentsService.findAllByClinicId(query.clinicId);
    }

    throw new BadRequestException("Invalid query");
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async getParentById(@Param("id") id: string) {
    return this.parentsService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createParent(@Body() createParentDto: CreateParentDto) {
    return this.parentsService.createParent(createParentDto);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  async updateParentById(
    @Param("id") id: string,
    @Body() updateParentDto: UpdateParentDto
  ) {
    return this.parentsService.updateParentById(id, updateParentDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteParentById(@Param("id") id) {
    return this.parentsService.deleteParentById(id);
  }
}
