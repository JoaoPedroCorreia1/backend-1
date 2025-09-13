import { Module } from '@nestjs/common';
import { ParentsController } from './parents.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ParentsService } from './parents.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "PARENTS",
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: "parents",
            brokers: ["kafka:9092"],
          },
          consumer: {
            groupId: "parents-consumer",
          },
        },
      },
    ]),
  ],
  controllers: [ParentsController],
  providers: [ParentsService],
  exports: [ParentsService]
})
export class ParentsModule {}
