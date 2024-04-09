import { Test, TestingModule } from '@nestjs/testing';
import { StacklistController } from './stacklist.controller';
import { StacklistService } from './stacklist.service';

describe('StacklistController', () => {
  let controller: StacklistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StacklistController],
      providers: [StacklistService],
    }).compile();

    controller = module.get<StacklistController>(StacklistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
