import axios from "axios";
import type { AxiosRequestConfig } from "axios";

/**
 * Base URL
 */
const BASE_URL = "http://localhost:5088/api"; // Bạn nhớ check lại port xem khớp với backend chưa nhé

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
        // Lấy token mới nhất từ localStorage mỗi lần gọi
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

    // ==========================================
    // ĐOẠN XỬ LÝ TOKEN HẾT HẠN HOẶC BỊ LỖI (401)
    // ==========================================
    if (err.response && err.response.status === 401) {
      // 1. Xóa sạch token và thông tin user cũ
      localStorage.removeItem("token");
      localStorage.removeItem("user"); 
      
      // 2. Đá văng về trang login
      // Lưu ý: Nếu bạn đang ở trang login rồi thì không cần redirect để tránh lặp vô tận
      if (window.location.pathname !== '/login') {
         window.location.href = '/login';
      }
    }
    // ==========================================

    throw {
      status_code: err.response?.status || 500,
      message: err.response?.data?.message || "Something went wrong",
      data: err.response?.data || null,
    };
  }
}