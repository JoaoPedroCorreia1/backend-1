import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ParentsService } from './parents.service';
import { PARENT_PATTERNS } from 'libs/contracts/parent/parent.patterns';
import { CreateParentDto } from 'libs/contracts/parent/create-parent.dto';
import { UpdateParentDto } from 'libs/contracts/parent/update-parent.dto';

@Controller()
export class ParentsController {
  constructor(private readonly parentsService: ParentsService) {}

  @MessagePattern(PARENT_PATTERNS.GET_ALL_PARENTS_BY_CLINIC_ID)
  async getAllParentsByClinicId(id: string) {
    return await this.parentsService.findAllByClinicId(id);
  }

  @MessagePattern(PARENT_PATTERNS.GET_PARENT_BY_ID)
  async getParentById(id: string) {
    return await this.parentsService.findById(id);
  }

  @MessagePattern(PARENT_PATTERNS.GET_PARENT_BY_ACCOUNT_ID)
  async getParentByAccountId(id: string) {
    return await this.parentsService.findByAccountId(id);
  }

  @MessagePattern(PARENT_PATTERNS.CREATE_PARENT)
  async createParent(createParentDto: CreateParentDto) {
    return await this.parentsService.createParent(createParentDto);
  }

  @MessagePattern(PARENT_PATTERNS.UPDATE_PARENT_BY_ID)
  async updateParentById([id, updateParentDto]: [string, UpdateParentDto]) {
    return await this.parentsService.updateParentById(id, updateParentDto);
  }

  @MessagePattern(PARENT_PATTERNS.DELETE_PARENT_BY_ID)
  async deleteParentById(id: string) {
    return await this.parentsService.deleteParentById(id);
  }
}
