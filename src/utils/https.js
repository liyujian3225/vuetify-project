import axios from 'axios';
import { ElMessage } from 'element-plus';
import { getItem, removeItem } from "@/utils/storage";
import { useUserStore } from "../stores/user"

const userStore = useUserStore();

let service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 1000 * 60 * 40,
});
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// 数据请求拦截
service.interceptors.request.use((config) => {
  const { url, method } = config;
  //避免接口走缓冲数据
  if(method === "get") {
    url.indexOf('?') === -1 ? config.url = url+'?t='+(new Date().getTime()) : config.url = url+'&t='+(new Date().getTime())
  }
  config.headers.Authorization = getItem("authorization") || "";
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 返回响应数据拦截
service.interceptors.response.use((res) => {
  console.log("res", res);
  const { status, data } = res;
  if (status === 200) {
    return Promise.resolve(data);
  }
}, (error) => {
  console.log("error", error);
  if (error.response?.status) {
    // 状态码超过 2xx 范围时都会调用该函数，处理错误响应
    switch (error.response.status) {
      case 401:
        ElMessage({
          type: 'error',
          message: '登陆失效！',
          showClose: true
        });
        userStore.logout();
        break;
      case 404:
        ElMessage({
          type: 'error',
          message: '请求路径找不到！',
          showClose: true
        });
        break;
      case 502:
        ElMessage({
          type: 'error',
          message: '服务器内部报错！',
          showClose: true
        });
        break;
      default:
        break;
    }
  }
  return Promise.reject(error);
});

export default service;
