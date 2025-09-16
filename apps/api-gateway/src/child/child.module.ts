import { Module } from '@nestjs/common';
import { ChildController } from './child.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ChildService } from './child.service';
import { MedicationsModule } from '../medications/medications.module';

@Module({
  imports: [
    MedicationsModule,
    ClientsModule.register([
      {
        name: "CHILD",
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: "child",
            brokers: ["kafka:9092"],
          },
          consumer: {
            groupId: "child-consumer",
          },
        },
      },
    ]),
  ],
  controllers: [ChildController],
  providers: [ChildService],
  exports: [ChildService]
})
export class ChildModule {}
