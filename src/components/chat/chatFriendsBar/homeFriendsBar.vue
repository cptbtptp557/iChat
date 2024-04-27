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
  </div>
</template>

<script setup lang="ts">
import {Plus, Search} from "@element-plus/icons-vue";
</script>

<style scoped>
@import "./homefriendsBar.less";
</style>