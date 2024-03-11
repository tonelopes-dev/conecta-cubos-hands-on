import { Test, TestingModule } from '@nestjs/testing';
import { ApiManagerController } from './api-manager.controller';
import { ApiManagerService } from './api-manager.service';

describe('ApiManagerController', () => {
    let controller: ApiManagerController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ApiManagerController],
            providers: [ApiManagerService],
        }).compile();

        controller = module.get<ApiManagerController>(ApiManagerController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
