import { IsOptional, IsString } from "class-validator";

export class GetAllChildDto {
    @IsString()
    @IsOptional()
    parentId: string;
    
    @IsString()
    @IsOptional()
    clinicId: string;
}