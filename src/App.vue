<template>
  <div style="border-radius: 10px">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import socket from "./socket";

socket.on("join-room-name", (data) => {
  socket.emit("join-room", {"room_name": data[0], "user_id": data[1]});
})
socket.on("roomNumberSender", (data) => {
  window.electronAPI.sendVoiceRoomName(data);
})
</script>

<style scoped>

</style>
