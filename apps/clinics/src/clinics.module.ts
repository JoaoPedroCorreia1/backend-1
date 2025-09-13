import { Module } from '@nestjs/common';
import { ClinicsController } from './clinics.controller';
import { ClinicsService } from './clinics.service';
import { PrismaService } from 'libs/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [ClinicsController],
  providers: [ClinicsService, PrismaService],
})
export class ClinicsModule {}
