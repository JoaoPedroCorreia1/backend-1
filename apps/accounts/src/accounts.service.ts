import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/prisma/prisma.service';
import { CreateAccountDto } from 'libs/contracts/account/create-account.dto';
import { UpdateAccountDto } from 'libs/contracts/account/update-account.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    return await this.prisma.accounts.findUnique({ 
      where: { id },
      select: {
        id: true,
        subscriptionPlanId: true,
        email: true,
        name: true,
        phone: true,
        userType: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.accounts.findUnique({ where: { email }});
  }

  async createAccount(createAccountDto: CreateAccountDto) {
    const hashedPassword = await bcrypt.hash(createAccountDto.password, 10);

    createAccountDto.password = hashedPassword;
    
    return await this.prisma.accounts.create({ 
      data: createAccountDto,
      select: {
        id: true,
        subscriptionPlanId: true,
        email: true,
        name: true,
        phone: true,
        userType: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }

  async updateAccountById(id: string, updateAccountDto: UpdateAccountDto) {
    return await this.prisma.accounts.update({
      where: { id },
      data: updateAccountDto,
      select: {
        id: true,
        subscriptionPlanId: true,
        email: true,
        name: true,
        phone: true,
        userType: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }

  async deleteAccountById(id: string) {
    return await this.prisma.accounts.delete({ where: { id } });
  }
}
