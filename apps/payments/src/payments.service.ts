import { BadRequestException, Injectable } from '@nestjs/common';
import { CheckoutTransparentService } from './utils/checkout-transparent.service';
import { AbacatePayService } from './utils/abacate-pay.service';
import { PrismaService } from 'libs/prisma/prisma.service';
import { CreatePaymentDto } from 'libs/contracts/payment/create-payment.dto';
import { UpdatePaymentDto } from 'libs/contracts/payment/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    private checkoutService: CheckoutTransparentService,
    private abacatePayService: AbacatePayService,
    private prisma: PrismaService
  ) {}

  async findById(id: string) {
    return this.prisma.payments.findUnique({ where: { id } });
  }

  async createCardPayment(createPaymentDto: CreatePaymentDto) {
    const res = await this.checkoutService
      .createCardPayment(createPaymentDto.data);

    switch (res.status) {
      case "in_process":
        return {
          "message": "Payment in process"
        }
      case "rejected":
        throw new BadRequestException("Payment rejected");
    }

    const payment = {
      id: `${res.id}`,
      amount: createPaymentDto.data.transaction_amount,
      userId: createPaymentDto.userId,
      providerId: createPaymentDto.providerId || "",
      type: createPaymentDto.type,
      status: res.status!
    }

    await this.prisma.payments.create({ data: payment })

    return res;
  }

  async createPixPayment(createPaymentDto: CreatePaymentDto) {
    const res = await this.abacatePayService
        .createPixPayment(createPaymentDto.data);

    const payment = {
      id: res.id || "",
      amount: createPaymentDto.data.transaction_amount,
      userId: createPaymentDto.userId,
      providerId: createPaymentDto.providerId || "",
      type: createPaymentDto.type,
      status: "waiting"
    }

    await this.prisma.payments.create({ data: payment })

    return res;
  }

  async updatePaymentById(id: string, updatePaymentDto: UpdatePaymentDto) {
    return this.prisma.payments.update({
      where: { id },
      data: updatePaymentDto
    });
  }

  async removeUserFromPayments(id: string) {
    await this.prisma.payments.updateMany({
      where: { userId: id },
      data: {
        userId: ""
      }
    });
  }

  async removeProviderFromPayments(id: string) {
    await this.prisma.payments.updateMany({
      where: { providerId: id },
      data: {
        providerId: ""
      }
    });
  }

  async deletePaymentById(id: string) {
    await this.prisma.payments.delete({ where: { id } });
  }
}
