import { Module } from '@nestjs/common';
import { SisoService } from './siso.service';

@Module({
    providers: [SisoService],
    exports: [SisoService],
})
export class SisoModule {}
