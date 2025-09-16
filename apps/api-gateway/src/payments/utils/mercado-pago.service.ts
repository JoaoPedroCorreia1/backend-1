import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MercadoPagoService {
  private readonly baseUrl = process.env.MERCADO_PAGO_BASE_URL!;
  private readonly accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN!;

  constructor(private readonly httpService: HttpService) {}

  async getPaymentById(paymentId: string) {
    try {
      const response$ = this.httpService.get(`${this.baseUrl}/v1/payments/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      const response = await lastValueFrom(response$);
      return response.data;
    } catch (error) {
      throw new NotFoundException("Payment not found");
    }
  }
}