import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ChildModule } from '../child/child.module';
import { ParentsModule } from '../parents/parents.module';
import { ClinicsModule } from '../clinics/clinics.module';
import { AccountsService } from './accounts.service';

@Module({
  imports: [
    ChildModule,
    ParentsModule,
    ClinicsModule,
    ClientsModule.register([
      {
        name: "ACCOUNTS",
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: "accounts",
            brokers: ["kafka:9092"],
          },
          consumer: {
            groupId: "accounts-consumer",
          },
        },
      },
    ]),
  ],
  controllers: [AccountsController],
  providers: [AccountsService],
  exports: [AccountsService]
})
export class AccountsModule {}
