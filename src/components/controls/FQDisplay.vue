<script setup lang="ts">
import type {IQuestion} from '@i4mi/fhir_questionnaire';
import {QCardSection} from 'quasar';
import {useFQInject} from '../FQComposables';

export type FQDisplayProps = {
  question: IQuestion;
};

defineProps<FQDisplayProps>();
const {language} = useFQInject();
</script>
<template>
  <QCardSection class="text-body2 text-justify">
    <label class="fq-display">
      {{ (question.prefix ? question.prefix + ': ' : '') + question.label[language] }}
    </label>
  </QCardSection>
</template>
<style scoped></style>
