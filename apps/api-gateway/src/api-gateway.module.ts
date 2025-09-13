import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { AccountsModule } from './accounts/accounts.module';
import { AuthModule } from './auth/auth.module';
import { ChildModule } from './child/child.module';
import { ClinicsModule } from './clinics/clinics.module';
import { ParentsModule } from './parents/parents.module';

@Module({
  imports: [
    AccountsModule,
    AuthModule,
    ChildModule,
    ClinicsModule,
    ParentsModule
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
