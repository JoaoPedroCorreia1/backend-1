import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { SpecialistsModule } from './specialists.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SpecialistsModule,
    {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka:9092'],
      },
      consumer: {
        groupId: 'specialists-consumer'
      },
    },
  });

  await app.listen();
  
  console.log("Service running");
}
bootstrap();
