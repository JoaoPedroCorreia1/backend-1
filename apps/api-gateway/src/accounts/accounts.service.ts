import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ACCOUNT_PATTERNS } from 'libs/contracts/account/account.patterns';
import { CreateAccountDto } from 'libs/contracts/account/create-account.dto';
import { UpdateAccountDto } from 'libs/contracts/account/update-account.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AccountsService {
  constructor(
    @Inject("ACCOUNTS") private readonly accountsClient: ClientKafka
  ) {}

  async onModuleInit() {
    for (let pattern of Object.values(ACCOUNT_PATTERNS)) {
      this.accountsClient.subscribeToResponseOf(pattern);
    }

    await this.accountsClient.connect();
  }

  async findById(id: string) {
    const account = await firstValueFrom(
      this.accountsClient.send(ACCOUNT_PATTERNS.GET_ACCOUNT_BY_ID, id));

    if (account == null) {
      throw new NotFoundException("Account not found");
    }

    return account;
  }

  async findByEmail(email: string) {
    const account = await firstValueFrom(
      this.accountsClient.send(ACCOUNT_PATTERNS.GET_ACCOUNT_BY_EMAIL, email));

    if (account == null) {
      throw new NotFoundException("Account not found");
    }

    return account;
  }

  async createAccount(createAccountDto: CreateAccountDto) {
    return await firstValueFrom(this.accountsClient
      .send(ACCOUNT_PATTERNS.CREATE_ACCOUNT, createAccountDto));
  }

  async updateAccountById(id: string, updateAccountDto: UpdateAccountDto) {
    return await firstValueFrom(this.accountsClient
      .send(ACCOUNT_PATTERNS.UPDATE_ACCOUNT_BY_ID, [id, updateAccountDto]));
  }

  async deleteAccountById(id: string) {
    return await firstValueFrom(this.accountsClient
      .send(ACCOUNT_PATTERNS.DELETE_ACCOUNT_BY_ID, id));
  }
}
