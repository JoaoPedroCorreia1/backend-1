import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/prisma/prisma.service';
import { CreateChildDto } from 'libs/contracts/child/create-child.dto';
import { UpdateChildDto } from 'libs/contracts/child/update-child.dto';

@Injectable()
export class ChildService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    return await this.prisma.child.findUnique({
      where: { id },
    });
  }

  async findByAccountId(id: string) {
    return await this.prisma.child.findMany({
      where: { accountId: id },
    });
  }

  async createChild(createChildDto: CreateChildDto) {
    return await this.prisma.child.create({
      data: createChildDto,
    });
  }


  async updateChildById(id: string, updateChildDto: UpdateChildDto) {
    return await this.prisma.child.update({
      where: { id },
      data: updateChildDto,
    });
  }

  async deleteChildById(id: string) {
    return await this.prisma.child.delete({
      where: { id },
    });
  }
}
