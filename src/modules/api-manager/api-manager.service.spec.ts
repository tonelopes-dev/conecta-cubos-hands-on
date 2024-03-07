import { Test, TestingModule } from '@nestjs/testing';
import { ApiManagerService } from './api-manager.service';

describe('ApiManagerService', () => {
    let service: ApiManagerService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ApiManagerService],
        }).compile();

        service = module.get<ApiManagerService>(ApiManagerService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
