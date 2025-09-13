import { Module } from '@nestjs/common';
import { ParentsController } from './parents.controller';
import { ParentsService } from './parents.service';
import { PrismaService } from 'libs/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [ParentsController],
  providers: [ParentsService, PrismaService],
})
export class ParentsModule {}
