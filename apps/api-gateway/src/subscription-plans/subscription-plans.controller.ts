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
import { SubscriptionPlansService } from './subscription-plans.service';
import { CreateSubscriptionPlanDto } from 'libs/contracts/subscription-plan/create-subscription-plan.dto';
import { UpdateSubscriptionPlanDto } from 'libs/contracts/subscription-plan/update-subscription-plan.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller("subscription-plans")
export class SubscriptionPlansController {
  constructor(
    private readonly subscriptionPlansService: SubscriptionPlansService
  ) {}

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async getSubscriptionPlanById(@Param("id") id: string) {
    return this.subscriptionPlansService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createSubscriptionPlan(@Body() createSubscriptionPlanDto: CreateSubscriptionPlanDto) {
    return this.subscriptionPlansService.createSubscriptionPlan(createSubscriptionPlanDto);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  async updateSubscriptionPlanById(
    @Param("id") id: string,
    @Body() updateSubscriptionPlanDto: UpdateSubscriptionPlanDto
  ) {
    return this.subscriptionPlansService.updateSubscriptionPlanById(id, updateSubscriptionPlanDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteSubscriptionPlanById(@Param("id") id) {
    return this.subscriptionPlansService.deleteSubscriptionPlanById(id);
  }
}
