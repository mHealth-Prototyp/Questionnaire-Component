<script setup lang="ts">
import type {IAnswerOption, IQuestion} from '@i4mi/fhir_questionnaire';
import {ItemControlType} from '@i4mi/fhir_questionnaire';
import {QCheckbox, QRadio, QSelect} from 'quasar';
import {useFQInject} from '../FQComposables';

export type FQChoiceProps = {
  question: IQuestion;
};

defineProps<FQChoiceProps>();
const {language, onAnswer, isSelected} = useFQInject();

function getValue(answerOption?: IAnswerOption) {
  if (!answerOption) return '';
  if (answerOption.code.valueCoding && answerOption.code.valueCoding.code) return answerOption.code.valueCoding.code;
  if (answerOption.code.valueDate) return answerOption.code.valueDate;
  if (answerOption.code.valueInteger) return answerOption.code.valueInteger.toString();
  if (answerOption.code.valueReference && answerOption.code.valueReference.reference) return answerOption.code.valueReference.reference;
  if (answerOption.code.valueString) return answerOption.code.valueString;
  if (answerOption.code.valueTime) return answerOption.code.valueTime;
  return '';
}
</script>
<template>
  <!-- CHECKBOXES -->
  <template v-if="question.options?.controlTypes?.find((x) => x === ItemControlType.CHECK_BOX)">
    <div
      v-for="(answer, i) in question.answerOptions"
      :key="question.id + '-' + i">
      <QCheckbox
        class="fq-choice fq-checkbox"
        :model-value="isSelected(question, answer)"
        :label="answer.answer[language]"
        @click="onAnswer(question, answer)" />
    </div>
  </template>
  <!-- RADIOS -->
  <template v-else-if="question.options?.controlTypes?.find((x) => x === ItemControlType.RADIO_BUTTON)">
    <div
      v-for="(answer, i) in question.answerOptions"
      :key="question.id + '-' + i">
      <QRadio
        class="fq-choice fq-radio"
        :model-value="isSelected(question, answer) ? getValue(answer) : ''"
        :val="getValue(answer)"
        :label="answer.answer[language]"
        @click="onAnswer(question, answer)" />
    </div>
  </template>
  <!-- DROP-DOWN -->
  <template v-else>
    <QSelect
      v-if="question.allowsMultipleAnswers"
      class="fq-choice fq-dropdown"
      multiple
      :model-value="question.answerOptions.filter((a) => isSelected(question, a)).map((a) => getValue(a))"
      :options="
        question.answerOptions.map((a) => {
          return {label: a.answer[language], value: getValue(a), answer: a};
        })
      "
      map-options
      outlined
      dense
      @add="(details) => onAnswer(question, details.value.answer)"
      @remove="(details) => onAnswer(question, details.value.answer)" />
    <QSelect
      v-else
      class="fq-choice fq-dropdown"
      :model-value="getValue(question.answerOptions.find((a) => isSelected(question, a)))"
      :options="
        question.answerOptions.map((a) => {
          return {label: a.answer[language], value: getValue(a), answer: a};
        })
      "
      map-options
      outlined
      dense
      @update:model-value="(value) => onAnswer(question, value.answer)" />
  </template>
</template>
