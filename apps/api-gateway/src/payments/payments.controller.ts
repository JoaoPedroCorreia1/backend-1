import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Headers,
  Param,
  Query,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
  BadRequestException
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MercadoPagoService } from './utils/mercado-pago.service';
import { CreatePaymentDto } from 'libs/contracts/payment/create-payment.dto';
import { UpdatePaymentDto } from 'libs/contracts/payment/update-payment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { keyValidator } from './utils/key-validator';

@Controller("payments")
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly mercadoPagoService: MercadoPagoService
  ) {}

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async getPaymentById(@Param("id") id: string) {
    return await this.paymentsService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    switch (createPaymentDto.type) {
      case "card":
        await this.paymentsService.createCardPayment(createPaymentDto);

        return {
          "message": "sucess"
        }
      case "pix":
        return await this.paymentsService.createPixPayment(createPaymentDto);
    }  
  }

  @Post("/webhook/card")
  @HttpCode(HttpStatus.OK)
  async cardPaymentEvent(
    @Headers("x-signature") xSignature: any,
    @Headers('x-request-id') xRequestId: string,
    @Body() body: any
  ) {
    const action = body.action;

    if (action != "payment.updated") {
      return;
    }

    const id = body.data.id;

    const isKeyValid = keyValidator
      .validateMercadoPagoSignature(xSignature, xRequestId, id);

    if (isKeyValid === false) {
      throw new UnauthorizedException("Invalid key");
    }

    if (action != "payment.updated") {
      throw new BadRequestException("Bad Request");
    }

    const res = await this.mercadoPagoService.getPaymentById(id);
    const status = res.status;

    if (status != "approved") {
      throw new BadRequestException("Payment not approved");
    }

    let updatePaymentDto = new UpdatePaymentDto();
    updatePaymentDto.status = status;
    
    this.paymentsService.updatePaymentById(id, updatePaymentDto);

    return {
      "message": "sucess"
    }
  }

  @Post("/webhook/pix")
  @HttpCode(HttpStatus.OK)
  async pixPaymentEvent(
    @Query() query: any,
    @Body() body: any,
  ) {
    const secretKey = query.webhookSecret;

    if (secretKey != process.env.PIX_WEBHOOK_SECRET_KEY) {
      throw new UnauthorizedException("Invalid key");
    }

    const id = body.data.pixQrCode.id;

    let updatePaymentDto = new UpdatePaymentDto();
    updatePaymentDto.status = "approved";

    this.paymentsService.updatePaymentById(id, updatePaymentDto);

    return {
      "message": "sucess"
    }
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  async updatePaymentById(
    @Param("id") id: string,
    @Body() updatePaymentDto: UpdatePaymentDto
  ) {
    return await this.paymentsService.updatePaymentById(id, updatePaymentDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  async deletePaymentById(@Param("id") id: string) {
    await this.paymentsService.deletePaymentById(id);
  }
}
