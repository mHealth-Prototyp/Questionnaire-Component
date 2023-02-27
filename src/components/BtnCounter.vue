<script setup lang="ts">
import {ref} from 'vue';
import {QBtn} from 'quasar';

const counter = ref(0);
</script>
<template>
  <q-btn @click="counter++">Clicks: {{ counter }}</q-btn>
</template>
