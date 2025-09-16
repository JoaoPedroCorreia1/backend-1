import { BadRequestException, Injectable } from '@nestjs/common';
import { MercadoPagoConfig, Payment } from 'mercadopago';

@Injectable()
export class CheckoutTransparentService {
  private client: MercadoPagoConfig;

  constructor() {
    this.client = new MercadoPagoConfig({
      accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
      options: { timeout: 5000 },
    });
  }

  async createCardPayment(data: any) {
    const payment = new Payment(this.client);

    return payment
      .create({ body: data })
      .then((val) => {
        return val;
      })
      .catch((e) => {
        throw new BadRequestException("Error: " + e);
      });
  }
}