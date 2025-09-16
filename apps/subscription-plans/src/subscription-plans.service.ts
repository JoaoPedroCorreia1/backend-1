import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/prisma/prisma.service';
import { CreateSubscriptionPlanDto } from 'libs/contracts/subscription-plan/create-subscription-plan.dto';
import { UpdateSubscriptionPlanDto } from 'libs/contracts/subscription-plan/update-subscription-plan.dto';

@Injectable()
export class SubscriptionPlansService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    return await this.prisma.subscriptionPlans.findUnique({ where: { id } });
  }

  async createSubscriptionPlan(createSubscriptionPlanDto: CreateSubscriptionPlanDto) {
    return await this.prisma.subscriptionPlans.create({ data: createSubscriptionPlanDto });
  }

  async updateSubscriptionPlanById(id: string, updateSubscriptionPlanDto: UpdateSubscriptionPlanDto) {
    return await this.prisma.subscriptionPlans.update({
      where: { id },
      data: updateSubscriptionPlanDto
    });
  }

  async deleteSubscriptionPlanById(id: string) {
    return await this.prisma.subscriptionPlans.delete({ where: { id } });
  }
}
