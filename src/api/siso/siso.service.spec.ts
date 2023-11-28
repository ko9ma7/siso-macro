import { Test, TestingModule } from '@nestjs/testing';
import { SisoService } from './siso.service';

describe('SisoService', () => {
    let service: SisoService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SisoService],
        }).compile();

        service = module.get<SisoService>(SisoService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
