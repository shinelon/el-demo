import httpRequest from "@/config/axios";
import base from "@/api/base";

// 定义参数类型
type paramsType<T = any> = {
    [key: string]: T;
};

const payAPI = {
    //获取支付token
    payToken(authToken:String) {
        return httpRequest.post(`${base.devFrontUrl}/elpay/token`,null,{
            headers: {"Authorization" : authToken} 
        });
    }
}
export default payAPI;