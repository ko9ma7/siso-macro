import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SisoModule } from './api/siso/siso.module';
import { ApiController } from './api/api.controller';

@Module({
    imports: [SisoModule],
    controllers: [AppController, ApiController],
    providers: [AppService],
})
export class AppModule {}
