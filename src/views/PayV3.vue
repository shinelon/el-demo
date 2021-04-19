
<template>
  <el-row :gutter="20">
    <el-col :span="4"><div class="grid-content"></div></el-col>
    <el-col :span="8">
      <div class="grid-content">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="Auth">
            <el-input type="text" v-model="Authorization"></el-input>
          </el-form-item>
          <el-form-item label="支付金额">
            <el-input type="number" v-model="amount"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getPayToken"
              >获取支付token</el-button
            >
            <el-button @click="reset">重置</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getQrCode"
              >生成付款二维码</el-button
            >
            <el-button type="primary" @click="getQrCodeAndQuery"
              >生成付款二维码并轮询</el-button
            >
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryPay">查询支付结果</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="grid-content">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="payToken">
            <el-input type="text" v-model="payToken"></el-input>
          </el-form-item>
          <el-form-item label="orderNo">
            <el-input type="text" v-model="orderNo"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
    <el-col :span="4"><div class="grid-content"></div></el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="4"><div class="grid-content"></div></el-col>
    <el-col :span="8">
      <div class="grid-content">
        <div align="left">
          <json-viewer :value="jsonData" copyable boxed sort />
        </div>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="grid-content">
        <el-image
          style="width: 300px; height: 300px"
          :src="qrCodeUrl"
          fit="fill"
        ></el-image>
      </div>
    </el-col>
    <el-col :span="4"><div class="grid-content"></div></el-col>
  </el-row>
</template>

<script lang = 'ts'>
import { defineComponent, ref } from "vue";
import { responseDataType } from "../type/ComponentDataType";
import PayAPI from "../api/PayAPI";

const Pay = defineComponent({
  name: "Pay",
  setup() {
    const Authorization = ref("");
    const amount = ref("");
    const payToken = ref("");
    const qrCodeUrl = ref("");
    const orderNo = ref("");
    const jsonData = ref({});

    const loopFlag = ref(true);

    const getQrCodeAndQuery = (): boolean => {
      let result = false;
      getQrCode();
      const loopQuery = () => {
        console.log("loopQuery...");
        console.log("loopQuery..." + loopFlag.value);
        if (loopFlag.value) {
          queryPay();
          setTimeout(loopQuery, 3000);
        }
      };
      setTimeout(loopQuery, 5000);
      return result;
    };

    const queryPay = (): boolean => {
      let result = false;
      let params = {
        payChannel: "alipay",
        orderNo: orderNo.value,
      };
      PayAPI.query(Authorization.value, params).then(
        (res: responseDataType) => {
          jsonData.value = res;
          if (res.code == 0) {
            console.log(res.data);
            if (res.data.orderStatus == "pay_success") {
              result = true;
              loopFlag.value = false;
            }
          }
        }
      );
      return result;
    };

    const getPayToken = (): boolean => {
      let result = false;
      console.log(Authorization);
      PayAPI.payToken(Authorization.value).then((res: responseDataType) => {
        jsonData.value = res;
        if (res.code == 0) {
          console.log(res.data);
          payToken.value = res.data.token;
          result = true;
        }
      });
      return result;
    };

    const getQrCode = (): boolean => {
      console.log("getQrCode!");
      let params = {
        goodsName: "充值",
        payChannel: "alipay",
        totalAmount: amount.value,
        token: payToken.value,
      };
      let result = false;
      PayAPI.pay(Authorization.value, params).then((res: responseDataType) => {
        jsonData.value = res;
        if (res.code == 0) {
          console.log(res.data);
          qrCodeUrl.value = res.data.qrCodeImg;
          orderNo.value = res.data.orderNo;
          result = true;
        }
      });
      return result;
    };

    const reset = () => {
      amount.value = "";
      payToken.value = "";
      qrCodeUrl.value = "";
      orderNo.value = "";
      jsonData.value = {};
    };
    return {
      getQrCodeAndQuery,
      queryPay,
      getQrCode,
      getPayToken,
      reset,
      Authorization,
      amount,
      payToken,
      qrCodeUrl,
      orderNo,
      jsonData,
    };
  },
});

export default Pay;
</script>
<style>
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
