import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { SpecialistsService } from './specialists.service';
import { SPECIALIST_PATTERNS } from 'libs/contracts/specialist/specialist.patterns';
import { CreateSpecialistDto } from 'libs/contracts/specialist/create-specialist.dto';
import { UpdateSpecialistDto } from 'libs/contracts/specialist/update-specialist.dto';

@Controller()
export class SpecialistsController {
  constructor(private readonly specialistsService: SpecialistsService) {}

  @MessagePattern(SPECIALIST_PATTERNS.GET_SPECIALIST_BY_ID)
  async getSpecialistById(id: string) {
    return await this.specialistsService.findById(id);
  }

  @MessagePattern(SPECIALIST_PATTERNS.GET_SPECIALIST_BY_ACCOUNT_ID)
  async getSpecialistByAccountId(id: string) {
    return await this.specialistsService.findByAccountId(id);
  }

  @MessagePattern(SPECIALIST_PATTERNS.CREATE_SPECIALIST)
  async createSpecialist(createSpecialistDto: CreateSpecialistDto) {
    return await this.specialistsService.createSpecialist(createSpecialistDto);
  }

  @MessagePattern(SPECIALIST_PATTERNS.UPDATE_SPECIALIST_BY_ID)
  async updateSpecialistById([id, updateSpecialistDto]: [string, UpdateSpecialistDto]) {
    return await this.specialistsService.updateSpecialistById(id, updateSpecialistDto);
  }

  @MessagePattern(SPECIALIST_PATTERNS.DELETE_SPECIALIST_BY_ID)
  async deleteSpecialistById(id: string) {
    return await this.specialistsService.deleteSpecialistById(id);
  }
}
