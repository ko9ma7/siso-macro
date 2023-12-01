import puppeteer, { Browser, Page } from "puppeteer-core";

export default class SisoService {
    private host = 'https://share.siheung.go.kr';
    private browser: Browser;
    private pages: Page[];
    private month: number = 1;
    private timeList = ['10:00', '12:00'];
    private maxCnt = 1000;
    private waitTime = 600000;

    async setBrowser() {
        this.browser = await puppeteer.launch({
            executablePath:
                'C:/Program Files/Google/Chrome/Application/chrome.exe',
            headless: false,
            defaultViewport: { width: 1920, height: 1080 }, // 브라우저 창 크기 설정 (기본값: 800x600)
            args: ['--start-maximized'], // 최대화된 창으로 시작
        });

        this.pages = await this.browser.pages();
    }

    private loginPage = () => this.pages[0];

    // async run(body: any): Promise<any> {
    //     const result = [];

    //     await this.setBrowser();
    //     await this.login(body.id, body.pw);

    //     await this.inhanceSpeed();

    //     this.page.on('dialog', async (dialog) => {
    //         await new Promise((resolve) => setTimeout(resolve, 5000));
    //         await dialog.accept();
    //     });

    //     let tryCnt = 1;
    //     while (tryCnt < this.maxCnt) {
    //         try {
    //             console.log(`시도횟수: ${tryCnt}`);
    //             tryCnt++;

    //             const start = this.startDate();
    //             const end = this.endDate();

    //             const timeDiff = Math.abs(end.getTime() - start.getTime());
    //             const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    //             for (let i = 0; i <= dayDiff; i++) {

    //                 const current = new Date(start);
    //                 current.setDate(start.getDate() + i);
    //                 const date = this.dateToStr(current);

    //                 for (const time of this.timeList) {
    //                     console.log(date + ' ' + time);
    //                     if (this.isStaurday(current)) {
    //                         const res = await this.book(date, time);
    //                         if (res) result.push(res);
    //                     }
    //                 }
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }

    //     await new Promise((resolve) => setTimeout(resolve, 5000));
    //     await this.browser.close();
    //     return result;
    // }

    async login(id: string, pw: string) {
        await this.loginPage().goto(this.host + '/login.do?key=701000');

        await this.loginPage().click('a#tab2');

        await this.loginPage().type('input[name="user_id"]', id);
        await this.loginPage().type('input[name="user_pw"]', pw);
        await this.loginPage().keyboard.press('Enter');
        await this.loginPage().waitForNavigation();
    }

    // async book(date: string, time: string): Promise<object | string | null> {
    //     await this.page.goto(
    //         this.host +
    //         '/space/view.do?searchCategory=3&searchDetailCategory=38&searchCondition=title&pageIndex=2&key=206000&use_date=&space_no=335&searchPositonDong=&searchReserve=&searchStartTime=&searchEndTime=&searchStartDate=&searchEndDate=&searchKeyword=',
    //     );

    //     await this.page.click('a.margin_t_30');

    //     await this.page.waitForSelector('#agrApp4');
    //     await this.page.click('#agrApp4');
    //     await this.page.click('input[type="submit"]');
    //     await this.page.waitForResponse((res) => res.status() === 200, { timeout: this.waitTime });

    //     await this.page.waitForSelector('#nextMonth');
    //     await this.page.click('#nextMonth');
    //     await this.page.waitForResponse((res) => res.status() === 201, { timeout: this.waitTime });
    //     await this.page.click('#nextMonth');
    //     await this.page.waitForResponse(res => res.status() === 201, { timeout: this.waitTime });

    //     await this.page.type('input#addr', '경기도 시흥시 승지로 34');
    //     await this.page.type('input#email1', 'koh2woo');
    //     await this.page.type('input#email2', 'naver.com');
    //     await this.page.$eval(
    //         'input#use_count',
    //         (input, newValue) => {
    //             input.value = newValue;
    //         },
    //         '14',
    //     );
    //     await this.page.type('input#use_purpose', '풋살');

    //     const dayTd = await this.page.$(`td#day_${date}`);
    //     const dayElem = dayTd ? await dayTd.$('a[onclick]') : null;

    //     if (dayElem) {
    //         await dayElem.click();
    //         await this.page.waitForResponse((res) => res.status() === 201, { timeout: this.waitTime });

    //         const finds = await this.page.$$(`a[onclick]`);

    //         for (const elem of finds) {
    //             const textContent = await this.page.evaluate(element => element.textContent.trim(), elem);
    //             if (textContent === time) {
    //                 await elem.click();

    //                 await this.page.waitForSelector('#sel_endTime_0');
    //                 await this.page.click('#sel_endTime_0');

    //                 await this.page.click('a.btn_style1');
    //                 return `${date} ${time}`; // 원하는 요소를 찾았으면 루프 종료
    //             }
    //         }
    //     }

    //     return null;
    // }

    // async inhanceSpeed() {
    //     // 리소스 로딩 제한 설정
    //     await this.page.setRequestInterception(true);
    //     this.page.on('request', (req) => {
    //         if (req.resourceType() === 'stylesheet' || req.resourceType() === 'font' || req.resourceType() === 'image') {
    //             req.abort();
    //         } else {
    //             req.continue();
    //         }
    //     });
    // }

    async checkIsRunnable() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        if (hours < 18) {
            const msg = `${hours}:${minutes}:${seconds}은 예약 가능한 시간이 아닙니다.`;
            console.log(msg);

            await new Promise((resolve) => setTimeout(resolve, 1000));
            throw new Error(msg);
        }
    }

    startDate() {
        const start = new Date();
        start.setMonth(start.getMonth() + this.month);
        start.setDate(1);

        return start;
    }

    endDate() {
        const end = new Date();
        end.setMonth(end.getMonth() + this.month + 1);
        end.setDate(0);

        return end;
    }

    dateToStr(date: Date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
        const day = date.getDate();

        // "yyyymmdd" 포맷으로 반환
        return (
            year +
            '' +
            (month < 10 ? '0' + month : month) +
            '' +
            (day < 10 ? '0' + day : day)
        );
    }

    isStaurday(date: Date) {
        return date.getDay() == 6;
    }
}
