import { CreateParentDto } from "./create-parent.dto";

export class UpdateParentDto implements Partial<CreateParentDto> {
    accountId?: string;
}
