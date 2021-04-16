
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
            <el-button type="primary" @click="onSubmit">生成付款码</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="grid-content bg-purple"></div>
    </el-col>
    <el-col :span="4"><div class="grid-content"></div></el-col>
  </el-row>
</template>

<script>


export default {
  data: function () {
    return {
      Authorization: "",
      amount: "",
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
      console.log(this.$data.Authorization);
    },
  },
};
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
