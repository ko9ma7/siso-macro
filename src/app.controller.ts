import { SisoService } from './siso/siso.service';
import { Controller, Get, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import puppeteer from 'puppeteer';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly sisoService: SisoService,
  ) { }

  @Get()
  @Render('index')
  async index() {
    let result = {};
    try {
      const browser = await puppeteer.launch({
        headless: false,
        executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
      });
      const page = await browser.newPage();
      await page.goto('https://share.siheung.go.kr');
      await new Promise(resolve => setTimeout(resolve, 5000));
      await browser.close();
    } catch (error) {
      console.log(error);
      return { data: null, error: error };
    }

    return { data: result };
  }
}
