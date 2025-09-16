import { CreateSubscriptionPlanDto } from "./create-subscription-plan.dto";

export class UpdateSubscriptionPlanDto implements Partial<CreateSubscriptionPlanDto> {
  type?: string;
  status?: string;
  expireDate?: Date;
}
