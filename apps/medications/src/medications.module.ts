import { Module } from '@nestjs/common';
import { MedicationsController } from './medications.controller';
import { MedicationsService } from './medications.service';
import { PrismaService } from '@libs/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [MedicationsController],
  providers: [MedicationsService, PrismaService],
})
export class MedicationsModule {}
