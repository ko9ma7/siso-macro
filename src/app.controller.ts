import { SisoService } from './siso/siso.service';
import { Controller, Get, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly sisoService: SisoService,
  ) {}

  @Get()
  @Render('index')
  async index() {
    let result = {};
    try {
      result = await this.sisoService.doReservation();
    } catch (error) {
      console.log(error);
      return { data: null, error: error };
    }

    return { data: result };
  }
}
