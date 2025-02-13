import { BookStatus } from "./BookStatus";
import { Page } from "puppeteer";

export interface Book {
    id: string;
    page: Page;
    spaceNo?: number;
    date?: string;
    time?: string;
    status: BookStatus;
    msg: string;
}