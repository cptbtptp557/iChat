<template>
  <homeActionBar></homeActionBar>
  <VVCwindow :fromImage="fromImage" :categoryCommunication="type"></VVCwindow>
</template>

<script setup lang="ts">
import homeActionBar from "../../components/homeActionBar/homeActionBar.vue";
import {home} from "./home.ts";
import VVCwindow from "../../components/VVCwindow/VVCwindow.vue";
import {ref} from "vue";
import socket from "../../socket";

const fromImage = "../../../public/chat-avatar/from-user.png";
const type = ref();

socket.on("call_type", (call_type: number) => {
  type.value = call_type;
})
const {} = home();
</script>

<style scoped>

</style>