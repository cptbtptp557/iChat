<template>
  <div style="border-radius: 10px">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import socket from "./socket";

socket.on("join-room-name", (data) => {
  socket.emit("join-room", {"room_name": data[0], "user_id": data[1], "data_type": data[2]});
})
socket.on("roomNumberSender", (data) => {
  if (data[1] === 0) window.electronAPI.sendVoiceRoomName(data[0]);
  else if (data[1] === 1) window.electronAPI.sendVideoRoomName(data[0]);
})
</script>

<style scoped>

</style>
