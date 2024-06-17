<template>
  <homeFriendsBar></homeFriendsBar>
  <KeepAlive>
    <component :is="chat_page"></component>
  </KeepAlive>
</template>

<script setup lang="ts">
import homeFriendsBar from "./chatFriendsBar/homeFriendsBar.vue";
import {groupData} from "../../pinia/groupData.ts";

const {chat_page} = groupData();
</script>

<style scoped>

</style>