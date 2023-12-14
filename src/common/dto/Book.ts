import { Page } from "puppeteer-core";
import { Space } from "./Space";

export class Book {
    public id: string;
    public page: Page;
    public space?: Space;
    public dateTime: string = '';
    public tryCnt: number = 0;
    public doRun: boolean = false;
}