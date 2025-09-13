import { CreateChildDto } from "./create-child.dto";

export class UpdateChildDto implements Partial<CreateChildDto> {
    accountId?: string;
    parentId?: string;
    name?: string;
    birthDate?: Date;
    diet?: string;
}
