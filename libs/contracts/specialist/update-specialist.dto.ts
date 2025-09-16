import { CreateSpecialistDto } from "./create-specialist.dto";

export class UpdateSpecialistDto implements Partial<CreateSpecialistDto> {
    accountId?: string;
    cnpj?: string;
    description?: string;
}
