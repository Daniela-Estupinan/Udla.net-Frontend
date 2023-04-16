import { postLogin } from "./Connection";

//AUTH
export const handleLogin = async (data: any) => {
    const respData = await postLogin('user/login', data);
    return respData;
}
