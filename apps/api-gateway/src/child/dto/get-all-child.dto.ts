import { IsOptional, IsString } from "class-validator";

export class GetAllChildDto {
    @IsString()
    @IsOptional()
    clinicId: string;
}