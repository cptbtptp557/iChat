<template>
  <div class="outside">
    <div class="avatar">
      <el-popover
          ref="popover"
          placement="right"
          :title="nickname"
          :width="300"
          trigger="focus"
      >
        <template #reference>
          <button>
            <img :src="'https://ichatimage.oss-cn-shenzhen.aliyuncs.com/i'+userAccount" class="avatar_image" alt="头像">
          </button>
        </template>
        <div class="personal_information_column">
          <p class="iid">iid:{{ userAccount }}</p>
          <p class="signature">个性签名:{{ signature }}</p>
          <input type="button" onclick="dialog.showModal()" class="user_lists_button" value="编辑资料">
        </div>
      </el-popover>
    </div>
    <div class="action_bar_top">
      <div class="button_background" id="selected_one">
        <el-badge :value="10" :max="99" :offset="[0,10]" :hidden="message_badge">
          <label>
            <img src="../../../public/message.png" class="message" alt="消息">
            <input type="radio" id="message" @click="toMessage">
          </label>
        </el-badge>
      </div>
      <div class="button_background" id="selected_two">
        <label>
          <img src="../../../public/friends.png" class="friends" alt="好友">
          <input type="radio" id="friends" @click="toFriends">
        </label>
      </div>
    </div>
    <div class="action_bar_bottom">
      <div class="button_background">
        <el-popover
            ref="popover"
            placement="right"
            :width="200"
        >
          <template #reference>
            <button>
              <img src="../../../public/setup.png" class="setup" alt="设置">
            </button>
          </template>
          <div class="setup_bottom">
            <div class="sign_out" @click="signOutAccount">
              <img src="../../../public/sign-out.png" alt="退出登录">
              <p class="sign_out_p">退出登录</p>
            </div>
          </div>
        </el-popover>
      </div>
    </div>
    <KeepAlive>
      <component :is="usersLists().current"/>
    </KeepAlive>
    <dialog id="dialog">
      <Close class="close" onclick="dialog.close()"/>
      <div>
        <label class="change_image">
          <img :src="'https://ichatimage.oss-cn-shenzhen.aliyuncs.com/i'+userAccount" alt="头像">
          <Camera class="camera"/>
          <input type="file" style="display: none" @change="replacementProfilePicture">
        </label>
        <label class="change_nickname">
          昵称
          <input type="text" class="nickname_input" placeholder="Nickname" v-model="nickname">
        </label>
        <label class="change_signature">
          签名
          <input type="text" class="signature_input" placeholder="Signature" v-model="signature">
        </label>
        <div class="other">
          <label>
            性别
            <input type="text" class="change_gender" placeholder="Gender" v-model="gender">
          </label>
          <label>
            生日
            <input type="date" class="change_birthday" placeholder="Birthday" v-model="birthday">
          </label>
        </div>
        <button @click="commit">保存</button>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import {homeActionBar} from "./homeActionBar.ts";
import {Close, Camera} from "@element-plus/icons-vue";
import {usersLists} from "../../pinia/usersLists.ts";

const {
  message_badge,
  toMessage,
  toFriends,
  userAccount,
  birthday,
  nickname,
  signature,
  gender,
  commit,
  signOutAccount,
  replacementProfilePicture,
} = homeActionBar();
</script>

<style scoped>
@import "homeActionBar.less";
</style>