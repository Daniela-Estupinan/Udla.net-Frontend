import {postConexion, postLogin} from "./Connection";

//AUTH
export const handleLogin = async (data: any) => {
    const respData = await postLogin('user/login', data);
    return respData;
}

export const handleSignUp = async (data : any) => {
    const respDat = await postConexion('user/signup', data);
    return respDat;
}
