import { Test, TestingModule } from '@nestjs/testing';
import { StacktopService } from './stacktop.service';

describe('StacktopService', () => {
  let service: StacktopService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StacktopService],
    }).compile();

    service = module.get<StacktopService>(StacktopService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
