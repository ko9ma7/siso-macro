import { SisoStorage } from '../../common/dto/SisoStorage';
import puppeteer, { Browser, ElementHandle, Page } from "puppeteer-core";
import StorageService from "./StorageService";
import { Reservation } from "../../common/dto/Reservation";
import { Book } from "../../common/dto/Book";
import windowService from './WindowService';
import userService from './UserService';
import log from "electron-log";

class SisoService {
    private host = 'https://share.siheung.go.kr';
    private readonly paths = {
        login: '/login.do',
        list: '/mypage/receipt_list.do',
        book: '/space/receipt_agree.do',
    };
    private browser: Browser;
    private loginPage: Page;
    private listPage: Page;
    private pages: Page[] = [];
    private books: Book[] = [];

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
        setInterval(() => {
            this.loginPage.reload();
        }, 300 * 1000);
        this.listPage = await this.browser.newPage();
    }

    getPages = (): Page[] => this.pages;

    // 예약 목록
    async getBooks(): Promise<Book[]> {
        return this.books;
    }

    sendUpdateBooks = (): void => windowService.getWindow().webContents.send('update-books', this.books);
    getBook = (book: Book): Book | undefined => this.books.find((i) => i.id == book.id);

    // 로그인
    async login(id: string, pw: string): Promise<boolean> {
        let isLogin: boolean = false;

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const params = new URLSearchParams({ key: '701000' });
            await this.loginPage.goto(this.host + this.paths.login + '?' + params.toString());

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
        } catch (e) {
            log.error(e);
        }

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
            const userStorage = await userService.storage.get();
            let storage = await this.storage.get();


            if (!(storage[userStorage.id]?.list)) {
                await this.refreshList();
            }

            storage = await this.storage.get();

            result = storage[userStorage.id].list;
        } catch (e) {
            log.error(e);
        }

        return result;
    }

    // 예약 새로고침
    async refreshList(): Promise<void> {
        const result: Reservation[] = [];
        try {
            const userStorage = await userService.storage.get();
            const storage = await this.storage.get();

            try {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                const params = new URLSearchParams({ key: '802000' });
                await this.listPage.goto(this.host + this.paths.list + '?' + params.toString());
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

            storage[userStorage.id] = { list: result };
            await this.storage.set(storage);
        } catch (e) {
            log.error(e);
        }
    }

    // 예약 생성
    async createBook(args): Promise<Book> {
        const page = await this.browser.newPage();
        this.pages.push(page);

        args.book.page = page;
        this.books.push(args.book as Book);

        return args.book as Book;
    }

    // 예약 중단
    stopBook(event, args): void {
        const book: Book | undefined = this.getBook(args.book);
        if (book) {
            book.doRun = false;
        }
    }

    // 예약 실행
    async runBook(event, args): Promise<void> {
        const book: Book | undefined = this.getBook(args.book);

        if (book) {
            book.date = args.book.date;
            book.time = args.book.time;
            book.doRun = true;
            await this.inhanceSpeed(book.page);

            book.page.on('dialog', async (dialog) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                await dialog.accept();
            });

            let tryCnt = 0;
            while (tryCnt < this.maxCnt) {
                try {
                    if (!book.doRun) break;

                    if (!this.checkIsRunnable(book)) {
                        await new Promise((resolve) => setTimeout((resolve), 1000));
                        continue;
                    }

                    book.tryCnt = ++tryCnt;
                    this.sendUpdateBooks();
                    const res = await this.book(book);

                    if (res) break;

                    await new Promise((resolve) => setTimeout(resolve, 3000));
                } catch (error) {
                    log.error(error);
                }
            }

            book.doRun = false;
            this.sendUpdateBooks();
            await new Promise((resolve) => setTimeout(resolve, 3000));
        }
    }

    // 예약 프로세스
    async book(book: Book): Promise<object | string | null> {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const params = new URLSearchParams({
            searchCategory: '3',
            searchDetailCategory: '38',
            searchCondition: 'title',
            pageIndex: '2',
            key: '206000',
            use_date: book.date,
            space_no: book.space!.no.toString(), // 공간 번호,
            searchPositonDong: '',
            searchReserve: '',
        });
        const url = this.host + this.paths.book + '?' + params.toString();
        await book.page.goto(url);

        await book.page.waitForSelector('#agrApp4');
        await book.page.click('#agrApp4');
        await book.page.click('input[type="submit"]');
        await book.page.waitForResponse((res) => res.status() === 200, { timeout: this.waitTime });

        await book.page.type('input#addr', '경기도 시흥시 승지로 34');
        await book.page.type('input#email1', 'koh2woo');
        await book.page.type('input#email2', 'naver.com');
        await book.page.$eval(
            'input#use_count',
            (input, newValue) => {
                input.value = newValue;
            },
            '14',
        );
        await book.page.type('input#use_purpose', '풋살 경기');

        const finds = await book.page.$$(`a[onclick]`);
        for (const elem of finds) {
            const textContent = await book.page.evaluate(element => element.textContent?.trim(), elem);
            if (textContent?.trim() === book.time.trim()) {
                await elem.click();

                await book.page.waitForSelector('#sel_endTime_0', { timeout: this.waitTime });
                await book.page.click('#sel_endTime_0');

                await book.page.click('a.btn_style1');
                await book.page.waitForFunction(() => !!window.alert, { timeout: this.waitTime });

                return `${book.date} ${book.time}`; // 원하는 요소를 찾았으면 루프 종료
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

    checkIsRunnable(book: Book): boolean | string {
        const now = new Date();
        const hours = now.getHours();

        if (hours < 18) {
            book.msg = `${this.timeToStr(now)}은 예약 가능한 시간이 아닙니다.`;
        } else {
            book.msg = ``;
        }

        this.sendUpdateBooks();
        return hours >= 18;
    }

    startDate(date: string): Date {
        const start = new Date(date);
        start.setDate(1);

        return start;
    }

    endDate(date: string): Date {
        const end = new Date(date);
        end.setMonth(end.getMonth() + 1);
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
            '-' +
            (month < 10 ? '0' + month : month) +
            '-' +
            (day < 10 ? '0' + day : day)
        );
    }

    timeToStr(date: Date) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        // "hhmmss" 포맷으로 반환
        return (
            hours +
            ':' +
            (minutes < 10 ? '0' + minutes : minutes) +
            ':' +
            (seconds < 10 ? '0' + seconds : seconds)
        );
    }

    isStaurday(date: Date) {
        return date.getDay() == 6;
    }
}

const sisoService = new SisoService();
export default sisoService;