import axios from "axios";

const initData = {
    api: "http://localhost:8080/api/",
};

export const postLogin = async (urlApi: string, params: { email: any; password: any; }) => {
    try {
        let url = initData.api + urlApi;
        const email = params.email;
        const password = params.password;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        const data = await response.json();
        if (data) {
            console.log("loggedIn");
            return data;
        } else {
            console.log("not logged");
            return null;
        }
    } catch (error) {
        console.error(error);
    }
};

export const getConexion = async (urlApi: string, headers = "") => {
    try {
        let url = initData.api + urlApi;
        const response = await axios.get(url).catch((err) => {
            if (err.response) {
                switch (err.response.status) {
                    case 401:
                        const originalRequest = err.config;
                        let refreshToken = localStorage.getItem("refreshToken");
                        if (refreshToken)
                            return axios
                                .post(initData.api + "users/token/refresh", {
                                    refreshToken: refreshToken,
                                })
                                .then((res) => {
                                    if (res.status === 200) {
                                        localStorage.setItem("accessToken", res.data.accessToken);
                                        return axios(originalRequest);
                                    }
                                });
                        break;
                    case 403:
                        // @ts-ignore
                        localStorage.setItem("accessToken", null);
                        throw new Error(`La autorización ha caducado, intenta de nuevo`);
                    case 404:
                        throw new Error(`Servicio no encontrado`);
                    case 409:
                        throw new Error(`El usuario ya poseé una cuenta`);
                    case 500:
                        if (
                            err.response.data.message ===
                            "Probably the document was disbled by admin."
                        )
                            throw new Error(`El documento se encuentra desactivado.`);
                        else throw new Error(`Por favor intente de nuevo, más tarde`);
                    default:
                        // @ts-ignore
                        localStorage.setItem("accessToken", null);
                        throw new Error(
                            `La api responde pero con error ${err.response.status}`
                        );
                }
            } else if (err.request) {
                throw new Error(`No existe conexión`);
            } else {
                throw err;
            }
        });
        // @ts-ignore
        const resp = response.data;
        return resp;
    } catch (err) {
        if (
            // @ts-ignore
            err.message === "Tu autorización ha caducado inicia de nuevo tu pedido" ||
            // @ts-ignore
            err.message === "La autorización ha caducado, intenta de nuevo"
        )
            window.location.reload();
        // @ts-ignore
        return Promise.reject((err.message && err) || "Something went wrong");
    }
}

export const postConexion = async (urlApi: string, objeto: any) => {
    try {
        let url = initData.api + urlApi;
        const response = await axios.post(url, objeto).catch((err) => {
            if (err.response) {
                switch (err.response.status) {
                    case 400:
                        if (err.response.data.message === "Token does not exists.")
                            throw new Error(`No hay permiso para actualizar tu contraseña`);
                        else
                            throw new Error(
                                `El correo o contraseña ingresados son incorrectos`
                            );
                    case 403:
                        if (
                            err.response.data.message ===
                            "This code is already expired by Admin!"
                        )
                            throw new Error(`Tu código no es valido`);
                        else {
                            // @ts-ignore
                            localStorage.setItem("accessToken", null);
                            throw new Error(`La autorización ha caducado, intenta de nuevo`);
                        }
                    case 401:
                        const originalRequest = err.config;
                        let refreshToken = localStorage.getItem("refreshToken");
                        if (refreshToken)
                            return axios
                                .post(initData.api + "users/token/refresh", {
                                    refreshToken: refreshToken,
                                })
                                .then((res) => {
                                    if (res.status === 200) {
                                        localStorage.setItem("accessToken", res.data.accessToken);
                                        return axios(originalRequest);
                                    }
                                });
                        break;
                    case 404:
                        throw new Error(
                            `El correo o contraseña ingresados son incorrectos`
                        );
                    case 409:
                        if (err.response.data.message === "Email address not valid")
                            throw new Error(`Correo electrónico no válido`);
                        else throw new Error(`El usuario ya poseé una cuenta`);
                    case 430:
                        throw new Error(
                            `Su último pago no es válido o no tienes datos de pago registrados. `
                        );
                    case 500:
                        console.error(err);
                    default:
                        throw new Error(
                            `La api responde pero con error ${err.response.status}`
                        );
                }
            } else if (err.request) {
                throw new Error(`No existe conexión`);
            } else {
                throw err;
            }
        });
        const resp = response?.data;
        return resp;
    } catch (err) {
        /* if (err.message === "Tu autorización ha caducado inicia de nuevo tu pedido" ||
          err.message === "La autorización ha caducado, intenta de nuevo")
          window.location.reload(); */
        // @ts-ignore
        return Promise.reject((err.message && err) || "Something went wrong");
    }
};
