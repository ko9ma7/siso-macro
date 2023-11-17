import { SeleniumService } from './../selenium/selenium.service';
import { Injectable } from '@nestjs/common';
import { By, until } from 'selenium-webdriver';

@Injectable()
export class SisoService {
  private tryCount = 3;

  constructor(private readonly seleniumService: SeleniumService) {}

  async doReservation() {
    let result = {};

    try {
      await this.seleniumService.initialize();
      await this.login();
      // await this.reservation();
      result = await this.getResult();
    } finally {
      await this.seleniumService.quit();
      console.log('프로그램 종료');
    }

    return result;
  }

  // 로그인
  async login() {
    try {
      const url = this.seleniumService.baseUrl;
      let path = '/login.do?key=701000';
      await this.seleniumService.navigateTo(url + path);
  
      const idTab = await this.seleniumService.find(By.css(`#tab2`));
      const idInput = await this.seleniumService.find(
        By.css(`input[name="user_id"]`),
      );
      const pwInput = await this.seleniumService.find(
        By.css(`input[name="user_pw"]`),
      );
  
      await this.seleniumService.click(idTab);
      await this.seleniumService.action().sendKeys(idInput, 'koh2woo').perform();
      await this.seleniumService.action().sendKeys(pwInput, 'rh39203950').perform();
      await this.seleniumService.execute(`$('#idForm').submit();`);
    } catch (err) {
      console.log(`로그인 실패! \n ${err}`);
    }
  }

  // 예약
  async reservation() {
    const url = this.seleniumService.baseUrl;
    let path =
      '/space/view.do?searchCategory=3&searchDetailCategory=38&searchCondition=title&pageIndex=2&key=206000&use_date=&space_no=335&searchPositonDong=&searchReserve=&searchStartTime=&searchEndTime=&searchStartDate=&searchEndDate=&searchKeyword=';

    let tryCnt = 1;
    do {
      console.log(`${tryCnt}회 실행중`);
      tryCnt++;

      try {
        await this.seleniumService.navigateTo(url + path);

        const nextMth = await this.seleniumService.find(By.css(`#nextMonth`));
        await this.seleniumService.click(nextMth);
        await this.seleniumService.click(nextMth);

        const btnWrapper = await this.seleniumService.find(
          By.css(`#go_receipt_btn`),
        );
        const applyBtn = await btnWrapper.findElement(By.css('a'));
        await this.seleniumService.click(applyBtn);

        const agree = await this.seleniumService.find(By.css(`#agrApp4`));
        await this.seleniumService
          .getDriver()
          .actions()
          .move({ origin: agree })
          .click()
          .perform();

        const btnBox = await this.seleniumService.find(By.css(`.btn_box`));
        const okBtn = await btnBox.findElement(By.css('.btn_style1'));
        await this.seleniumService
          .getDriver()
          .actions()
          .move({ origin: okBtn })
          .click()
          .perform();
      } catch (e) {
        if (tryCnt > this.tryCount) {
          break;
        }
      } finally {
        await new Promise((res) => setTimeout(res, 3000));
      }
    } while (true);
  }

  // 예약결과
  async getResult() {
    let result = [];

    const url = this.seleniumService.baseUrl;
    let path = '/mypage/receipt_list.do';
    await this.seleniumService.navigateTo(url + path);

    for (let range = 0; range < 3; range++) {
      const table = await this.seleniumService.find(By.css(`table.myreservation`));
      const tbody = await table.findElement(By.css(`tbody`));
      const trList = await tbody.findElements(By.css(`tr`));

      for (let tr of trList) {
        
        const tdList = await tr.findElements(By.css(`td`));

  
        let resv = {};
        for (const idx in tdList) {
          if (idx === '0') resv['no'] = await tdList[idx].getText();
          if (idx === '1') resv['name'] = await tdList[idx].getText();
          if (idx === '3') resv['date'] = await tdList[idx].getText();
          if (idx === '4') resv['apply'] = await tdList[idx].getText();
          if (idx === '6') resv['status'] = await tdList[idx].getText();
        }
  
        result.push(resv);
      }
  
      const paginationWrapper = await this.seleniumService.find(By.css(`div.pagination.a2`));
      const current = await paginationWrapper.findElement(By.css(`a.current`));
      const next = await current.findElement(By.xpath('following-sibling::a'));
      await this.seleniumService.getDriver().wait(until.elementIsVisible(next), 5000);
  
      await this.seleniumService
        .getDriver()
        .actions()
        .move({ origin: next })
        .click()
        .perform();
      await this.seleniumService.getDriver().manage().setTimeouts({ implicit: 5000 });
    }
    
    return result;
  }
}
