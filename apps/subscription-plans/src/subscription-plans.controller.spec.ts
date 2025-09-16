import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionPlansController } from './subscription-plans.controller';
import { SubscriptionPlansService } from './subscription-plans.service';

describe('SubscriptionPlansController', () => {
  let subscriptionPlansController: SubscriptionPlansController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SubscriptionPlansController],
      providers: [SubscriptionPlansService],
    }).compile();

    subscriptionPlansController = app.get<SubscriptionPlansController>(SubscriptionPlansController);
  });
});
