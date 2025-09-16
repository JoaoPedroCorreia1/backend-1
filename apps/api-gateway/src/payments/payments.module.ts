import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HttpModule } from '@nestjs/axios';
import { PaymentsService } from './payments.service';
import { MercadoPagoService } from './utils/mercado-pago.service';

@Module({
  imports: [
    HttpModule,
    ClientsModule.register([
      {
        name: "PAYMENTS",
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: "payments-consumer",
            brokers: ["kafka:9092"],
          },
          consumer: {
            groupId: "payments-consumer",
          },
        },
      },
    ]),
  ],
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    MercadoPagoService
  ],
  exports: [PaymentsService]
})
export class PaymentsModule {}
