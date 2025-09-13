import { Test, TestingModule } from '@nestjs/testing';
import { ParentsController } from './parents.controller';
import { ParentsService } from './parents.service';

describe('ParentsController', () => {
  let parentsController: ParentsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ParentsController],
      providers: [ParentsService],
    }).compile();

    parentsController = app.get<ParentsController>(ParentsController);
  });
});
