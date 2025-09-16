import { Module } from '@nestjs/common';
import { SubscriptionPlansController } from './subscription-plans.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SubscriptionPlansService } from './subscription-plans.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "SUBSCRIPTION_PLANS",
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: "subscription-plans",
            brokers: ["kafka:9092"],
          },
          consumer: {
            groupId: "subscription-plans-consumer",
          },
        },
      },
    ]),
  ],
  controllers: [SubscriptionPlansController],
  providers: [SubscriptionPlansService],
  exports: [SubscriptionPlansService]
})
export class SubscriptionPlansModule {}
