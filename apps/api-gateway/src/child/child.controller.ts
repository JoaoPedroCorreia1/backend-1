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
import { ChildService } from './child.service';
import { CreateChildDto } from 'libs/contracts/child/create-child.dto';
import { UpdateChildDto } from 'libs/contracts/child/update-child.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller("child")
export class ChildController {
  constructor(
    private readonly ChildService: ChildService
  ) {}

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async getChildById(@Param("id") id: string) {
    return this.ChildService.findById(id);
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
