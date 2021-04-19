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
    },
    pay(authToken: String, params: paramsType) {
        return httpRequest.post('/elpay/pay', params, {
            headers: { "Authorization": authToken }
        });
    },
    query(authToken: String, params: paramsType) {
        return httpRequest.post('/elpay/query', params, {
            headers: { "Authorization": authToken }
        });
    }
}
export default payAPI;