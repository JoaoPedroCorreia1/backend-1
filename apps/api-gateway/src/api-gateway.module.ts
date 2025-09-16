import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { AccountsModule } from './accounts/accounts.module';
import { AuthModule } from './auth/auth.module';
import { ChildModule } from './child/child.module';
import { ClinicsModule } from './clinics/clinics.module';
import { ParentsModule } from './parents/parents.module';
import { PaymentsModule } from './payments/payments.module';
import { SpecialistsModule } from './specialists/specialists.module';
import { MedicationsModule } from './medications/medications.module';
import { ReportsModule } from './reports/reports.module';
import { SubscriptionPlansModule } from './subscription-plans/subscription-plans.module';

@Module({
  imports: [
    AccountsModule,
    AuthModule,
    ChildModule,
    ClinicsModule,
    ParentsModule,
    PaymentsModule,
    SpecialistsModule,
    MedicationsModule,
    ReportsModule,
    SubscriptionPlansModule
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
