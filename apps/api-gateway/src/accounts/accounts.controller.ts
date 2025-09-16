import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Request,
  Body,
  UseGuards,
  ForbiddenException,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { ChildService } from '../child/child.service';
import { ParentsService } from '../parents/parents.service';
import { ClinicsService } from '../clinics/clinics.service';
import { CreateAccountDto } from 'libs/contracts/account/create-account.dto';
import { UpdateAccountDto } from 'libs/contracts/account/update-account.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SpecialistsService } from '../specialists/specialists.service';

@Controller("accounts")
export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly childService: ChildService,
    private readonly parentsService: ParentsService,
    private readonly clinicsService: ClinicsService,
    private readonly specialistService: SpecialistsService
  ) {}

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async getAccountById(@Param("id") id: string) {
    return this.accountsService.findById(id);
  }

  @Get(":id/child")
  @UseGuards(JwtAuthGuard)
  async getChildByAccountId(@Param("id") id: string) {
    return this.childService.findByAccountId(id);
  }

  @Get(":id/parents")
  @UseGuards(JwtAuthGuard)
  async getParentByAccountId(@Param("id") id: string) {
    return this.parentsService.findByAccountId(id);
  }

  @Get(":id/clinics")
  @UseGuards(JwtAuthGuard)
  async getClinicByAccountId(@Param("id") id: string) {
    return this.clinicsService.findByAccountId(id);
  }

  @Get(":id/specialist")
  @UseGuards(JwtAuthGuard)
  async getSpecialistByAccountId(@Param("id") id: string) {
    return this.specialistService.findByAccountId(id);
  }

  @Post()
  async createAccount(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.createAccount(createAccountDto);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  async updateAccountById(
    @Param("id") id: string,
    @Body() updateAccountDto: UpdateAccountDto,
    @Request() req
  ) {
    if (id != req.account.id) {
      throw new ForbiddenException("Not authorized");
    }

    return this.accountsService.updateAccountById(id, updateAccountDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAccountById(@Param("id") id, @Request() req) {
    if (id != req.account.id) {
      throw new ForbiddenException("Not authorized");
    }

    return this.accountsService.deleteAccountById(id);
  }
}
