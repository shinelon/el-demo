import axiosObj, { AxiosRequestConfig, AxiosResponse } from "axios";
import store from "../store";
const defaultConfig = {
    // baseURL在此处省略配置,考虑到项目可能由多人协作完成开发，域名也各不相同，此处通过对api的抽离，域名单独配置在base.js中
  
    // 请求超时时间
    timeout: 60 * 1000,
    // 跨域请求时是否需要凭证
    // withCredentials: true, // Check cross-site Access-Control
    headers: {
      get: {
        // 设置默认请求头，当需要特殊请求头时，将其作为参数传入，即可覆盖此处的默认参数
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      post: {
        // 设置默认请求头，当需要特殊请求头时，将其作为参数传入，即可覆盖此处的默认参数(第三个参数即config)
        // 例如：
        //     services.post(`${base.url}/uploads/singleFileUpload`, file, {
        //       headers: { "Content-Type": "multipart/form-data" }
        //     });
        "Content-Type": "application/json;charset=utf-8"
      }
    }
    // 在向服务器发送请求前，对数据进行处理，axios默认会序列化数据
    // transformRequest:[function(data){
    //
    // }],
    // 在传递给 then/catch 前，修改响应数据
    // transformResponse:[function(data){
    //
    // }]
  };


// 创建实例
const _axios = axiosObj.create(defaultConfig);
// 请求拦截器
_axios.interceptors.request.use(
    function(config: AxiosRequestConfig) {
      // 从vuex里获取token
      const token = store.state.token;
      // 如果token存在就在请求头里添加
      token && (config.headers.token = token);
      return config;
    },
    function(error) {
      // Do something with request error
      error.data = {};
      error.data.msg = "服务器异常";
      return Promise.reject(error);
    }
  );

  // 响应拦截器
_axios.interceptors.response.use(
    function(response: AxiosResponse) {
      // token过期，续期token
      if (response.data?.code === 401) {

      }
      if (response.status === 200) {
        // 处理接口中的data
        if (response.data?.data) {
          try {
            const dataObj = JSON.parse(response.data.data);
            if (typeof dataObj == "object" && dataObj) {
              // 为json字符串将其转为json对象
              response.data.data = dataObj;
            }
          } catch (e) {
            // 不是json字符串就不处理
            return response.data;
          }
        }
        return response.data;
      }
      response.data.code = -1;
      response.data.msg = "服务器错误";
      return response;
    },
    function(error) {
      if (error) {
        // 请求已发出，但不在2xx范围内
        return Promise.reject(error);
      } else {
        // 断网
        return Promise.reject(error);
      }
    }
  );

  export default _axios;