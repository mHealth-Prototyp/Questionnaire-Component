<template>
  <QInput
    :id="question.id"
    :model-value="
      question.type === QuestionnaireItemType.INTEGER
        ? question.selectedAnswers.at(0)?.valueInteger?.toString() ?? ''
        : question.selectedAnswers.at(0)?.valueDecimal?.toString() ?? ''
    "
    class="fq-number"
    :for="question.id"
    type="number"
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

export type FQNumberInputProps = {
  question: IQuestion;
};

const props = defineProps<FQNumberInputProps>();
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
    props.question.type === QuestionnaireItemType.INTEGER ? (answer.code.valueInteger = parseInt(value)) : (answer.code.valueDecimal = parseFloat(value));
    onAnswer(props.question, answer);
  } else {
    onAnswer(props.question, undefined);
  }
}
</script>
<style scoped type="text/css"></style>
