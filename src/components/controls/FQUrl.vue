<template>
  <QInput
    :id="question.id"
    :model-value="question.selectedAnswers.at(0)?.valueUri ?? ''"
    class="fq-text"
    :for="question.id"
    type="url"
    outlined
    dense
    :readonly="question.readOnly"
    :label="prompt?.label[language]"
    :suffix="unit?.label[language]"
    :rule="[(value: string) => regex.test(value) || 'errorMessage']"
    @update:model-value="updateModel" />
</template>
<script setup lang="ts">
import type {IAnswerOption, IQuestion} from '@i4mi/fhir_questionnaire';
import {ItemControlType} from '@i4mi/fhir_questionnaire';
import {QInput} from 'quasar';
import {ref} from 'vue';
import {useFQInject} from '../FQComposables';

export type FQUrlProps = {
  question: IQuestion;
};

const props = defineProps<FQUrlProps>();
const {language, onAnswer} = useFQInject();

const prompt = ref(props.question.subItems?.filter((x) => x.options?.controlTypes?.find((y) => y === ItemControlType.PROMPT))?.at(0));
const unit = ref(props.question.subItems?.filter((x) => x.options?.controlTypes?.find((y) => y === ItemControlType.UNIT))?.at(0));

const regex = /^(https:|http:|www\.)\S*/gm;

function updateModel(value: string | number | null) {
  if (typeof value === 'string' && value !== '' && regex.test(value)) {
    const answer: IAnswerOption = {
      answer: {},
      code: {}
    };
    answer.answer[language] = value;
    answer.code.valueUri = value;
    onAnswer(props.question, answer);
  } else {
    onAnswer(props.question, undefined);
  }
}
</script>
<style scoped></style>
