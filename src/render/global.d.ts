import { Page } from "puppeteer-core";
import { Reservation } from "../common/dto/Reservation";

declare global {
    interface Window {
        electron: {
            window: {
                minimize: () => void,
                close: () => void,
                size: (args) => void,
                dialog: (args) => void,
            },
            user: {
                info: () => Promise<void>,
                login: (args) => Promise<boolean>,
                logout: (args) => Promise<boolean>,
            },
            siso: {
                list: () => Promise<Reservation[]>,
                refreshList: () => Promise<void>,
                createBook: (args) => Promise<Book>,
                runBook: (args) => Promise<void>,
                getBooks: () => Promise<Book[]>,
            }
        }
    }
}
