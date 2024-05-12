<template>
  <div class="thisOutside">
    <header>
      <h4>聊天对象</h4>
      <div class="shat_control">
        <el-tooltip
            class="box-item"
            effect="dark"
            content="群公告"
            placement="bottom"
        >
          <el-icon size="23" v-show="group_state">
            <Suitcase/>
          </el-icon>
        </el-tooltip>
        <el-tooltip
            class="box-item"
            effect="dark"
            content="语音通话"
            placement="bottom"
        >
          <el-icon size="25">
            <Microphone @click="openVoiceCallWindow"/>
          </el-icon>
        </el-tooltip>
        <el-tooltip
            class="box-item"
            effect="dark"
            content="视频通话"
            placement="bottom"
        >
          <el-icon size="25">
            <VideoCamera @click="openVideoCallWindow"/>
          </el-icon>
        </el-tooltip>
        <el-tooltip
            class="box-item"
            effect="dark"
            content="更多"
            placement="bottom-end"
        >
          <el-icon size="25">
            <More @click="openMoreWindow"/>
          </el-icon>
        </el-tooltip>
      </div>
    </header>
    <el-divider style="position: absolute; top: 15px"/>
    <div class="dialog_box">
      <div class="to_user">
        <img src="../../../../public/chat-avatar/from-user.png" alt="接收方用户">
        <p>接收方用户</p>
        <p>
          发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容</p>
      </div>
      <div class="from_user">
        <img src="../../../../public/chat-avatar/to-user.jpg" alt="发出方用户">
        <p>发出方用户</p>
        <p>发出的内容</p>
      </div>
      <div class="to_user">
        <img src="../../../../public/chat-avatar/from-user.png" alt="接收方用户">
        <p>接收方用户</p>
        <p>接收的内容</p>
      </div>
      <div class="from_user">
        <img src="../../../../public/chat-avatar/to-user.jpg" alt="发出方用户">
        <p>发出方用户</p>
        <p>
          发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容发出的内容</p>
      </div>
      <div class="to_user">
        <img src="../../../../public/chat-avatar/from-user.png" alt="接收方用户">
        <p>接收方用户</p>
        <p>接收的内容</p>
      </div>
      <div class="to_user">
        <img src="../../../../public/chat-avatar/from-user.png" alt="接收方用户">
        <p>接收方用户</p>
        <p>接收的内容</p>
      </div>
      <div class="from_user">
        <img src="../../../../public/chat-avatar/to-user.jpg" alt="发出方用户">
        <p>发出方用户</p>
        <p>发出的内容</p>
      </div>
      <div class="from_user">
        <img src="../../../../public/chat-avatar/to-user.jpg" alt="发出方用户">
        <p>发出方用户</p>
        <p>发出的内容</p>
      </div>
    </div>
    <el-divider style="position: absolute; bottom: 200px"/>
    <footer>
      <div class="shat_control">
        <el-tooltip
            class="box-item"
            effect="dark"
            content="图片"
            placement="bottom-start"
        >
          <el-icon size="20">
            <Picture/>
          </el-icon>
        </el-tooltip>
        <el-tooltip
            class="box-item"
            effect="dark"
            content="文件"
            placement="bottom"
        >
          <el-icon size="20">
            <Files/>
          </el-icon>
        </el-tooltip>
      </div>
      <textarea v-model="content"/>
      <el-button type="primary" :disabled="!button_disabled" :icon="Position" class="send_box">发送</el-button>
    </footer>
    <el-drawer
        v-model="more_window"
        class="drawer"
        size="350"
        :with-header="false"
    >
      <main>
        <div class="group_chats_more" v-show="group_state">
          <header>
            <img src="../../../../public/chat-avatar/from-user.png" alt="群头像">
            <div>
              <p>{{ group_name }}</p>
              <p>群Id</p>
            </div>
          </header>
          <main>
            <div class="group_main_top">
              <p>群聊成员</p>
              <p>
                查看114514名群成员
                <el-icon size="15">
                  <ArrowRight/>
                </el-icon>
              </p>
            </div>
            <div class="group_users">
              <div class="group_user">
                <img src="../../../../public/chat-avatar/from-user.png" alt="群成员头像">
                <p>群成员昵称</p>
              </div>
              <div class="group_user">
                <img src="../../../../public/chat-avatar/from-user.png" alt="群成员头像">
                <p>群成员昵称</p>
              </div>
              <div class="group_user">
                <img src="../../../../public/chat-avatar/from-user.png" alt="群成员头像">
                <p>群成员昵称</p>
              </div>
              <div class="group_user">
                <img src="../../../../public/chat-avatar/from-user.png" alt="群成员头像">
                <p>群成员昵称</p>
              </div>
              <div class="group_user">
                <img src="../../../../public/chat-avatar/from-user.png" alt="群成员头像">
                <p>群成员昵称</p>
              </div>
              <div class="group_user">
                <img src="../../../../public/chat-avatar/from-user.png" alt="群成员头像">
                <p>群成员昵称</p>
              </div>
              <div class="group_user">
                <img src="../../../../public/chat-avatar/from-user.png" alt="群成员头像">
                <p>群成员昵称</p>
              </div>
              <div class="group_user">
                <img src="../../../../public/chat-avatar/from-user.png" alt="群成员头像">
                <p>群成员昵称</p>
              </div>
              <div class="group_user">
                <img src="../../../../public/chat-avatar/from-user.png" alt="群成员头像">
                <p>群成员昵称</p>
              </div>
              <div class="invite">
                <el-icon size="40">
                  <Plus/>
                </el-icon>
                <p>邀请</p>
              </div>
            </div>
          </main>
          <footer>
            <div class="group_name">
              <p>群聊名称</p>
              <input
                  type="text"
                  :disabled="group_permissions"
                  v-model="group_name"
                  maxlength="15"
                  @change="changeGroupName"/>
            </div>
            <div class="group_announcement">
              <p>群公告</p>
              <input
                  type="text"
                  :disabled="group_permissions"
                  v-model="group_announcement"
                  maxlength="20"
                  @change="changeGroupAnnouncement"/>
            </div>
          </footer>
        </div>
        <div class="all_more">
          <input type="button" value="删除聊天记录">
          <input type="button" :value="group_state? '退出群聊':'删除好友'">
        </div>
      </main>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import {homeChatBar} from "./homeChatBar.ts";
import {
  Microphone,
  VideoCamera,
  More,
  Picture,
  Files,
  Position,
  ArrowRight,
  Plus,
  Suitcase
} from "@element-plus/icons-vue";

const {
  content,
  button_disabled,
  openVoiceCallWindow,
  openVideoCallWindow,
  more_window,
  openMoreWindow,
  group_name,
  group_permissions,
  changeGroupName,
  group_announcement,
  changeGroupAnnouncement,
  group_state,
} = homeChatBar();
</script>

<style scoped>
@import "./homeChatBar.less";
</style>