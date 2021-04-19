
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
            <el-button type="primary" @click="getQrCode"
              >生成付款二维码</el-button
            >
            <el-button type="primary" @click="queryPay">查询支付结果</el-button>
            <el-button @click="reset">重置</el-button>
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
import { defineComponent } from "vue";
import { responseDataType } from "../type/ComponentDataType";
import PayAPI from "../api/PayAPI";

const Pay = defineComponent({
  name: "Pay",
  data() {
    return {
      Authorization: "",
      amount: "",
      payToken: "",
      qrCodeUrl: "",
      orderNo: "",
      jsonData: {},
    };
  },
  methods: {
    reset: function () {
      this.$data.qrCodeUrl = "";
      this.$data.amount = "";
      this.$data.payToken = "";
      this.$data.jsonData = {};
    },
    queryPay: function () {
      console.log("queryPay");
      console.log(this.$data.orderNo);
      let params = {
        payChannel: "alipay",
        orderNo: this.$data.orderNo,
      };
      PayAPI.query(this.$data.Authorization, params).then(
        (res: responseDataType) => {
          this.$data.jsonData = res;
          if (res.code == 0) {
            console.log(res.data);
          }
        }
      );
    },
    getPayToken: function () {
      console.log("getPayToken");
      console.log(this.$data.Authorization);
      PayAPI.payToken(this.$data.Authorization).then(
        (res: responseDataType) => {
          this.$data.jsonData = res;
          if (res.code == 0) {
            console.log(res.data);
            this.$data.payToken = res.data.token;
          }
        }
      );
    },
    getQrCode: function () {
      console.log("getQrCode!");
      let params = {
        goodsName: "充值",
        payChannel: "alipay",
        totalAmount: this.$data.amount,
        token: this.$data.payToken,
      };
      PayAPI.pay(this.$data.Authorization, params).then(
        (res: responseDataType) => {
          this.$data.jsonData = res;
          if (res.code == 0) {
            console.log(res.data);
            this.$data.qrCodeUrl = res.data.qrCodeImg;
            this.$data.orderNo = res.data.orderNo;
          }
        }
      );
    },
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
