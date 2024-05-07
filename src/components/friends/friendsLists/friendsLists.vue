<template>
  <div class="friendsListsBody">
    <img src="../../../../public/RaidenShogun.png" draggable="false" alt="雷电" v-if="!friends_lists">
    <div class="friendsLists" v-else>
      <img src="../../../../public/chat-avatar/from-user.png" draggable="false" alt="朋友头像">
      <div class="name_id">
        <p>朋友昵称(最多不超过12字)</p>
        <p>Iid: 10001</p>
        <div class="SignIn_status">
          <div class="online" v-if="!friend_signIn_status">
            <div></div>
            <p>在线</p>
          </div>
          <div class="offline" v-else>
            <div></div>
            <p>离线</p>
          </div>
        </div>
      </div>
      <div class="dividing_line"/>
      <div class="friend_private_information">
        <header>
          <el-icon size="20">
            <Male style="color:#4B70E2;"/>
            <Female style="color: pink"/>
          </el-icon>
          <p>男</p>
        </header>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {friendsList} from "./friendsLists.ts";
import {Male, Female} from "@element-plus/icons-vue";

const {
  friends_lists,
  friend_signIn_status,
} = friendsList();
</script>

<style scoped>
@import "./friendsLists.less";
</style>