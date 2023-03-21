<script setup lang="ts">
import {QBtn, QCardActions, QCardSection, QCard} from 'quasar';
import {useFQInject} from './FQComposables';

export type FQEndProps = {
  disableSave: boolean;
};

defineProps<FQEndProps>();
defineEmits<{
  (e: 'reset'): void;
  (e: 'save', mobile: boolean): void;
}>();

const {translationStrings} = useFQInject();
</script>
<template>
  <QCard
    class="fq-actions"
    flat
    bordered>
    <QCardSection class="text-body2 text-weight-medium text-center q-pb-none fq-end-text"> {{ translationStrings.end }} </QCardSection>
    <QCardActions
      class="fq-buttons"
      :align="'between'">
      <QBtn
        flat
        color="primary"
        @click="$emit('reset')">
        {{ translationStrings.reset }}
      </QBtn>
      <QBtn
        color="primary"
        :disable="disableSave"
        @click="$emit('save', $q.platform.is.mobile)">
        {{ translationStrings.save }}
      </QBtn>
    </QCardActions>
  </QCard>
</template>
