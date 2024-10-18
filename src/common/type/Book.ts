import { Page } from "puppeteer";
import dayjs from "dayjs";
import BookStatus from "../constants/BookStatus";

export class Book {
    public id: string;
    public page: Page;
    public spaceNo?: number;
    public date?: string = dayjs().format('YYYY-MM-DD');
    public time?: string = "08";
    public status: BookStatus = BookStatus.stop;
    public msg: string = '';
}