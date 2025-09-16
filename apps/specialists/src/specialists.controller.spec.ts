import { Test, TestingModule } from '@nestjs/testing';
import { SpecialistsController } from './specialists.controller';
import { SpecialistsService } from './specialists.service';

describe('SpecialistsController', () => {
  let specialistsController: SpecialistsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SpecialistsController],
      providers: [SpecialistsService],
    }).compile();

    specialistsController = app.get<SpecialistsController>(SpecialistsController);
  });
});
