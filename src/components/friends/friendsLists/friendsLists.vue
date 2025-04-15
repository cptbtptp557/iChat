<template>
  <div class="friendsListsBody">
    <div class="friendsLists">
      <img :src="'https://ichatimage.oss-cn-shenzhen.aliyuncs.com/i'+friends_lists.iId" draggable="false" alt="朋友头像">
      <div class="name_id">
        <p>{{ friends_lists.nickname }}</p>
        <p>Iid: {{ friends_lists.iId }}</p>
        <div class="SignIn_status">
          <div class="online" v-if="friends_lists.onlinepresence === '1'">
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
          <div class="gender">
            <el-icon size="20">
              <Male style="color:#4B70E2;" v-if="gender === 'man'"/>
              <Female style="color: #ffb9c6" v-else/>
            </el-icon>
            <p v-if="gender === 'man'">男</p>
            <p v-else>女</p>
          </div>
          <p class="age">{{ frined_age }}岁</p>
          <p class="constellation">
            {{ friends_lists.birthday.substring(friends_lists.birthday.length - 5, friends_lists.birthday.length - 3) }}
            月
            {{ friends_lists.birthday.substring(friends_lists.birthday.length - 2) }}
            日
          </p>
        </header>
        <div class="friend_information">
          <div class="remark">
            <el-icon size="20">
              <Edit/>
            </el-icon>
            <p>备注</p>
            <p class="warn" v-show="warn_show">备注不超过10字</p>
            <input type="text" contenteditable="true" v-model="remark" @change="changeRemark">
          </div>
          <div class="signature">
            <el-icon size="20">
              <EditPen/>
            </el-icon>
            <p>签名</p>
            <p class="friend_signature">{{ friends_lists.signature }}</p>
          </div>
        </div>
        <footer>
          <input type="button" value="语音通话" @click="openVoiceCallWindow">
          <input type="button" value="视频通话" @click="openVideoCallWindow">
          <input type="button" value="发消息" @click="openChatWindow">
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {friendsList} from "./friendsLists.ts";
import {Male, Female, EditPen, Edit} from "@element-plus/icons-vue";

const {
  friends_lists,
  gender,
  remark,
  changeRemark,
  warn_show,
  openVoiceCallWindow,
  openVideoCallWindow,
  openChatWindow,
  frined_age,
} = friendsList();
</script>

<style scoped>
@import "./friendsLists.less";
</style>