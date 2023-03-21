<template>
  <QInput
    :id="question.id"
    :model-value="question.selectedAnswers.at(0)?.valueString ?? ''"
    class="fq-text"
    :for="question.id"
    :type="question.type === QuestionnaireItemType.TEXT ? 'textarea' : 'text'"
    outlined
    dense
    :readonly="question.readOnly"
    :label="prompt?.label[language]"
    :suffix="unit?.label[language]"
    @update:model-value="updateModel" />
</template>
<script setup lang="ts">
import type {IAnswerOption, IQuestion} from '@i4mi/fhir_questionnaire';
import {ItemControlType} from '@i4mi/fhir_questionnaire';
import {QuestionnaireItemType} from '@i4mi/fhir_r4';
import {QInput} from 'quasar';
import {ref} from 'vue';
import {useFQInject} from '../FQComposables';

export type FQTextInputProps = {
  question: IQuestion;
};

const props = defineProps<FQTextInputProps>();
const {language, onAnswer} = useFQInject();

const prompt = ref(props.question.subItems?.filter((x) => x.options?.controlTypes?.find((y) => y === ItemControlType.PROMPT))?.at(0));
const unit = ref(props.question.subItems?.filter((x) => x.options?.controlTypes?.find((y) => y === ItemControlType.UNIT))?.at(0));

function updateModel(value: string | number | null) {
  if (typeof value === 'string' && value !== '') {
    const answer: IAnswerOption = {
      answer: {},
      code: {}
    };
    answer.answer[language] = value;
    answer.code.valueString = value;
    onAnswer(props.question, answer);
  } else {
    onAnswer(props.question, undefined);
  }
}
</script>
