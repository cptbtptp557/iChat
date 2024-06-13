<template>
  <div class="groupLists">
    <header>
      <img src="../../../../public/chat-avatar/from-user.png" alt="群聊头像">
      <div>
        <p>{{ group_lists.group_name }}</p>
        <p>gId: {{ group_lists.gId }}</p>
      </div>
    </header>
    <el-divider/>
    <main>
      <div class="dataBoard">
        <div>
          <el-icon size="20">
            <DataBoard/>
          </el-icon>
          <p>群公告</p>
        </div>
        <div @click="showAnnouncement">
          <p>{{ group_lists.group_announcement }}</p>
          <el-icon color="#9a9898">
            <ArrowRight/>
          </el-icon>
        </div>
      </div>
      <div class="user">
        <div>
          <el-icon size="20">
            <User/>
          </el-icon>
          <p>群成员({{ group_user_lists.length }}人)</p>
        </div>
        <div>
          <img v-for="group_user in group_user_lists" src="../../../../public/chat-avatar/from-user.png"
               alt="群成员头像">
        </div>
      </div>
      <div class="pieChart">
        <div>
          <el-icon size="20">
            <PieChart/>
          </el-icon>
          <p>成员分布</p>
        </div>
        <div>
          <el-progress type="dashboard" :percentage="10" color="rgb(199, 199, 199)">
            <template #default="{ percentage }">
              <span class="percentage-value">{{ percentage }}%</span>
              <span class="percentage-label">活跃</span>
            </template>
          </el-progress>
          <el-progress type="dashboard" :percentage="man_percentage">
            <template #default="{ percentage }">
              <span class="percentage-value">{{ percentage }}%</span>
              <span class="percentage-label">男</span>
            </template>
          </el-progress>
          <el-progress type="dashboard" :percentage="online_percentage" color="#97e567">
            <template #default="{ percentage }">
              <span class="percentage-value">{{ percentage }}%</span>
              <span class="percentage-label">在线</span>
            </template>
          </el-progress>
          <el-progress type="dashboard" :percentage="year_percentage" color="#f5b455">
            <template #default="{ percentage }">
              <span class="percentage-value">{{ percentage }}%</span>
              <span class="percentage-label">00后</span>
            </template>
          </el-progress>
        </div>
      </div>
    </main>
    <footer>
      <el-button type="primary">发消息</el-button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import {groupLists} from "./groupLists";
import {ArrowRight, DataBoard, PieChart, User} from "@element-plus/icons-vue";

const {
  group_lists,
  group_user_lists,
  showAnnouncement,
  man_percentage,
  online_percentage,
  year_percentage,
} = groupLists();

</script>

<style scoped>
@import "./groupLists.less";
</style>