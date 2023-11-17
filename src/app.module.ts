import { SeleniumModule } from './selenium/selenium.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SisoModule } from './siso/siso.module';

@Module({
  imports: [SeleniumModule, SisoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
