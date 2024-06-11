<template>
  <allFriends></allFriends>
  <KeepAlive>
    <component :is="usersLists().all_friends_show_components"></component>
  </KeepAlive>
</template>

<script setup lang="ts">
import allFriends from "./allFriends/allFriends.vue";
import {usersLists} from "../../pinia/usersLists";
</script>

<style scoped>

</style>