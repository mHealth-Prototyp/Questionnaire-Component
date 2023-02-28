<script setup lang="ts">
import {QCardSection} from 'quasar';
import type {IQuestion} from '@i4mi/fhir_questionnaire';
import {QuestionnaireItemType} from '@i4mi/fhir_r4';
import FQChoice from './controls/FQChoice.vue';
import FQNumberInput from './controls/FQNumberInput.vue';
import FQTextInput from './controls/FQTextInput.vue';
import FQTimeInput from './controls/FQDateTimeInput.vue';
import FQBoolean from './controls/FQBoolean.vue';
import FQUrl from './controls/FQUrl.vue';

export type FQAnswerProps = {
  question: IQuestion;
};

defineProps<FQAnswerProps>();
</script>
<template>
  <QCardSection class="q-pb-none">
    <template v-if="question.type === QuestionnaireItemType.CHOICE">
      <FQChoice :question="question" />
    </template>
    <template v-if="question.type === QuestionnaireItemType.STRING || question.type === QuestionnaireItemType.TEXT">
      <FQTextInput :question="question" />
    </template>
    <template v-if="question.type === QuestionnaireItemType.INTEGER || question.type === QuestionnaireItemType.DECIMAL">
      <FQNumberInput :question="question" />
    </template>
    <template
      v-if="question.type === QuestionnaireItemType.DATE || question.type === QuestionnaireItemType.DATETIME || question.type === QuestionnaireItemType.TIME">
      <FQTimeInput :question="question" />
    </template>
    <template v-if="question.type === QuestionnaireItemType.BOOLEAN">
      <FQBoolean :question="question" />
    </template>
    <template v-if="question.type === QuestionnaireItemType.URL">
      <FQUrl :question="question" />
    </template>
    <!-- other controls can be added here -->
  </QCardSection>
</template>
<style scoped type="text/css"></style>
