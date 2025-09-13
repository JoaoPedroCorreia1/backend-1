import { Test, TestingModule } from '@nestjs/testing';
import { ClinicsController } from './clinics.controller';
import { ClinicsService } from './clinics.service';

describe('ClinicsController', () => {
  let clinicsController: ClinicsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ClinicsController],
      providers: [ClinicsService],
    }).compile();

    clinicsController = app.get<ClinicsController>(ClinicsController);
  });
});
