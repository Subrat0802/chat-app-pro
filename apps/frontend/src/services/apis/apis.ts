const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export const endpoint = {
    SIGNUP_API: BASE_URL + "/api/v1/auth/signup",
    SIGNIN_API: BASE_URL + "/api/v1/auth/signin",
    GET_USER: BASE_URL + "api/v1/auth/getUserData"
}

export const contentEndpoint = {
    CREATE_CONTENT: BASE_URL + "/content/create",
    SAVE_CONTENT: BASE_URL + "/content/save",
}

export const collectionEndpoint = {
    CREATE_COLLECTION: BASE_URL + "/collection/create"
}