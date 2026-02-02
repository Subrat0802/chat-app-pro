const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export const endpoint = {
    SIGNUP_API: BASE_URL + "/api/v1/auth/signup",
    SIGNIN_API: BASE_URL + "/api/v1/auth/signin",
    ME: BASE_URL + "/api/v1/auth/me"
}

