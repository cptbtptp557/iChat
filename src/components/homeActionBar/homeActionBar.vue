<template>
  <div class="outside">
    <div class="avatar">
      <el-popover
          ref="popover"
          placement="right"
          :title="user_lists.name"
          :width="300"
          trigger="focus"
      >
        <template #reference>
          <button>
            <img src="../../../public/chat-avatar/to-user.jpg" class="avatar_image" alt="头像">
          </button>
        </template>
        <div class="personal_information_column">
          <p class="iid">iid:{{ user_lists.iid }}</p>
          <p class="signature">个性签名:{{ user_lists.signature }}</p>
          <input type="button" onclick="dialog.showModal()" class="user_lists_button" value="编辑资料">
        </div>
      </el-popover>
    </div>
    <div class="action_bar_top">
      <div class="button_background" id="selected_one">
        <el-badge :value="10" :max="99" :offset="[0,10]" :hidden="message_badge">
          <label>
            <img src="../../../public/message.png" class="message" alt="消息">
            <input type="radio" v-model="current" id="message" @click="selected" :value="message">
          </label>
        </el-badge>
      </div>
      <div class="button_background" id="selected_two">
        <label>
          <img src="../../../public/friends.png" class="friends" alt="好友">
          <input type="radio" v-model="current" id="friends" @click="selected" :value="friends">
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
            <div class="sign_out">
              <img src="../../../public/sign-out.png" alt="退出登录">
              <p class="sign_out_p">退出登录</p>
            </div>
          </div>
        </el-popover>
      </div>
    </div>
    <KeepAlive>
      <component :is="current"/>
    </KeepAlive>
    <dialog id="dialog">
      <Close class="close" onclick="dialog.close()"/>
      <div>
        <label class="change_image">
          <img src="../../../public/chat-avatar/to-user.jpg" alt="头像">
          <Camera class="camera"/>
          <input type="file" style="display: none">
        </label>
        <label class="change_nickname">
          昵称
          <input type="text" class="nickname_input" value="Nickname" placeholder="Nickname">
        </label>
        <label class="change_signature">
          签名
          <input type="text" class="signature_input" value="Signature" placeholder="Signature">
        </label>
        <button>保存</button>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import message from "../chat/message.vue";
import friends from "../friends/friends.vue";
import {homeActionBar} from "./homeActionBar.ts";
import {Close, Camera} from "@element-plus/icons-vue";
import {shallowRef} from "vue";

const current = shallowRef(message);

const {
  message_badge,
  user_lists,
  selected,
} = homeActionBar();
</script>

<style scoped>
@import "homeActionBar.less";
</style>