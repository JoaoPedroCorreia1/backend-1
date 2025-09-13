import { Test, TestingModule } from '@nestjs/testing';
import { ChildController } from './child.controller';

describe('ChildController', () => {
  let controller: ChildController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ChildController],
    }).compile();

    controller = app.get<ChildController>(ChildController);
  });
});
