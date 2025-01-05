<template>
  <div style="border-radius: 10px">
    <router-view></router-view>
    <VVCwindow :fromImage="fromImage" :categoryCommunication="0"></VVCwindow>
  </div>
</template>

<script setup lang="ts">
import VVCwindow from "../src/components/VVCwindow/VVCwindow.vue";

const fromImage = "../../../public/chat-avatar/from-user.png";
</script>

<style scoped>

</style>
