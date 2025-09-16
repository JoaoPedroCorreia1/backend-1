import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { PrismaService } from 'libs/prisma/prisma.service';
import { CheckoutTransparentService } from './utils/checkout-transparent.service';
import { AbacatePayService } from './utils/abacate-pay.service';


@Module({
  imports: [HttpModule],
  controllers: [PaymentsController],
  providers: [
    PaymentsService, 
    PrismaService, 
    CheckoutTransparentService,
    AbacatePayService
  ]
})
export class PaymentsModule {}
