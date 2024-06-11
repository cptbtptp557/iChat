<template>
  <div class="allFriendsBody">
    <header>
      <div>
        <el-icon class="search">
          <Search/>
        </el-icon>
        <input type="text" placeholder="搜索" v-model="search_friend" @input="searchFriend">
      </div>
      <div class="dating_notifications">
        <div @click="friendNotifications">
          <p>好友通知</p>
          <el-icon>
            <ArrowRight/>
          </el-icon>
        </div>
        <div @click="groupChatNotifications">
          <p>群聊通知</p>
          <el-icon>
            <ArrowRight/>
          </el-icon>
        </div>
      </div>
    </header>
    <main>
      <div class="options">
        <el-segmented
            v-model="this_options"
            :options="options"
            size="default"
            block
            @change="changeOptions"/>
      </div>
      <div class="friends_introduce">
        <div class="friends"
             v-for="(lists, index) in friends_number"
             :key="index"
             v-if="this_options === '好友'"
             @click="friendLists(lists, index)"
             :style="{backgroundColor: change_color === index?'#e8e8e8': ''}">
          <img src="../../../../public/chat-avatar/from-user.png" alt="朋友头像">
          <div class="friends_text_introduce">
            <p>{{ lists.friend_notes }}</p>
            <div class="SignIn_status">
              <div class="online" v-if="friends_lists[index][0].onlinepresence === '1'">
                <div></div>
                <p>在线</p>
              </div>
              <div class="offline" v-else>
                <div></div>
                <p>离线</p>
              </div>
            </div>
            <p>{{ friends_lists[index][0].signature }}</p>
          </div>
        </div>
        <div class="group_chats"
             v-for=" (group_data, index2) in all_group_data"
             :key="index2"
             v-else-if="this_options === '群聊'"
             @click="groupLists(group_data[0], index2)"
             :style="{backgroundColor: change_color === index2?'#e8e8e8': ''}">
          <img src="../../../../public/chat-avatar/from-user.png" alt="朋友头像">
          <p>{{ group_data[0].group_name }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import {allFriends} from "./allFriends.ts";
import {ArrowRight, Search} from "@element-plus/icons-vue";

const {
  search_friend,
  searchFriend,
  options,
  this_options,
  changeOptions,
  friendNotifications,
  groupChatNotifications,
  friendLists,
  groupLists,
  friends_number,
  friends_lists,
  change_color,
  all_group_data,
} = allFriends();
</script>

<style scoped>
@import "./allFriends.less";
</style>