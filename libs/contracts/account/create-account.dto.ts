export class CreateAccountDto {
    email: string;
    subscriptionPlanId?: string;
    password: string;
    name: string;
    phone: string;
    userType: string;
}
