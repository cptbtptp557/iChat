<template>
  <div class="top">
    <header>
      <label>
        <el-icon class="search">
          <Search/>
        </el-icon>
        <input type="text" placeholder="搜索">
      </label>
      <el-popover
          placement="bottom-start"
          :width="150"
          trigger="click"
      >
        <el-button style="position: relative;left: 11px;margin-bottom: 10px">
          <el-icon style="position: relative; left: -5px">
            <DataAnalysis/>
          </el-icon>
          <p>发起群聊</p>
        </el-button>
        <el-button @click="add_friend = true">
          <el-icon style="position: relative; left: -5px">
            <User/>
          </el-icon>
          <p>添加好友</p>
        </el-button>
        <template #reference>
          <el-button class="add">
            <el-icon>
              <Plus/>
            </el-icon>
          </el-button>
        </template>
      </el-popover>
      <el-dialog
          v-model="add_friend"
          width="600"
          draggable
          style="border-radius: 5px"
      >
        <template #header>
          <p style="text-align: center;letter-spacing: 2px;margin-left: 40px">搜索</p>
        </template>
        <template #footer>
          <div class="add_input">
            <el-icon>
              <Search/>
            </el-icon>
            <input type="text" placeholder="输入搜索关键词..." v-model="find_logotype" @input="find">
            <el-icon @click="empty">
              <CircleClose/>
            </el-icon>
          </div>
          <div class="inquire_classify">
            <p @click="changeBorder" id="user">用户</p>
            <p @click="changeBorder" id="group_chats">群聊</p>
          </div>
          <div class="search_results">
            <div v-if="find_logotype">
              <el-icon size="100">
                <MessageBox/>
              </el-icon>
              <h2>输入搜索关键词</h2>
            </div>
            <div class="show_search_outcome" v-else>
              <div class="search_user">
                <img src="../../../../public/chat-avatar/from-user.png" alt="用户头像">
                <div>
                  <p>昵称</p>
                  <p>iId</p>
                  <p>个性签名</p>
                </div>
              </div>
              <div class="search_user">
                <img src="../../../../public/chat-avatar/from-user.png" alt="用户头像">
                <div>
                  <p>昵称</p>
                  <p>iId</p>
                  <p>个性签名</p>
                </div>
              </div>
              <div class="search_user">
                <img src="../../../../public/chat-avatar/from-user.png" alt="用户头像">
                <div>
                  <p>昵称</p>
                  <p>iId</p>
                  <p>个性签名</p>
                </div>
              </div>
              <div class="search_user">
                <img src="../../../../public/chat-avatar/from-user.png" alt="用户头像">
                <div>
                  <p>昵称</p>
                  <p>iId</p>
                  <p>个性签名</p>
                </div>
              </div>
              <div class="search_user">
                <img src="../../../../public/chat-avatar/from-user.png" alt="用户头像">
                <div>
                  <p>昵称</p>
                  <p>iId</p>
                  <p>个性签名</p>
                </div>
              </div>
              <div class="search_user">
                <img src="../../../../public/chat-avatar/from-user.png" alt="用户头像">
                <div>
                  <p>昵称</p>
                  <p>iId</p>
                  <p>个性签名</p>
                </div>
              </div>
              <div class="search_user">
                <img src="../../../../public/chat-avatar/from-user.png" alt="用户头像">
                <div>
                  <p>昵称</p>
                  <p>iId</p>
                  <p>个性签名</p>
                </div>
              </div>
              <div class="search_user">
                <img src="../../../../public/chat-avatar/from-user.png" alt="用户头像">
                <div>
                  <p>昵称</p>
                  <p>iId</p>
                  <p>个性签名</p>
                </div>
              </div>
              <div class="search_user">
                <img src="../../../../public/chat-avatar/from-user.png" alt="用户头像">
                <div>
                  <p>昵称</p>
                  <p>iId</p>
                  <p>个性签名</p>
                </div>
              </div>
              <div class="search_user">
                <img src="../../../../public/chat-avatar/from-user.png" alt="用户头像">
                <div>
                  <p>昵称</p>
                  <p>iId</p>
                  <p>个性签名</p>
                </div>
              </div>
              <div class="search_user">
                <img src="../../../../public/chat-avatar/from-user.png" alt="用户头像">
                <div>
                  <p>昵称</p>
                  <p>iId</p>
                  <p>个性签名</p>
                </div>
              </div>
              <div class="search_user">
                <img src="../../../../public/chat-avatar/from-user.png" alt="用户头像">
                <div>
                  <p>昵称</p>
                  <p>iId</p>
                  <p>个性签名</p>
                </div>
              </div>
              <div class="search_user">
                <img src="../../../../public/chat-avatar/from-user.png" alt="用户头像">
                <div>
                  <p>昵称</p>
                  <p>iId</p>
                  <p>个性签名</p>
                </div>
              </div>
              <div class="search_user">
                <img src="../../../../public/chat-avatar/from-user.png" alt="用户头像">
                <div>
                  <p>昵称</p>
                  <p>iId</p>
                  <p>个性签名</p>
                </div>
              </div>
              <div class="search_user">
                <img src="../../../../public/chat-avatar/from-user.png" alt="用户头像">
                <div>
                  <p>昵称</p>
                  <p>iId</p>
                  <p>个性签名</p>
                </div>
              </div>
              <div class="search_user">
                <img src="../../../../public/chat-avatar/from-user.png" alt="用户头像">
                <div>
                  <p>昵称</p>
                  <p>iId</p>
                  <p>个性签名</p>
                </div>
              </div>
            </div>
          </div>
        </template>
      </el-dialog>
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
import {CircleClose, DataAnalysis, MessageBox, Plus, Search, User} from "@element-plus/icons-vue";
import {homeFriendsBar} from "./homeFriendsBar.ts";

const {
  add_friend,
  find,
  find_logotype,
  empty,
  changeBorder,
} = homeFriendsBar();
</script>

<style scoped>
@import "./homefriendsBar.less";
</style>