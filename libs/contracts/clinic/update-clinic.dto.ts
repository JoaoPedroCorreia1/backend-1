import { CreateClinicDto } from "./create-clinic.dto";

export class UpdateClinicDto implements Partial<CreateClinicDto> {
    accountId?: string;
    cnpj?: string;
    name?: string;
    description?: string;
}
