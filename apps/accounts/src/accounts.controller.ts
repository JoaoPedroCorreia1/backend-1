import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AccountsService } from './accounts.service';
import { ACCOUNT_PATTERNS } from 'libs/contracts/account/account.patterns';
import { CreateAccountDto } from 'libs/contracts/account/create-account.dto';
import { UpdateAccountDto } from 'libs/contracts/account/update-account.dto';

@Controller()
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @MessagePattern(ACCOUNT_PATTERNS.GET_ACCOUNT_BY_ID)
  async getAccountById(id: string) {
    return await this.accountsService.findById(id);
  }

  @MessagePattern(ACCOUNT_PATTERNS.GET_ACCOUNT_BY_EMAIL)
  async getAccountByEmail(email: string) {
    return await this.accountsService.findByEmail(email);
  }

  @MessagePattern(ACCOUNT_PATTERNS.CREATE_ACCOUNT)
  async createAccount(createAccountDto: CreateAccountDto) {
    return await this.accountsService.createAccount(createAccountDto);
  }

  @MessagePattern(ACCOUNT_PATTERNS.UPDATE_ACCOUNT_BY_ID)
  async updateAccountById([id, updateAccountDto]: [string, UpdateAccountDto]) {
    return await this.accountsService.updateAccountById(id, updateAccountDto);
  }

  @MessagePattern(ACCOUNT_PATTERNS.DELETE_ACCOUNT_BY_ID)
  async deleteAccountById(id: string) {
    return await this.accountsService.deleteAccountById(id);
  }
}
