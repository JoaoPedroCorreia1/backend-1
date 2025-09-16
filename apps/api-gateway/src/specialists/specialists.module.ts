import { Module } from '@nestjs/common';
import { SpecialistsController } from './specialists.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SpecialistsService } from './specialists.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "SPECIALISTS",
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: "specialists",
            brokers: ["kafka:9092"],
          },
          consumer: {
            groupId: "specialists-consumer",
          },
        },
      },
    ]),
  ],
  controllers: [SpecialistsController],
  providers: [SpecialistsService],
  exports: [SpecialistsService]
})
export class SpecialistsModule {}
