<template>
  <div class="main">
    <div class="container a-container" id="a-container">
      <form class="form" id="a-form" action="">
        <h2 class="form_title title">Create Account</h2>
        <div class="form__icons"></div>
        <span class="form__span">或使用电子邮件进行注册</span>
        <input class="form__input" type="text" placeholder="Nickname">
        <input class="form__input" type="text" placeholder="Email">
        <input class="form__input" type="password" placeholder="Password">
        <button class="form__button button submit">SIGN UP</button>
      </form>
    </div>
    <div class="container b-container" id="b-container">
      <form class="form" id="b-form" action="">
        <h2 class="form_title title">Sign in</h2>
        <div class="form__icons"></div>
        <span class="form__span">输入账号密码登录</span>
        <input class="form__input" type="text" placeholder="Account">
        <input class="form__input" type="password" placeholder="Password">
        <a href="/forgotPassword" class="form__link">忘记密码</a>
        <button class="form__button button submit">SIGN IN</button>
      </form>
    </div>
    <div class="switch" id="switch-cnt">
      <div class="switch__circle"></div>
      <div class="switch__circle switch__circle--t"></div>
      <div class="switch__container" id="switch-c1">
        <h2 class="switch__title title">Welcome Back !</h2>
        <p class="switch__description description">要与我们保持联系，请使用您的账号密码登录</p>
        <button class="switch__button button switch-btn">SIGN IN</button>
      </div>
      <div class="switch__container is-hidden" id="switch-c2">
        <h2 class="switch__title title">Hello Friend !</h2>
        <p class="switch__description description">输入您的个人详细信息，与我们一起开始旅程</p>
        <button class="switch__button button switch-btn">SIGN UP</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {login} from "./login.ts";

const {} = login();
</script>

<style scoped>
@import "login.less";
</style>