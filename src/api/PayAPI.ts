import httpRequest from "@/config/axios";

// 定义参数类型
type paramsType<T = any> = {
    [key: string]: T;
};

const payAPI = {
    //获取支付token
    payToken(authToken: String) {
        return httpRequest.post('/elpay/token', null, {
            headers: { "Authorization": authToken }
        });
    }
}
export default payAPI;