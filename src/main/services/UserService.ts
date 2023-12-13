import { UserInfo } from './../../common/dto/UserInfo';
import { UserStorage } from './../../common/dto/UserStorage';
import sisoService from "./SisoService";
import StorageService from "./StorageService";

class UserService {
    public storage: StorageService<UserStorage>;

    constructor() {
        this.storage = new StorageService('user');
    }

    async login(args) {
        const result = { status: false };
        const isLogin = await sisoService.login(args.id, args.pw);

        if (isLogin) {
            result.status = true;
            await this.storage.set(args as UserInfo);
        }

        return result;
    }

    async logout() {
        const result = { status: false };
        const isLogin = await sisoService.logout();

        if (isLogin) {
            result.status = true;
        }

        return result;
    }
}

const userService = new UserService();
export default userService;