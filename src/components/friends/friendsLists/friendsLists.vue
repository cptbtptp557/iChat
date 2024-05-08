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
          <div class="gender">
            <el-icon size="20">
              <Male style="color:#4B70E2;" v-if="gender === 'man'"/>
              <Female style="color: #ffb9c6" v-else/>
            </el-icon>
            <p v-if="gender === 'man'">男</p>
            <p v-else>女</p>
          </div>
          <p class="age">22岁</p>
          <p class="constellation">11月24日 <span>射手座</span></p>
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
            <p class="friend_signature">朋友签名(最大20字)</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {friendsList} from "./friendsLists.ts";
import {Male, Female, EditPen, Edit} from "@element-plus/icons-vue";

const {
  friends_lists,
  friend_signIn_status,
  gender,
  remark,
  changeRemark,
  warn_show,
} = friendsList();
</script>

<style scoped>
@import "./friendsLists.less";
</style>