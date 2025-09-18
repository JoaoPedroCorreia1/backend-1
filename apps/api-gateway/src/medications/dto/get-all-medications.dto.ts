import { IsOptional, IsString } from "class-validator";

export class GetAllMedicationsDto {
    @IsString()
    @IsOptional()
    childId: string;
}