import { dialog } from "electron";
import sisoService from "./SisoService";

class UserService {
    async login(event, args) {
        const result = { status: false };
        const isLogin = await sisoService.login(args.id, args.pw);

        if (isLogin) {
            result.status = true;
        } else {
            dialog.showErrorBox('로그인 실패', '아이디 또는 패스워드를 확인해주세요');
        }

        event.sender.send('login-reply', result);
    }
}

const userService = new UserService();
export default userService;