<template>
  <div class="thisOutside">
    <header>
      <h4>{{ this_chat_friend_data?.group_name || this_chat_friend_data?.nickname }}</h4>
      <div class="shat_control">
        <el-tooltip
            class="box-item"
            effect="dark"
            content="群公告"
            placement="bottom"
            v-if="!!this_chat_friend_data?.gId"
        >
          <el-icon size="23" @click="openGroupAnnouncements" v-show="group_state">
            <DataBoard/>
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
            v-if="!!this_chat_friend_data?.gId"
        >
          <el-icon size="25">
            <More @click="openMoreWindow"/>
          </el-icon>
        </el-tooltip>
      </div>
    </header>
    <p class="copy_paste" id="copy">复制</p>
    <p class="copy_paste" id="paste" @click="paste">粘贴</p>
    <el-divider style="position: absolute; top: 15px"/>
    <div id="dialogBox" class="dialog_box" ref="scroll_top_height" @scroll="scrollTopHeight">
      <div v-for="(message, index) in allChatMessage" :key="index">
        <div class="to_user" v-if="message.from_iid != usersLists().thisUserAccount">
          <div>
            <img class="user_image" src="../../../../public/chat-avatar/from-user.png" alt="接收方用户">
            <div>
              <p>{{ this_chat_friend_data?.nickname || message?.from_name }}</p>
              <img :src="message.message.split('|')[1]"
                   alt="imageMessage"
                   v-if="message.message.startsWith('image')">
              <div v-else-if="message.message.startsWith('video')">
                <video :src="message.message.split('|')[1]"/>
                <div class="operate">
                  <el-icon size="40"
                           color="#ABABAB"
                           @click="watchVideo(message.message.split('|')[2], message.message.split('|')[1])">
                    <VideoPlay/>
                  </el-icon>
                  <p>{{ message.message.split('|')[2] }}</p>
                  <p>{{
                      message.message.split('|')[3] > 1024 ?
                          (message.message.split('|')[3] > (1024 * 1024) ?
                              (message.message.split('|')[3] > (1024 * 1024 * 1024) ?
                                  (`${(message.message.split('|')[3] / (1024 * 1024 * 1024)).toFixed(1)}GB`) :
                                  (`${(message.message.split('|')[3] / (1024 * 1024)).toFixed(1)}MB`)) :
                              (`${(message.message.split('|')[3] / 1024).toFixed(1)}KB`)) :
                          (`${message.message.split('|')[3].toFixed(1)}bytes`)
                    }}</p>
                </div>
              </div>
              <div class="file"
                   @click="openOrDownloadFile"
                   v-else-if="message.message.startsWith('application')">
                <div>
                  <p>{{ message.message.split('|')[2] }}</p>
                  <p>{{
                      message.message.split('|')[3] > 1024 ?
                          (message.message.split('|')[3] > (1024 * 1024) ?
                              (message.message.split('|')[3] > (1024 * 1024 * 1024) ?
                                  (`${(message.message.split('|')[3] / (1024 * 1024 * 1024)).toFixed(1)}GB`) :
                                  (`${(message.message.split('|')[3] / (1024 * 1024)).toFixed(1)}MB`)) :
                              (`${(message.message.split('|')[3] / 1024).toFixed(1)}KB`)) :
                          (`${message.message.split('|')[3].toFixed(1)}bytes`)
                    }}</p>
                </div>
                <el-icon size="60" color="#557ffc">
                  <Document/>
                </el-icon>
                <a id="file" :href="message.message.split('|')[1]">file</a>
              </div>
              <p @contextmenu.prevent="copyText" v-else>{{ message.message }}</p>
            </div>
          </div>
        </div>
        <div class="from_user" v-else>
          <div>
            <div>
              <p>{{ usersLists().thisUserNickname }}</p>
              <img :src="message.message.split('|')[1]"
                   alt="imageMessage"
                   v-if="message.message.startsWith('image')">
              <div v-else-if="message.message.startsWith('video')">
                <video :src="message.message.split('|')[1]"/>
                <div class="operate">
                  <el-icon size="40"
                           color="#ABABAB"
                           @click="watchVideo(message.message.split('|')[2], message.message.split('|')[1])">
                    <VideoPlay/>
                  </el-icon>
                  <p>{{ message.message.split('|')[2] }}</p>
                  <p>{{
                      message.message.split('|')[3] > 1024 ?
                          (message.message.split('|')[3] > (1024 * 1024) ?
                              (message.message.split('|')[3] > (1024 * 1024 * 1024) ?
                                  (`${(message.message.split('|')[3] / (1024 * 1024 * 1024)).toFixed(1)}GB`) :
                                  (`${(message.message.split('|')[3] / (1024 * 1024)).toFixed(1)}MB`)) :
                              (`${(message.message.split('|')[3] / 1024).toFixed(1)}KB`)) :
                          (`${message.message.split('|')[3].toFixed(1)}bytes`)
                    }}</p>
                </div>
              </div>
              <div class="file"
                   @click="openOrDownloadFile"
                   v-else-if="message.message.startsWith('application')">
                <div>
                  <p>{{ message.message.split('|')[2] }}</p>
                  <p>{{
                      message.message.split('|')[3] > 1024 ?
                          (message.message.split('|')[3] > (1024 * 1024) ?
                              (message.message.split('|')[3] > (1024 * 1024 * 1024) ?
                                  `${(message.message.split('|')[3] / (1024 * 1024 * 1024)).toFixed(1)}GB` :
                                  `${(message.message.split('|')[3] / (1024 * 1024)).toFixed(1)}MB`) :
                              `${(message.message.split('|')[3] / 1024).toFixed(1)}KB`) :
                          `${message.message.split('|')[3].toFixed(1)}bytes`
                    }}</p>
                </div>
                <el-icon size="60" color="#557ffc">
                  <Document/>
                </el-icon>
                <a id="file" :href="message.message.split('|')[1]">file</a>
              </div>
              <p @contextmenu.prevent="copyText" v-else>{{ message.message }}</p>
            </div>
            <img class="user_image" src="../../../../public/chat-avatar/to-user.jpg" alt="发出方用户">
          </div>
        </div>
      </div>
    </div>
    <el-divider style="position: absolute; bottom: 200px"/>
    <footer>
      <div class="shat_control">
        <label>
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
          <input type="file" accept="image/*" style="display: none" @change="getFile">
        </label>
        <label>
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
          <input type="file"
                 style="display: none"
                 accept=".txt,.mp4,.zip,.rar,.ppt,.pptx,.pdf,.json,.xlsx,.xls,.docx,.doc,.rtf"
                 @change="getFile"/>
        </label>
      </div>
      <textarea id="textarea"
                maxlength="500"
                v-model.trim="content"
                @keydown.enter="enterSengMessage"
                @contextmenu.prevent="pasteText"/>
      <el-button type="primary"
                 :disabled="!button_disabled"
                 :icon="Position"
                 class="send_box"
                 @click="sendMessage">
        发送
      </el-button>
      <el-alert title="复制成功 ! ! !"
                show-icon
                type="success"
                :closable="false"
                center
                class="copy_success"
                v-show="copy_success"
      />
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
              <p @click="look_more_group_users = true">
                查看114514名群成员
                <el-icon size="15">
                  <ArrowRight/>
                </el-icon>
              </p>
            </div>
            <div class="group_users">
              <div class="group_user" v-for="group_user in 9" :key="group_user">
                <img src="../../../../public/chat-avatar/from-user.png" alt="群成员头像">
                <p>群成员昵称</p>
              </div>
              <div class="invite">
                <el-icon size="40" @click="group_add_users = true">
                  <Plus/>
                </el-icon>
                <p>邀请</p>
              </div>
            </div>
          </main>
          <footer>
            <div class="group_name">
              <p>群聊名称</p>
              <el-input
                  type="text"
                  :disabled="group_permissions"
                  v-model="group_name"
                  maxlength="15"
                  show-word-limit
                  @change="changeGroupName"/>
            </div>
            <div class="group_announcement">
              <p>群公告</p>
              <el-input
                  type="textarea"
                  :disabled="group_permissions"
                  v-model="group_announcement"
                  maxlength="50"
                  show-word-limit
                  rows="3"
                  resize="none"
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
    <el-dialog v-model="group_add_users">
      <div class="group_add_users_outside">
        <div class="group_add_users_left">
          <el-input
              v-model="group_add_users_inquire"
              :prefix-icon="Search"
              placeholder="查询"
              clearable/>
          <div>
            <label v-for="(value, index) in invite_users" :key="index">
              <input
                  type="checkbox"
                  :name="'invite_users' + value"
                  :value="value"
                  v-model="selected_users"
                  @change="inviteUsersLists"
              >
              <img src="../../../../public/chat-avatar/from-user.png" alt="好友头像">
              邀请用户 {{ value }}
            </label>
          </div>
        </div>
        <div class="group_add_users_right">
          <div class="total_tip">
            <p>添加成员</p>
            <p>已添加{{ selected_users.length }}人</p>
          </div>
          <div class="selected_users">
            <div v-for="(value, index) in selected_users" :key="index">
              <img src="../../../../public/chat-avatar/from-user.png" alt="好友头像">
              <p>邀请用户 {{ value }}</p>
            </div>
          </div>
          <div class="button">
            <el-button type="primary" size="default">确定</el-button>
            <el-button size="default">取消</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-drawer
        v-model="look_more_group_users"
        :modal="false"
        :with-header="false"
        class="look_more_group_users">
      <header @click="look_more_group_users = false">
        <el-icon>
          <ArrowLeft/>
        </el-icon>
        <p>群聊成员 114514</p>
      </header>
      <el-input
          v-model="look_more_group_users_inquire"
          style="width: 240px"
          placeholder="搜索"
          clearable
          :prefix-icon="Search"
      />
      <main>
        <ul>
          <li v-for="a in 30" :key="a">
            <img src="../../../../public/chat-avatar/from-user.png" alt="群成员头像">
            <p>群成员昵称</p>
            <p>群成员权限</p>
          </li>
        </ul>
      </main>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import {homeChatBar} from "./homeChatBar.ts";
import {usersLists} from "../../../pinia/usersLists.ts";
import {
  Microphone,
  VideoCamera,
  More,
  Picture,
  Files,
  Position,
  ArrowRight,
  Plus,
  DataBoard,
  Search, ArrowLeft, Document, VideoPlay,
} from "@element-plus/icons-vue";

import {oss} from "../../../alibabaCloud/oss.ts";

const {getFile} = oss();

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
  openGroupAnnouncements,
  group_state,
  group_add_users,
  group_add_users_inquire,
  invite_users,
  selected_users,
  inviteUsersLists,
  look_more_group_users,
  look_more_group_users_inquire,
  copyText,
  pasteText,
  paste,
  copy_success,
  sendMessage,
  scroll_top_height,
  scrollTopHeight,
  this_chat_friend_data,
  allChatMessage,
  enterSengMessage,
  openOrDownloadFile,
  watchVideo,
} = homeChatBar();
</script>

<style scoped>
@import "./homeChatBar.less";
</style>