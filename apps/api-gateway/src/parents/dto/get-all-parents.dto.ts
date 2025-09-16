import { IsOptional, IsString } from "class-validator";

export class GetAllParentsDto {
    @IsString()
    @IsOptional()
    clinicId: string;
}