import { Injectable } from '@nestjs/common';
import {
  Builder,
  Capabilities,
  WebDriver,
  By,
  until,
} from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';

@Injectable()
export class SeleniumService {
  private driver: WebDriver;
  public readonly baseUrl: string = 'https://share.siheung.go.kr';
  public readonly areaList = [11, 28, 41];
  public readonly minYear = 2020;
  public readonly maxYear = 2023;

  async initialize() {
    const options = new Options();
    this.driver = await new Builder()
      .withCapabilities(Capabilities.chrome())
      .setChromeOptions(options.addArguments('--headless=new'))
      .build();
  }

  async quit() {
    if (this.driver) {
      await this.driver.quit();
    }
  }

  async navigateTo(url: string) {
    await this.driver.get(url);
  }

  async execute(script: string) {
    await this.driver.executeScript(script);
  }

  async find(by: By) {
    return await this.driver.findElement(by);
  }

  action(option?: object) {
    return this.driver.actions(option ?? {});
  }

  async click(elem: any) {
    await this.action().move({ origin: elem }).click().perform();
  }

  async wait() {
    await this.driver.wait(
      until.elementLocated(By.id('info.search.place.list')),
      2000,
    );
  }

  async getParams() {
    // 현재 페이지의 URL 가져오기
    const currentUrl = await this.driver.getCurrentUrl();

    // URL을 파싱하여 query string 가져오기
    return new URLSearchParams(currentUrl);
  }

  // 특정 key에 해당하는 value 가져오기 (예: 'parameterName')
  async getParamValue(key: string) {
    const params = await this.getParams();
    return params.get(key);
  }

  getDriver() {
    return this.driver;
  }
}
