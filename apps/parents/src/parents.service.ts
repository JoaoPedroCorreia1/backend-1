import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/prisma/prisma.service';
import { CreateParentDto } from 'libs/contracts/parent/create-parent.dto';
import { UpdateParentDto } from 'libs/contracts/parent/update-parent.dto';

@Injectable()
export class ParentsService {
  constructor(private prisma: PrismaService) {}

  async findAllByClinicId(id: string) {
    const data = await this.prisma.parentClinic.findMany({
      where: {
        id
      },
      select: {
        parentId: true
      }
    });

    const parentIds = data.map(parent => parent.parentId);

    return await this.prisma.parents.findMany({
      where: {
        id: {
          in: parentIds
        }
      }
    });
  }

  async findById(id: string) {
    return await this.prisma.parents.findUnique({ where: { id } });
  }

  async findByAccountId(id: string) {
    return await this.prisma.parents.findUnique({ where: { accountId: id } });
  }

  async createParent(createParentDto: CreateParentDto) {
    return await this.prisma.parents.create({ data: createParentDto });
  }

  async updateParentById(id: string, updateParentDto: UpdateParentDto) {
    return await this.prisma.parents.update({
      where: { id },
      data: updateParentDto
    });
  }

  async deleteParentById(id: string) {
    return await this.prisma.parents.delete({ where: { id } });
  }
}
