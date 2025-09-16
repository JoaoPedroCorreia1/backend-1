import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AbacatePayService {
  private readonly baseUrl = process.env.ABACATEPAY_BASE_URL!;

  constructor(private readonly httpService: HttpService) {}

  async createPixPayment(data: any): Promise<any> {
    try {
      const response = await firstValueFrom(this.httpService
        .post(
          `${this.baseUrl}/v1/pixQrCode/create`,
          {
            amount: Number(data.transaction_amount),
            expiresIn: Number(process.env.PIX_EXPIRE_TIME!),
            description: data.description,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.ABACATEPAY_KEY!}`,
              "Content-Type": "application/json",
            },
          }
        )
      );

      const resData = response!.data.data;
      return {
        id: resData.id,
        code: resData.brCode,
        codeBase64: resData.brCodeBase64,
        expiresAt: resData.expiresAt
      };
    } catch (error) {
      throw new HttpException(
        error.response?.data || "Pix payment error",
        error.response?.status || 500,
      );
    }
  }
}
