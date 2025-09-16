import { Module } from '@nestjs/common';
import { SubscriptionPlansController } from './subscription-plans.controller';
import { SubscriptionPlansService } from './subscription-plans.service';
import { PrismaService } from '@libs/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [SubscriptionPlansController],
  providers: [SubscriptionPlansService, PrismaService]
})
export class SubscriptionPlansModule {}
