import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ChildService } from './child.service';
import { CHILD_PATTERNS } from 'libs/contracts/child/child.patterns';
import { CreateChildDto } from 'libs/contracts/child/create-child.dto';
import { UpdateChildDto } from 'libs/contracts/child/update-child.dto';

@Controller()
export class ChildController {
  constructor(private readonly childService: ChildService) {}

  @MessagePattern(CHILD_PATTERNS.CREATE_CHILD)
  async createChild(createChildDto: CreateChildDto) {
    return this.childService.createChild(createChildDto);
  }

  @MessagePattern(CHILD_PATTERNS.GET_CHILD_BY_ID)
  async findChildById(id: string) {
    return this.childService.findById(id);
  }

  @MessagePattern(CHILD_PATTERNS.GET_CHILD_BY_ACCOUNT_ID)
  async findChildByUserId(id: string) {
    return this.childService.findByAccountId(id);
  }

  @MessagePattern(CHILD_PATTERNS.UPDATE_CHILD_BY_ID)
  async updateChildById([id, updateChildDto]: [string, UpdateChildDto],
  ) {
    return this.childService.updateChildById(id, updateChildDto);
  }

  @MessagePattern(CHILD_PATTERNS.DELETE_CHILD_BY_ID)
  async deleteChildById(id: string) {
    return this.childService.deleteChildById(id);
  }
}
