import { Page } from "puppeteer-core";
import { SPACE_LIST } from "../constants/SpaceList";
import dayjs from "dayjs";

export class Book {
    public id: string;
    public page: Page;
    public spaceNo?: number = SPACE_LIST.JOONGANG.no;
    public date?: string = dayjs().format('YYYY-MM-DD');
    public time?: string = "08";
    public tryCnt: number = 0;
    public doRun: boolean = false;
    public msg: string = '';
}