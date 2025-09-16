import { Module } from '@nestjs/common';
import { MedicationsController } from './medications.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MedicationsService } from './medications.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "MEDICATIONS",
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: "medications",
            brokers: ["kafka:9092"],
          },
          consumer: {
            groupId: "medications-consumer",
          },
        },
      },
    ]),
  ],
  controllers: [MedicationsController],
  providers: [MedicationsService],
  exports: [MedicationsService]
})
export class MedicationsModule { }
