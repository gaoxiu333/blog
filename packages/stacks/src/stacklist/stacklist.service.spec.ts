import { Test, TestingModule } from '@nestjs/testing';
import { StacklistService } from './stacklist.service';

describe('StacklistService', () => {
  let service: StacklistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StacklistService],
    }).compile();

    service = module.get<StacklistService>(StacklistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
