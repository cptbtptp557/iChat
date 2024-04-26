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
            <img src="../../../public/avatar.png" class="avatar_image" alt="头像">
          </button>
        </template>
        <div class="personal_information_column">
          <p class="iid">iid:{{ user_lists.iid }}</p>
          <p class="signature">个性签名:{{ user_lists.signature }}</p>
          <input type="button" class="user_lists_button" value="编辑资料">
        </div>
      </el-popover>
    </div>
    <div class="action_bar_top">
      <div class="button_background">
        <el-badge :value="10" :max="99" :offset="[0,10]" :hidden="message_badge">
          <label>
            <img src="../../../public/message.png" class="message" alt="消息">
            <input type="radio" v-model="current" :value="homeChatBar">
          </label>
        </el-badge>
      </div>
      <div class="button_background">
        <label>
          <img src="../../../public/friends.png" class="friends" alt="好友">
          <input type="radio" v-model="current" :value="homeFriendsBar">
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
  </div>
</template>

<script setup lang="ts">
import homeChatBar from "../homeChatBar/homeChatBar.vue";
import homeFriendsBar from "../homeFriendsBar/homeFriendsBar.vue";
import {homeActionBar} from "./homeActionBar.ts";
import {shallowRef} from "vue";

const current = shallowRef(homeChatBar);

const {
  message_badge,
  user_lists,
} = homeActionBar();
</script>

<style scoped>
@import "homeActionBar.less";
</style>