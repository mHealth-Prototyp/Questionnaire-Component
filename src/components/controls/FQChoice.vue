<script setup lang="ts">
import type {IAnswerOption, IQuestion} from '@i4mi/fhir_questionnaire';
import {ItemControlType} from '@i4mi/fhir_questionnaire';
import {QCheckbox, QIcon, QRadio, QSelect, QTooltip} from 'quasar';
import {ref} from 'vue';
import {useFQInject} from '../FQComposables';

export type FQChoiceProps = {
  question: IQuestion;
};

const props = defineProps<FQChoiceProps>();
const {language, onAnswer, isSelected} = useFQInject();
const help = ref(props.question.subItems?.filter((x) => x.options?.controlTypes?.find((y) => y === ItemControlType.HELP_BUTTON))?.at(0));

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
    <template v-if="help">
      <div class="fq-help">
        <QIcon
          name="fa-solid fa-circle-question"
          size="xs">
          <QTooltip>
            {{ help.label[language] }}
          </QTooltip>
        </QIcon>
      </div>
    </template>
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
    <template v-if="help">
      <div class="fq-help">
        <QIcon
          name="fa-solid fa-circle-question"
          size="xs">
          <QTooltip>
            {{ help.label[language] }}
          </QTooltip>
        </QIcon>
      </div>
    </template>
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
      @remove="(details) => onAnswer(question, details.value.answer)">
      <template
        v-if="help"
        #prepend>
        <QIcon
          class="cursor-pointer"
          name="fa-solid fa-circle-question"
          size="xs">
          <q-tooltip>
            {{ help?.label[language] }}
          </q-tooltip>
        </QIcon>
      </template>
    </QSelect>
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
      @update:model-value="(value) => onAnswer(question, value.answer)">
      <template
        v-if="help"
        #prepend>
        <QIcon
          class="cursor-pointer"
          name="fa-solid fa-circle-question"
          size="xs">
          <QTooltip>
            {{ help?.label[language] }}
          </QTooltip>
        </QIcon>
      </template>
    </QSelect>
  </template>
</template>
<style scoped>
.fq-help {
  color: rgba(0, 0, 0, 0.54);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
