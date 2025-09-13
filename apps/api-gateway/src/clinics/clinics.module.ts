import { Module } from '@nestjs/common';
import { ClinicsController } from './clinics.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ClinicsService } from './clinics.service';
import { ChildModule } from '../child/child.module';

@Module({
  imports: [
    ChildModule,
    ClientsModule.register([
      {
        name: "CLINICS",
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: "clinics",
            brokers: ["kafka:9092"],
          },
          consumer: {
            groupId: "clinics-consumer",
          },
        },
      },
    ]),
  ],
  controllers: [ClinicsController],
  providers: [ClinicsService],
  exports: [ClinicsService]
})
export class ClinicsModule {}
