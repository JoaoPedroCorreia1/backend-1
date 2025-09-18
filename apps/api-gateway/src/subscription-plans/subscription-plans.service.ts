import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { SUBSCRIPTION_PLAN_PATTERNS } from 'libs/contracts/subscription-plan/subscription-plan.patterns';
import { CreateSubscriptionPlanDto } from 'libs/contracts/subscription-plan/create-subscription-plan.dto';
import { UpdateSubscriptionPlanDto } from 'libs/contracts/subscription-plan/update-subscription-plan.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SubscriptionPlansService {
  constructor(
    @Inject("SUBSCRIPTION_PLANS") private readonly subscriptionPlansClient: ClientKafka
  ) {}

  async onModuleInit() {
    for (let pattern of Object.values(SUBSCRIPTION_PLAN_PATTERNS)) {
      this.subscriptionPlansClient.subscribeToResponseOf(pattern);
    }

    await this.subscriptionPlansClient.connect();
  }

  async findById(id: string) {
    const subscriptionPlan = await firstValueFrom(
      this.subscriptionPlansClient.send(SUBSCRIPTION_PLAN_PATTERNS.GET_SUBSCRIPTION_PLAN_BY_ID, id));

    if (subscriptionPlan == null) {
      throw new NotFoundException("Subscription plan not found");
    }

    return subscriptionPlan;
  }

  async createSubscriptionPlan(createSubscriptionPlanDto: CreateSubscriptionPlanDto) {
    return await firstValueFrom(this.subscriptionPlansClient
      .send(SUBSCRIPTION_PLAN_PATTERNS.CREATE_SUBSCRIPTION_PLAN, createSubscriptionPlanDto));
  }

  async updateSubscriptionPlanById(id: string, updateSubscriptionPlanDto: UpdateSubscriptionPlanDto) {
    return await firstValueFrom(this.subscriptionPlansClient
      .send(SUBSCRIPTION_PLAN_PATTERNS.UPDATE_SUBSCRIPTION_PLAN_BY_ID, [id, updateSubscriptionPlanDto]));
  }

  async deleteSubscriptionPlanById(id: string) {
    return await firstValueFrom(this.subscriptionPlansClient
      .send(SUBSCRIPTION_PLAN_PATTERNS.DELETE_SUBSCRIPTION_PLAN_BY_ID, id));
  }
}
