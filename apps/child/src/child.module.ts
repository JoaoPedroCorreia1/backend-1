import { Module } from '@nestjs/common';
import { ChildController } from './child.controller';
import { ChildService } from './child.service';
import { PrismaService } from '@libs/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [ChildController],
  providers: [ChildService, PrismaService],
})
export class ChildModule {}
