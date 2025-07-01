import axios, {AxiosRequestHeaders} from 'axios';
import {cookies} from "next/headers";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface ServerApiRequestOptions {
  method: HttpMethod;
  url: string;
  data?: any;
  params?: any;
  headers?: AxiosRequestHeaders;
}

export async function serverApiRequest<T = any>({
                                                  method,
                                                  url,
                                                  data,
                                                  params,
                                                  headers
                                                }: ServerApiRequestOptions): Promise<T> {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  const res = await api.request<T>({
    method,
    url,
    data,
    params,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      ...headers,
    },
  });

  return res.data;
}

