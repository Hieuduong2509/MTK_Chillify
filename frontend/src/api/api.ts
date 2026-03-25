import axios from "axios";
import type { AxiosRequestConfig } from "axios";

/**
 * Base URL
 */
const BASE_URL = "http://localhost:5088/api";

/**
 * Services mapping theo Controller backend
 */
type ServiceName = "auth" | "song" | "playlist" | "user" | "player";

const SERVICES: Record<ServiceName, string> = {
  auth: `${BASE_URL}/Auth`,
  song: `${BASE_URL}/Song`,
  playlist: `${BASE_URL}/Playlist`,
  user: `${BASE_URL}/User`,
  player: `${BASE_URL}/Player`,
};

/**
 * Options cho API request
 */
interface ApiOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
}

/**
 * Hàm gọi API chung
 */
export async function apiRequest<T = any>(
  service: ServiceName,
  endpoint: string,
  options: ApiOptions = {},
): Promise<T> {
  const url = `${SERVICES[service]}${endpoint}`;

  try {
    const config: AxiosRequestConfig = {
      url,
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        ...(options.headers || {}),
      },
      data: options.body,
      params: options.params,
    };

    const response = await axios(config);
    return response.data;
  } catch (err: any) {
    console.error("API Error:", err.response || err.message);

    throw {
      status_code: err.response?.status || 500,
      message: err.response?.data?.message || "Something went wrong",
      data: err.response?.data || null,
    };
  }
}
