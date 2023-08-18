import axios from "axios";
// 创建请求实例
const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
});

// 请求拦截器
request.interceptors.request.use((config) => {
  // config为回调注入对象，通常需要配置请求头信息
  return config;
});

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 响应数据简化
    return response.data;
  },
  (error) => {
    // 处理http网络错误
    return Promise.reject(new Error(error));
  }
);

// 暴露request
export default request;
