<template>
  <div class="groupLists">
    <header>
      <img src="../../../../public/chat-avatar/from-user.png" alt="群聊头像">
      <div>
        <p>{{ theGroupLists.group_name }}</p>
        <p>gId: {{ theGroupLists.gId }}</p>
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
        <div>
          <p>群公告</p>
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
          <p>群成员(114514人)</p>
        </div>
        <div>
          <img v-for="a in 12" src="../../../../public/chat-avatar/from-user.png" alt="群成员头像">
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
          <el-progress type="dashboard" :percentage="30">
            <template #default="{ percentage }">
              <span class="percentage-value">{{ percentage }}%</span>
              <span class="percentage-label">男</span>
            </template>
          </el-progress>
          <el-progress type="dashboard" :percentage="80" color="#97e567">
            <template #default="{ percentage }">
              <span class="percentage-value">{{ percentage }}%</span>
              <span class="percentage-label">在线</span>
            </template>
          </el-progress>
          <el-progress type="dashboard" :percentage="60" color="#f5b455">
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
  theGroupLists,
} = groupLists();
</script>

<style scoped>
@import "./groupLists.less";
</style>