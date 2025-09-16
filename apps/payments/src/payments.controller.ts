import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PaymentsService } from './payments.service';
import { PAYMENT_PATTERNS } from 'libs/contracts/payment/payment.patterns';
import { CreatePaymentDto } from 'libs/contracts/payment/create-payment.dto';
import { UpdatePaymentDto } from 'libs/contracts/payment/update-payment.dto';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentService: PaymentsService) {}

  @MessagePattern(PAYMENT_PATTERNS.GET_PAYMENT_BY_ID)
  async getPaymentById(id: string) {
    return await this.paymentService.findById(id);
  }

  @MessagePattern(PAYMENT_PATTERNS.CREATE_CARD_PAYMENT)
  async createCardPayment(createPaymentDto: CreatePaymentDto) {
    return await this.paymentService.createCardPayment(createPaymentDto);
  }

  @MessagePattern(PAYMENT_PATTERNS.CREATE_PIX_PAYMENT)
  async createPixPayment(createPaymentDto: CreatePaymentDto) {
    return await this.paymentService.createPixPayment(createPaymentDto);
  }

  @MessagePattern(PAYMENT_PATTERNS.UPDATE_PAYMENT_BY_ID)
  async updatePaymentById([id, updatePaymentDto]: [string, UpdatePaymentDto]) {
    return await this.paymentService.updatePaymentById(id, updatePaymentDto);
  }

  @MessagePattern(PAYMENT_PATTERNS.REMOVE_USER_FROM_PAYMENTS)
  async removeUserFromPayments(id: string) {
    return await this.paymentService.removeUserFromPayments(id);
  }

  @MessagePattern(PAYMENT_PATTERNS.REMOVE_PROVIDER_FROM_PAYMENTS)
  async removeDriverFromPayments(id: string) {
    return await this.paymentService.removeProviderFromPayments(id);
  }

  @MessagePattern(PAYMENT_PATTERNS.DELETE_PAYMENT_BY_ID)
  async deletePaymentById(id: string) {
    return await this.paymentService.deletePaymentById(id);
  }
}
