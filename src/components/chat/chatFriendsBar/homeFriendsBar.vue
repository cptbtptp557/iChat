<template>
  <div class="top">
    <header>
      <label>
        <el-icon class="search">
          <Search/>
        </el-icon>
        <input type="text" placeholder="搜索">
      </label>
      <el-button class="add">
        <el-icon>
          <Plus/>
        </el-icon>
      </el-button>
    </header>
      <div class="chat_friends">
        <div class="friends">
          <img src="../../../../public/chat-avatar/from-user.png" alt="朋友头像">
          <div class="information">
            <p>接收方用户</p>
            <p>今天</p>
            <p>接收的消息asdsdasdsdasdasdsadsd</p>
            <el-badge :value="10" :max="99" class="el-badge"/>
          </div>
        </div>
        <div class="friends">
          <img src="../../../../public/chat-avatar/from-user.png" alt="朋友头像">
          <div class="information">
            <p>接收方用户</p>
            <p>2024/01/28</p>
            <p>接收的消息asdsdasdsdasdasdsadsd</p>
          </div>
        </div>
        <div class="friends">
          <img src="../../../../public/chat-avatar/from-user.png" alt="朋友头像">
          <div class="information">
            <p>接收方用户</p>
            <p>2024/01/28</p>
            <p>接收的消息asdsdasdsdasdasdsadsd</p>
          </div>
        </div>
        <div class="friends">
          <img src="../../../../public/chat-avatar/from-user.png" alt="朋友头像">
          <div class="information">
            <p>接收方用户</p>
            <p>2024/01/28</p>
            <p>接收的消息asdsdasdsdasdasdsadsd</p>
          </div>
        </div>
        <div class="friends">
          <img src="../../../../public/chat-avatar/from-user.png" alt="朋友头像">
          <div class="information">
            <p>接收方用户</p>
            <p>2024/01/28</p>
            <p>接收的消息asdsdasdsdasdasdsadsd</p>
          </div>
        </div>
        <div class="friends">
          <img src="../../../../public/chat-avatar/from-user.png" alt="朋友头像">
          <div class="information">
            <p>接收方用户</p>
            <p>2024/01/28</p>
            <p>接收的消息asdsdasdsdasdasdsadsd</p>
          </div>
        </div>
        <div class="friends">
          <img src="../../../../public/chat-avatar/from-user.png" alt="朋友头像">
          <div class="information">
            <p>接收方用户</p>
            <p>2024/01/28</p>
            <p>接收的消息asdsdasdsdasdasdsadsd</p>
          </div>
        </div>
        <div class="friends">
          <img src="../../../../public/chat-avatar/from-user.png" alt="朋友头像">
          <div class="information">
            <p>接收方用户</p>
            <p>2024/01/28</p>
            <p>接收的消息asdsdasdsdasdasdsadsd</p>
          </div>
        </div>
        <div class="friends">
          <img src="../../../../public/chat-avatar/from-user.png" alt="朋友头像">
          <div class="information">
            <p>接收方用户</p>
            <p>2024/01/28</p>
            <p>接收的消息asdsdasdsdasdasdsadsd</p>
          </div>
        </div>
        <div class="friends">
          <img src="../../../../public/chat-avatar/from-user.png" alt="朋友头像">
          <div class="information">
            <p>接收方用户</p>
            <p>2024/01/28</p>
            <p>接收的消息asdsdasdsdasdasdsadsd</p>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import {Plus, Search} from "@element-plus/icons-vue";
</script>

<style scoped>
@import "./homefriendsBar.less";
</style>