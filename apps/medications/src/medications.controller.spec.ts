import { Test, TestingModule } from '@nestjs/testing';
import { MedicationsController } from './medications.controller';
import { MedicationsService } from './medications.service';

describe('MedicationsController', () => {
  let medicationsController: MedicationsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MedicationsController],
      providers: [MedicationsService],
    }).compile();

    medicationsController = app.get<MedicationsController>(MedicationsController);
  });
});
