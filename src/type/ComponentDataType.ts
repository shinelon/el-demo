// 接口返回值类型


export type responseDataType<T = any> = {
    msg?: string;
    code?: number;
    data: T;
    fileName?: string;
    count?: number; // 数据总条数
};
