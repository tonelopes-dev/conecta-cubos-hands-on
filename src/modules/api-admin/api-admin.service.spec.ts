import { Test, TestingModule } from '@nestjs/testing';
import { CreateManagerService } from './services/create-manager.service';

describe('ApiAdminService', () => {
  let service: CreateManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateManagerService],
    }).compile();

    service = module.get<CreateManagerService>(CreateManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
