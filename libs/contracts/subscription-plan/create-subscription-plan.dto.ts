export class CreateSubscriptionPlanDto {
  accountId: string;
  type: string;
  status: string;
  expireDate?: Date;
}
