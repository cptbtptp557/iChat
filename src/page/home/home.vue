<template>
  <homeActionBar></homeActionBar>
  <VVCwindow :fromImage="fromImage" :categoryCommunication="0"></VVCwindow>
</template>

<script setup lang="ts">
import homeActionBar from "../../components/homeActionBar/homeActionBar.vue";
import {home} from "./home.ts";
import VVCwindow from "../../components/VVCwindow/VVCwindow.vue";

const fromImage = "../../../public/chat-avatar/from-user.png";

const {} = home();
</script>

<style scoped>

</style>