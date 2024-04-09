import { Test, TestingModule } from '@nestjs/testing';
import { StacktopController } from './stacktop.controller';
import { StacktopService } from './stacktop.service';

describe('StacktopController', () => {
  let controller: StacktopController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StacktopController],
      providers: [StacktopService],
    }).compile();

    controller = module.get<StacktopController>(StacktopController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
