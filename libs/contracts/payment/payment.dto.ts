export class PaymentDto {
    id: string;
    userId: string;
    providerId?: string;
    status: string;
    amount: number;
    type: string;
}