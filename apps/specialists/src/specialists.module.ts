import { Module } from '@nestjs/common';
import { SpecialistsController } from './specialists.controller';
import { SpecialistsService } from './specialists.service';
import { PrismaService } from '@libs/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [SpecialistsController],
  providers: [SpecialistsService, PrismaService],
})
export class SpecialistsModule {}
