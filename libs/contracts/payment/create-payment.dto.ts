export class CreatePaymentDto {
  userId: string;
  providerId?: string;
  type: string;
  data: {
    token?: string,
    issuer_id?: number,
    payment_method_id?: string,
    transaction_amount: number,
    installments?: number,
    description: string,
    payer?: {
      email?: string,
      identification?: {
        type?: string,
        number?: string
      }
    }
  };
}