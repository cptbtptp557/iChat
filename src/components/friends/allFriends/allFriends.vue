<template>
  <div class="allFriendsBody">
    <header>
      <el-icon class="search">
        <Search/>
      </el-icon>
      <input type="text" placeholder="搜索" v-model="search_friend" @input="searchFriend">
    </header>
    <main>
      <div class="friends_introduce" v-for=" users in 10" :key="users">
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
          <p>朋友个性签名朋友个性签名朋友个性签名朋友个性签名朋友个性签名朋友个性签名朋友个性签名</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import {allFriends} from "./allFriends.ts";
import {Search} from "@element-plus/icons-vue";

const {
  search_friend,
  searchFriend,
} = allFriends();
</script>

<style scoped>
@import "./allFriends.less";
</style>