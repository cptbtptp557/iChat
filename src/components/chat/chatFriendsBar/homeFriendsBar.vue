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
        <el-button style="position: relative;left: 11px;margin-bottom: 10px" @click="createGroup">
          <el-icon style="position: relative; left: -5px">
            <DataAnalysis/>
          </el-icon>
          <p>发起群聊</p>
        </el-button>
        <el-button @click="addFriendFrame">
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
          <div class="search_results" v-loading="loading" element-loading-text="Loading">
            <div v-if="!find_logotype">
              <el-icon size="100">
                <MessageBox/>
              </el-icon>
              <h2>输入搜索关键词</h2>
            </div>
            <div class="show_search_outcome" v-else>
              <div class="search_user" v-for="(search_user, index) in query_results" :key="index"
                   @click="confirmAddFriend(search_user)">
                <img src="../../../../public/chat-avatar/from-user.png" alt="用户头像">
                <div v-if="search_user.iId">
                  <p>{{ search_user.nickname }}</p>
                  <p>{{ search_user.iId }}</p>
                  <p>{{ search_user.signature }}</p>
                </div>
                <div v-else-if="search_user.gId">
                  <p>{{ search_user.group_name }}</p>
                  <p>{{ search_user.gId }}</p>
                  <p>{{ search_user.group_introduce }}</p>
                </div>
              </div>
            </div>
          </div>
        </template>
      </el-dialog>
      <el-dialog
          v-model="confirm_add_friend"
          title="申请添加"
          center
          draggable
          width="400">
        <el-form label-position="top" class="confirm_add_friend">
          <el-form-item>
            <img src="../../../../public/chat-avatar/from-user.png" alt="被添加方头像">
            <div v-if="confirm_add_friend_lists.iId">
              <p>{{ confirm_add_friend_lists.nickname }}</p>
              <p>iId: {{ confirm_add_friend_lists.iId }}</p>
            </div>
            <div v-else>
              <p>{{ confirm_add_friend_lists.group_name }}</p>
              <p>gId: {{ confirm_add_friend_lists.gId }}</p>
            </div>
          </el-form-item>
          <el-form-item label="填写认证信息">
            <el-input
                type="text"
                clearable
                maxlength="15"
                show-word-limit
                v-model="introduce_yourself"/>
          </el-form-item>
          <el-form-item label="备注" v-show="query_results[0].iId">
            <el-input
                type="text"
                clearable
                maxlength="15"
                show-word-limit
                v-model="receiver_remarks"
            />
          </el-form-item>
          <el-form-item style="position:relative;float: right">
            <el-button
                type="primary"
                @click="confirm_add_friend_lists.iId ? addFriend(confirm_add_friend_lists) : addGroup(confirm_add_friend_lists)">
              发送
            </el-button>
            <el-button @click="confirm_add_friend = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </header>
    <div class="chat_friends">
      <div class="friends" v-for="friends in 10" :key="friends">
        <img src="../../../../public/chat-avatar/from-user.png" alt="朋友头像">
        <div class="information">
          <p>接收方用户</p>
          <p>今天</p>
          <p>接收的消息</p>
          <el-badge :value="10" :max="99" class="el-badge"/>
        </div>
      </div>
    </div>
    <el-dialog v-model="create_group">
      <div class="group_add_users_outside">
        <div class="group_add_users_left">
          <el-input
              v-model="group_add_users_inquire"
              :prefix-icon="Search"
              placeholder="查询"
              clearable
              @input="inquire"
          />
          <div>
            <label v-for="(value, index) in this_user_friends" :key="index">
              <input
                  type="checkbox"
                  :name="'invite_users' + value"
                  :value="value"
                  v-model="selected_users"
                  @change="inviteUsersLists"
              >
              <img src="../../../../public/chat-avatar/from-user.png" alt="好友头像">
              {{ value.friend_notes }}
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
              <p>{{ value.friend_notes }}</p>
            </div>
          </div>
          <div class="button">
            <el-button type="primary" size="default" @click="createGroupSure">确定</el-button>
            <el-button size="default" @click="create_group = false">取消</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {CircleClose, DataAnalysis, MessageBox, Plus, Search, User} from "@element-plus/icons-vue";
import {homeFriendsBar} from "./homeFriendsBar.ts";

const {
  add_friend,
  find,
  find_logotype,
  query_results,
  empty,
  changeBorder,
  confirm_add_friend,
  confirm_add_friend_lists,
  confirmAddFriend,
  introduce_yourself,
  receiver_remarks,
  create_group,
  group_add_users_inquire,
  this_user_friends,
  selected_users,
  inviteUsersLists,
  addFriend,
  addGroup,
  loading,
  createGroup,
  addFriendFrame,
  inquire,
  createGroupSure,
} = homeFriendsBar();
</script>

<style scoped>
@import "homeFriendsBar.less";
</style>