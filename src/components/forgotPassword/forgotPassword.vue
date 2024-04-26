<template>
  <div class="main">
    <div class="background_round"></div>
    <div class="background_round_bottom"></div>
    <div class="form">
      <h2>重置密码</h2>
      <input type="text" class="email" v-model="to_email" placeholder="Email">
      <input type="text" class="email" v-model="new_password" placeholder="New Password">
      <div class="captcha_column">
        <input type="text" class="captcha" v-model="input_captcha" placeholder="Captcha">
        <el-button type="primary" id="get_captcha" class="get_captcha" @click="toEmail" :disabled="captcha_button_status" round>
          {{ captcha_button_value }}
        </el-button>
      </div>
      <el-button type="primary" class="submit" @click="judgmentCaptcha" :disabled="submit_status" round>SUBMIT</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {forgotPassword} from "./forgotPassword.ts";

const {
  to_email,
  toEmail,
  new_password,
  judgmentCaptcha,
  input_captcha,
  captcha_button_status,
  submit_status,
  captcha_button_value,
} = forgotPassword();
</script>

<style scoped>
@import "./forgotPassword.less";
</style>