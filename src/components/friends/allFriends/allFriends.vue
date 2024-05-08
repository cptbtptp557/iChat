<template>
  <div class="allFriendsBody">
    <div class="friends_introduce">
      <img src="../../../../public/chat-avatar/from-user.png" alt="朋友头像">
      <div class="friends_text_introduce">
        <p>朋友昵称</p>
        <div class="SignIn_status">
          <div class="online" v-if="true">
            <div></div>
            <p>在线</p>
          </div>
          <div class="offline" v-else>
            <div></div>
            <p>离线</p>
          </div>
        </div>
        <p>朋友个性签名</p>
      </div>
    </div>
    <div class="friends_introduce">
      <img src="../../../../public/chat-avatar/from-user.png" alt="朋友头像">
      <div class="friends_text_introduce">
        <p>朋友昵称</p>
        <div class="SignIn_status">
          <div class="online" v-if="!true">
            <div></div>
            <p>在线</p>
          </div>
          <div class="offline" v-else>
            <div></div>
            <p>离线</p>
          </div>
        </div>
        <p>朋友个性签名</p>
      </div>
    </div>
    <div class="friends_introduce">
      <img src="../../../../public/chat-avatar/from-user.png" alt="朋友头像">
      <div class="friends_text_introduce">
        <p>朋友昵称</p>
        <div class="SignIn_status">
          <div class="online" v-if="!true">
            <div></div>
            <p>在线</p>
          </div>
          <div class="offline" v-else>
            <div></div>
            <p>离线</p>
          </div>
        </div>
        <p>朋友个性签名</p>
      </div>
    </div>
    <div class="friends_introduce">
      <img src="../../../../public/chat-avatar/from-user.png" alt="朋友头像">
      <div class="friends_text_introduce">
        <p>朋友昵称</p>
        <div class="SignIn_status">
          <div class="online" v-if="!true">
            <div></div>
            <p>在线</p>
          </div>
          <div class="offline" v-else>
            <div></div>
            <p>离线</p>
          </div>
        </div>
        <p>朋友个性签名</p>
      </div>
    </div>
    <div class="friends_introduce">
      <img src="../../../../public/chat-avatar/from-user.png" alt="朋友头像">
      <div class="friends_text_introduce">
        <p>朋友昵称</p>
        <div class="SignIn_status">
          <div class="online" v-if="true">
            <div></div>
            <p>在线</p>
          </div>
          <div class="offline" v-else>
            <div></div>
            <p>离线</p>
          </div>
        </div>
        <p>朋友个性签名</p>
      </div>
    </div>
    <div class="friends_introduce">
      <img src="../../../../public/chat-avatar/from-user.png" alt="朋友头像">
      <div class="friends_text_introduce">
        <p>朋友昵称</p>
        <div class="SignIn_status">
          <div class="online" v-if="true">
            <div></div>
            <p>在线</p>
          </div>
          <div class="offline" v-else>
            <div></div>
            <p>离线</p>
          </div>
        </div>
        <p>朋友个性签名</p>
      </div>
    </div>
    <div class="friends_introduce">
      <img src="../../../../public/chat-avatar/from-user.png" alt="朋友头像">
      <div class="friends_text_introduce">
        <p>朋友昵称</p>
        <div class="SignIn_status">
          <div class="online" v-if="!true">
            <div></div>
            <p>在线</p>
          </div>
          <div class="offline" v-else>
            <div></div>
            <p>离线</p>
          </div>
        </div>
        <p>朋友个性签名</p>
      </div>
    </div>
    <div class="friends_introduce">
      <img src="../../../../public/chat-avatar/from-user.png" alt="朋友头像">
      <div class="friends_text_introduce">
        <p>朋友昵称</p>
        <div class="SignIn_status">
          <div class="online" v-if="true">
            <div></div>
            <p>在线</p>
          </div>
          <div class="offline" v-else>
            <div></div>
            <p>离线</p>
          </div>
        </div>
        <p>朋友个性签名</p>
      </div>
    </div>
    <div class="friends_introduce">
      <img src="../../../../public/chat-avatar/from-user.png" alt="朋友头像">
      <div class="friends_text_introduce">
        <p>朋友昵称</p>
        <div class="SignIn_status">
          <div class="online" v-if="!true">
            <div></div>
            <p>在线</p>
          </div>
          <div class="offline" v-else>
            <div></div>
            <p>离线</p>
          </div>
        </div>
        <p>朋友个性签名</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {allFriends} from "./allFriends.ts";

const {} = allFriends();
</script>

<style scoped>
@import "./allFriends.less";
</style>