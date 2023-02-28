<script setup lang="ts">
import {QBtn, QCardActions, QCardSection, QCard} from 'quasar';

defineEmits<{
  (e: 'reset'): void;
  (e: 'save', mobile: boolean): void;
}>();
</script>
<template>
  <QCard
    class="fq-actions"
    flat
    bordered>
    <QCardSection class="text-body2 text-weight-medium text-center q-pb-none fq-end-text"> {{ 'TODO: end-text' }} </QCardSection>
    <QCardActions
      class="fq-buttons"
      :align="'between'">
      <QBtn
        flat
        color="primary"
        @click="$emit('reset')">
        {{ 'TODO: reset' }}
      </QBtn>
      <QBtn
        color="primary"
        @click="$emit('save', $q.platform.is.mobile)">
        {{ 'TODO: save' }}
      </QBtn>
    </QCardActions>
  </QCard>
</template>
