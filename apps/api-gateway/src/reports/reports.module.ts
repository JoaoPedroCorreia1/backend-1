import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ReportsService } from './reports.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "REPORTS",
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: "reports",
            brokers: ["kafka:9092"],
          },
          consumer: {
            groupId: "reports-consumer",
          },
        },
      },
    ]),
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService]
})
export class ReportsModule {}
