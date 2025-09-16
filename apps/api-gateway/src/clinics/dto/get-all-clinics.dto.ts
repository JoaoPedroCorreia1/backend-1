import { IsString, IsOptional } from 'class-validator';

export class GetAllClinicsDto {
  @IsString()
  @IsOptional()
  childId: string;

  @IsString()
  @IsOptional()
  parentId: string;
}