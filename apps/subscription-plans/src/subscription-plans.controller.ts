import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { SubscriptionPlansService } from './subscription-plans.service';
import { SUBSCRIPTION_PLAN_PATTERNS } from 'libs/contracts/subscription-plan/subscription-plan.patterns';
import { CreateSubscriptionPlanDto } from 'libs/contracts/subscription-plan/create-subscription-plan.dto';
import { UpdateSubscriptionPlanDto } from 'libs/contracts/subscription-plan/update-subscription-plan.dto';

@Controller()
export class SubscriptionPlansController {
  constructor(private readonly subscriptionPlansService: SubscriptionPlansService) {}

  @MessagePattern(SUBSCRIPTION_PLAN_PATTERNS.GET_SUBSCRIPTION_PLAN_BY_ID)
  async getSubscriptionPlanById(id: string) {
    return await this.subscriptionPlansService.findById(id);
  }

  @MessagePattern(SUBSCRIPTION_PLAN_PATTERNS.CREATE_SUBSCRIPTION_PLAN)
  async createSubscriptionPlan(createSubscriptionPlanDto: CreateSubscriptionPlanDto) {
    return await this.subscriptionPlansService.createSubscriptionPlan(createSubscriptionPlanDto);
  }

  @MessagePattern(SUBSCRIPTION_PLAN_PATTERNS.UPDATE_SUBSCRIPTION_PLAN_BY_ID)
  async updateSubscriptionPlanById([id, updateSubscriptionPlanDto]: [string, UpdateSubscriptionPlanDto]) {
    return await this.subscriptionPlansService.updateSubscriptionPlanById(id, updateSubscriptionPlanDto);
  }

  @MessagePattern(SUBSCRIPTION_PLAN_PATTERNS.DELETE_SUBSCRIPTION_PLAN_BY_ID)
  async deleteSubscriptionPlanById(id: string) {
    return await this.subscriptionPlansService.deleteSubscriptionPlanById(id);
  }
}
