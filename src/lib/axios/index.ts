import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { baseUrl } from "./constant";

// Axios 설정
const config: AxiosRequestConfig = {
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
};

const axiosInstance = axios.create(config);

const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  if (!config.headers) return config;

  // 로컬 스토리지에서 액세스 토큰 가져오기
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    config.headers["Authorization"] = "Bearer " + accessToken;
  }
  return config;
};

const responseInterceptor = (response: AxiosResponse) => {
  return response;
};

const responseErrorInterceptor = (error: any) => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      localStorage.removeItem("accessToken");

      if (window && window.flutter_inappwebview) {
        window.flutter_inappwebview.callHandler("tokenExpired", { status });
      }
    } else if (status && ~~(status / 100) === 5) {
      const conf = error.config as { retryCount?: number; retryDelay?: number };
      conf.retryCount = conf.retryCount || 0;
      if (conf.retryCount < 3) {
        conf.retryCount++;
        return new Promise((resolve) => {
          setTimeout(
            () => resolve(axiosInstance(conf as AxiosRequestConfig)),
            conf.retryDelay || 1000
          );
        });
      }
    }
  }
  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(requestInterceptor);
axiosInstance.interceptors.response.use(
  responseInterceptor,
  responseErrorInterceptor
);

export { axiosInstance };
