import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/prisma/prisma.service';
import { CreateClinicDto } from 'libs/contracts/clinic/create-clinic.dto';
import { UpdateClinicDto } from 'libs/contracts/clinic/update-clinic.dto';

@Injectable()
export class ClinicsService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.clinics.findUnique({
      where: { id },
    });
  }

  async findByAccountId(id: string) {
    return this.prisma.clinics.findUnique({
      where: { accountId: id },
    });
  }

  async findClinicsByClildId(id: string) {
    const data = await this.prisma.childClinic.findMany({
      where: {
        id
      },
      select: {
        childId: true
      }
    });

    const childIds = data.map(child => child.childId);

    return await this.prisma.clinics.findMany({
      where: {
        id: {
          in: childIds
        }
      }
    });
  }

  async findClinicsByParentId(id: string) {
    const data = await this.prisma.parentClinic.findMany({
      where: {
        id
      },
      select: {
        parentId: true
      }
    });

    const parentIds = data.map(parent => parent.parentId);

    return await this.prisma.clinics.findMany({
      where: {
        id: {
          in: parentIds
        }
      }
    });
  }

  async addChildToClinic(id: string, childId: string) {
    return await this.prisma.childClinic.create({
      data: {
        id,
        childId: childId
      }
    });
  }

  async addParentToClinic(id: string, parentId: string) {
    return await this.prisma.parentClinic.create({
      data: {
        id,
        parentId
      }
    });
  }

  async createClinic(createClinicDto: CreateClinicDto) {
    return this.prisma.clinics.create({
      data: createClinicDto,
    });
  }

  async updateClinicById(id: string, updateClinicDto: UpdateClinicDto) {
    return this.prisma.clinics.update({
      where: { id },
      data: updateClinicDto,
    });
  }

  async removeChildFromClinic(id: string, childId: string) {
    await this.prisma.childClinic.delete({
      where: {
        id_childId: {
          id,
          childId
        }
      }
    });
  }

  async removeParentFromClinic(id: string, parentId: string) {
    await this.prisma.parentClinic.delete({
      where: {
        id_parentId: {
          id,
          parentId
        }
      }
    });
  }

  async deleteClinicById(id: string) {
    return this.prisma.clinics.delete({
      where: { id },
    });
  }
}
