import { IsOptional, IsString } from "class-validator";

export class GetAllReportsDto {
    @IsString()
    @IsOptional()
    clinicId: string;

    @IsString()
    @IsOptional()
    childId: string;

    @IsString()
    @IsOptional()
    specialistId: string;
}