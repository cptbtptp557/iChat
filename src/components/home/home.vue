<template>
  home
  <input type="button" @click="click" value="click">
</template>

<script setup lang="ts">
import {home} from "./home.ts";

const {click} = home();
</script>

<style scoped>

</style>