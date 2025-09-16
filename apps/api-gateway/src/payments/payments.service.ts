import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PAYMENT_PATTERNS } from 'libs/contracts/payment/payment.patterns';
import { CreatePaymentDto } from 'libs/contracts/payment/create-payment.dto';
import { UpdatePaymentDto } from 'libs/contracts/payment/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @Inject("PAYMENTS") private readonly paymentClient: ClientKafka
  ) {}

  async onModuleInit() {
    Object.values(PAYMENT_PATTERNS).forEach((pattern) => {
      this.paymentClient.subscribeToResponseOf(pattern);
    });
  
    await this.paymentClient.connect();
  }

  async findById(id: string) {
    return await firstValueFrom(this.paymentClient
      .send(PAYMENT_PATTERNS.GET_PAYMENT_BY_ID, id));
  }

  async createCardPayment(createPaymentDto: CreatePaymentDto) {
    return await firstValueFrom(this.paymentClient
      .send(PAYMENT_PATTERNS.CREATE_CARD_PAYMENT, createPaymentDto));
  }

  async createPixPayment(createPaymentDto: CreatePaymentDto) {
    return await firstValueFrom(this.paymentClient
      .send(PAYMENT_PATTERNS.CREATE_PIX_PAYMENT, createPaymentDto));
  }

  async updatePaymentById(id: string, updatePaymentDto: UpdatePaymentDto) {
    return await firstValueFrom(this.paymentClient
      .send(PAYMENT_PATTERNS.UPDATE_PAYMENT_BY_ID, [id, updatePaymentDto]));
  }

  async removeUserFromPayments(id: string) {
    await firstValueFrom(this.paymentClient
      .send(PAYMENT_PATTERNS.REMOVE_USER_FROM_PAYMENTS, id));
  }

  async removeProviderFromPayments(id: string) {
    await firstValueFrom(this.paymentClient
      .send(PAYMENT_PATTERNS.REMOVE_PROVIDER_FROM_PAYMENTS, id));
  }

  async deletePaymentById(id: string) {
    await firstValueFrom(this.paymentClient
      .send(PAYMENT_PATTERNS.DELETE_PAYMENT_BY_ID, id));
  }
}
