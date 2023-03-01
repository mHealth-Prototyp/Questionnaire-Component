<script setup lang="ts">
import type {IAnswerOption, IQuestion} from '@i4mi/fhir_questionnaire';
import {QToggle} from 'quasar';
import {onUpdated} from 'vue';
import {useFQInject} from '../FQComposables';
export type FQBooleanProps = {
  question: IQuestion;
};

const props = defineProps<FQBooleanProps>();
const {language, onAnswer} = useFQInject();
setInitialValue();
onUpdated(() => {
  setInitialValue();
});


function setInitialValue() {
  if (props.question.selectedAnswers.length === 0) {
    if (props.question.initial && props.question.initial.length > 0) {
      updateModel(props.question.initial.at(0)?.valueBoolean);
    }
  }
}

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
    class="fq-boolean"
    :model-value="question.selectedAnswers.at(0)?.valueBoolean ?? question.initial?.at(0)?.valueBoolean"
    indeterminate-icon="fa-solid fa-question"
    checked-icon="fa-solid fa-check"
    unchecked-icon="fa-solid fa-xmark"
    color="green"
    :disable="question.readOnly"
    @update:model-value="updateModel" />
</template>
<style scoped type="text/css"></style>
