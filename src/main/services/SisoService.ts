import { SisoStorage } from '../../common/dto/SisoStorage';
import puppeteer, { Browser, ElementHandle, Page } from "puppeteer-core";
import StorageService from "./StorageService";
import { Reservation } from "../../common/dto/Reservation";
import { Book } from "../../common/dto/Book";

class SisoService {
    private host = 'https://share.siheung.go.kr';
    private readonly paths = {
        login: '/login.do?key=701000',
        list: '/mypage/receipt_list.do?key=802000',
    };
    private browser: Browser;
    private loginPage: Page;
    private listPage: Page;
    private pages: Page[] = [];
    private books: Book[] = [];

    private month: number = 1;
    private timeList = ['10:00', '12:00'];
    private maxCnt = 1000;
    private waitTime = 600 * 1000;
    public storage: StorageService<SisoStorage>;

    constructor() {
        this.storage = new StorageService('siso');
    }

    async setBrowser() {
        this.browser = await puppeteer.launch({
            executablePath:
                'C:/Program Files/Google/Chrome/Application/chrome.exe',
            headless: !global.isDev,
            defaultViewport: { width: 1920, height: 1080 }, // 브라우저 창 크기 설정 (기본값: 800x600)
            args: ['--start-maximized'], // 최대화된 창으로 시작
        });
        this.loginPage = (await this.browser.pages())[0];
        this.listPage = await this.browser.newPage();
    }

    getPages = (): Page[] => this.pages;

    // 예약 목록
    async getBooks(): Promise<Book[]> {
        return this.books;
    }

    // 예약 생성
    async createBook(args): Promise<Book> {
        const page = await this.browser.newPage();
        this.pages.push(page);

        args.page = page;
        this.books.push(args as Book);

        return args as Book;
    }

    // 예약 실행
    async runBook(args): Promise<void> {
        const page = args.page;
        const result = [];

        await this.inhanceSpeed(page);

        page.on('dialog', async (dialog) => {
            await new Promise((resolve) => setTimeout(resolve, 5000));
            await dialog.accept();
        });

        let tryCnt = 1;
        while (tryCnt < this.maxCnt) {
            try {
                console.log(`시도횟수: ${tryCnt}`);
                tryCnt++;

                const start = this.startDate();
                const end = this.endDate();

                const timeDiff = Math.abs(end.getTime() - start.getTime());
                const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

                for (let i = 0; i <= dayDiff; i++) {

                    const current = new Date(start);
                    current.setDate(start.getDate() + i);
                    const date = this.dateToStr(current);

                    for (const time of this.timeList) {
                        console.log(date + ' ' + time);
                        if (this.isStaurday(current)) {
                            const res = await this.book(page, date, time);
                            if (res) result.push(res);
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }

        await new Promise((resolve) => setTimeout(resolve, 5000));
        await this.browser.close();
    }

    // 로그인
    async login(id: string, pw: string): Promise<boolean> {
        let isLogin: boolean = false;

        await this.loginPage.goto(this.host + this.paths.login);

        this.loginPage.on('dialog', async (dialog) => {
            if (dialog.message() == '일치하는 로그인 정보(아이디/암호)가 없습니다') {
                await dialog.accept();
            }
        });

        await this.loginPage.click('a#tab2');

        await this.loginPage.type('input[name="user_id"]', id);
        await this.loginPage.type('input[name="user_pw"]', pw);
        await this.loginPage.keyboard.press('Enter');
        await this.loginPage.waitForNavigation({ waitUntil: 'domcontentloaded' });

        isLogin = await this.checkLogin();

        return isLogin;
    }

    // 로그인 체크
    async checkLogin(): Promise<boolean> {
        const elems = await this.loginPage.$x("//ul[@class='utility']/li/a[contains(text(), '로그아웃')]");

        return elems && elems.length > 0;
    }

    // 로그아웃
    async logout(): Promise<boolean> {
        try {
            const elem = await this.loginPage.waitForXPath("//ul[@class='utility']/li/a[contains(text(), '로그아웃')]", { timeout: this.waitTime });

            await (elem as ElementHandle<Element>).click();
        } catch (e) {
            console.log(e);
        }

        return true;
    }

    // 예약목록
    async list(): Promise<Reservation[]> {
        let result: Reservation[] = [];

        try {
            let storage = await this.storage.get();
            if (!(storage?.list)) {
                await this.refreshList();
            }
            storage = await this.storage.get();

            result = storage.list;
        } catch (e) {
            console.log(e);
        }

        return result;
    }

    // 예약 새로고침
    async refreshList(): Promise<void> {
        const result: Reservation[] = [];
        try {
            const storage = await this.storage.get();

            try {
                await this.listPage.goto(this.host + this.paths.list);
            } catch (e) {
                console.log(e);
            }

            const rows = await this.listPage.$$eval('table.myreservation tbody tr', rows => {
                return rows.map((row) => {
                    const columns = row.querySelectorAll('td');
                    const arr = Array.from(columns).map(column => column.textContent);
                    return arr;
                });
            });

            for (const arr of rows) {
                result.push(new Reservation(arr));
            }

            storage.list = result;
            await this.storage.set(storage);
        } catch (e) {
            console.log(e);
        }
    }

    async book(page: Page, date: string, time: string): Promise<object | string | null> {
        await page.goto(
            this.host +
            '/space/view.do?searchCategory=3&searchDetailCategory=38&searchCondition=title&pageIndex=2&key=206000&use_date=&space_no=335&searchPositonDong=&searchReserve=&searchStartTime=&searchEndTime=&searchStartDate=&searchEndDate=&searchKeyword=',
        );

        await page.click('a.margin_t_30');

        await page.waitForSelector('#agrApp4');
        await page.click('#agrApp4');
        await page.click('input[type="submit"]');
        await page.waitForResponse((res) => res.status() === 200, { timeout: this.waitTime });

        await page.waitForSelector('#nextMonth');
        await page.click('#nextMonth');
        await page.waitForResponse((res) => res.status() === 201, { timeout: this.waitTime });
        await page.click('#nextMonth');
        await page.waitForResponse(res => res.status() === 201, { timeout: this.waitTime });

        await page.type('input#addr', '경기도 시흥시 승지로 34');
        await page.type('input#email1', 'koh2woo');
        await page.type('input#email2', 'naver.com');
        await page.$eval(
            'input#use_count',
            (input, newValue) => {
                input.value = newValue;
            },
            '14',
        );
        await page.type('input#use_purpose', '풋살');

        const dayTd = await page.$(`td#day_${date}`);
        const dayElem = dayTd ? await dayTd.$('a[onclick]') : null;

        if (dayElem) {
            await dayElem.click();
            await page.waitForResponse((res) => res.status() === 201, { timeout: this.waitTime });

            const finds = await page.$$(`a[onclick]`);

            for (const elem of finds) {
                const textContent = await page.evaluate(element => element.textContent.trim(), elem);
                if (textContent === time) {
                    await elem.click();

                    await page.waitForSelector('#sel_endTime_0');
                    await page.click('#sel_endTime_0');

                    await page.click('a.btn_style1');
                    return `${date} ${time}`; // 원하는 요소를 찾았으면 루프 종료
                }
            }
        }

        return null;
    }

    async inhanceSpeed(page: Page) {
        // 리소스 로딩 제한 설정
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            if (req.resourceType() === 'stylesheet' || req.resourceType() === 'font' || req.resourceType() === 'image') {
                req.abort();
            } else {
                req.continue();
            }
        });
    }

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

const sisoService = new SisoService();
export default sisoService;