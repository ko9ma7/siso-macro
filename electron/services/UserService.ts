import sisoService from "./SisoService";

class UserService {
    async login(event, args) {
        const result = { status: false };
        const isLogin = await sisoService.login(args.id, args.pw);

        if (isLogin) {
            result.status = true;
        }

        return result;
    }

    async logout(event) {
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