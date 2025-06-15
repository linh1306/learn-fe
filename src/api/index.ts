import axios, { AxiosError } from "axios";
import { toast } from "sonner";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    console.log("error", error.status);

    if (error.status === 401) {
      window.location.href = "/sign-in";
      return;
    }
    toast.error(error.response.data.message);
    // return Promise.reject(error);
  }
);

type Res<T> = {
  data: T;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
};

export const customMutator = async <T>({
  url,
  method,
  params,
  data,
  headers,
  signal,
}: {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  params?: any;
  data?: any;
  headers?: Record<string, string>;
  responseType?: string;
  signal?: AbortSignal;
}): Promise<Res<T>> => {
  const response = await axiosInstance.request<T>({
    url,
    method,
    params,
    data,
    headers,
    signal,
  });

  return response.data as Res<T>;
};

// Override lỗi nếu cần
export type ErrorType<Error> = AxiosError<Error>;

// (nếu bạn xử lý body trước khi gửi)
export type BodyType<BodyData> = BodyData;
