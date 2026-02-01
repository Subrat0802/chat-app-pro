/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const axiosInstance = axios.create({withCredentials: true});

export const apiConnector = (
    method: string,
    url: string,
    bodyData: any = null,
    headers: Record<string, string> = {},
    params: Record<string, any> = {}
) => {
    return axiosInstance({
        method,
        url,
        data: bodyData,
        headers,
        params
    })
}