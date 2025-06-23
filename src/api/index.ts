import axios, { AxiosError } from "axios";
import { toast } from "sonner";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "",
  withCredentials: true,
});

interface ResErr {
  message: string;
  statusCode: number;
}

interface ResSuccess<T> {
  data: T;
  pagination?: {
    total: number;
    page: number;
  };
}

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<ResErr>) => {
    console.log("error", error.status);

    if (error.status === 401) {
      // window.location.href = "/sign-in";
      return;
    }
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message || "Có lỗi xảy ra");
    } else {
      toast.error("Lỗi không xác định");
    }
    // return Promise.reject(error);
  }
);
export type ExtractResult<T> = T extends { data: infer D } ? D : T;

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
}): Promise<ResSuccess<T>> => {
  const response = await axiosInstance.request<T>({
    url,
    method,
    params,
    data,
    headers,
    signal,
  });

  return response.data as ResSuccess<T>;
};

// Override lỗi nếu cần
export type ErrorType<Error> = AxiosError<Error>;

// (nếu bạn xử lý body trước khi gửi)
export type BodyType<BodyData> = BodyData;
