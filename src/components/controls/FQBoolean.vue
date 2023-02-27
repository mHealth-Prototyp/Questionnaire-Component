<script setup lang="ts">
import type {IAnswerOption, IQuestion} from '@i4mi/fhir_questionnaire';
import {QToggle} from 'quasar';
import {useFQInject} from '../FQComposables';
export type FQBooleanProps = {
  question: IQuestion;
};

const props = defineProps<FQBooleanProps>();
const {language, onAnswer} = useFQInject();

function updateModel(value: boolean | undefined) {
  if (value !== undefined) {
    const answer: IAnswerOption = {
      answer: {},
      code: {}
    };
    answer.answer[language] = value.toString();
    answer.code.valueBoolean = value;
    onAnswer(props.question, answer);
  }
}
</script>
<template>
  <QToggle
    :model-value="question.selectedAnswers.at(0)?.valueBoolean"
    indeterminate-icon="fa-solid fa-question"
    checked-icon="fa-solid fa-check"
    unchecked-icon="fa-solid fa-xmark"
    color="green"
    :disable="question.readOnly"
    @update:model-value="updateModel" />
</template>
