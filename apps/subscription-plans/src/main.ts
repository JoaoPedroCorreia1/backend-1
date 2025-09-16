import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { SubscriptionPlansModule } from './subscription-plans.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SubscriptionPlansModule,
    {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka:9092'],
      },
      consumer: {
        groupId: 'subscription-plans-consumer'
      },
    },
  });

  await app.listen();
  
  console.log("Service running");
}
bootstrap();
