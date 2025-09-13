import { CreateAccountDto } from "./create-account.dto";

export class UpdateAccountDto implements Partial<CreateAccountDto> {
    email?: string;
    password?: string;
    name?: string;
    phone?: string;
    userType?: string;
}
