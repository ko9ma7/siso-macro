import { Page } from "puppeteer-core";
import { Space } from "./Space";
import dayjs from "dayjs";

export class Book {
    public id: string;
    public page: Page;
    public space?: Space;
    public date: string = dayjs().format('YYYY-MM-DD');
    public time: string = dayjs().format('hh');
    public tryCnt: number = 0;
    public doRun: boolean = false;
    public msg: string = '';
}