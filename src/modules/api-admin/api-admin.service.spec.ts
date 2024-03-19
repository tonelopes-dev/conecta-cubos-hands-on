import { Test, TestingModule } from '@nestjs/testing';
import { ApiAdminService } from './services/create-manager.service';

describe('ApiAdminService', () => {
  let service: ApiAdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiAdminService],
    }).compile();

    service = module.get<ApiAdminService>(ApiAdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
