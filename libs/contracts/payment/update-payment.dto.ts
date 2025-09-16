import { PaymentDto } from "./payment.dto";

export class UpdatePaymentDto implements Partial<PaymentDto> {
  type?: string;
  status?: string;
  amount?: number;
}