import { Reservation } from "../common/dto/Reservation";
import { UserInfo } from "../common/dto/UserInfo";

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
                info: () => Promise<UserInfo>,
                login: (args) => Promise<boolean>,
                logout: () => Promise<boolean>,
            },
            siso: {
                list: () => Promise<Reservation[]>,
                refreshList: () => Promise<void>,
                createBook: (args) => Promise<Book>,
                runBook: (args) => Promise<void>,
                stopBook: (args) => Promise<void>,
                getBooks: () => Promise<Book[]>,
                onUpdateBook: (callback: (books: Book[]) => void) => void,
            }
        }
    }
}
