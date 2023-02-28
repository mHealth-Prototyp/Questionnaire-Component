<template>
  <QInput
    :id="question.id"
    :model-value="format(getAnswerTimestamp(question.selectedAnswers.at(0)))"
    class="fq-time"
    :for="question.id"
    outlined
    dense
    readonly>
    <template
      v-if="(!question.readOnly && question.type === QuestionnaireItemType.DATE) || question.type === QuestionnaireItemType.DATETIME"
      #prepend>
      <QIcon
        name="fa-solid fa-calendar"
        class="cursor-pointer">
        <QPopupProxy
          cover
          transition-show="scale"
          transition-hide="scale">
          <QDate
            :model-value="getAnswerTimestamp(question.selectedAnswers.at(0))"
            mask="x"
            @update:model-value="updateModel">
            <div class="row items-center justify-end">
              <QBtn
                v-close-popup
                label="TODO: close"
                color="primary"
                flat />
            </div>
          </QDate>
        </QPopupProxy>
      </QIcon>
    </template>

    <template
      v-if="(!question.readOnly && question.type === QuestionnaireItemType.TIME) || question.type === QuestionnaireItemType.DATETIME"
      #append>
      <QIcon
        name="fa-solid fa-clock"
        class="cursor-pointer">
        <QPopupProxy
          cover
          transition-show="scale"
          transition-hide="scale">
          <QTime
            :model-value="getAnswerTimestamp(question.selectedAnswers.at(0))"
            mask="x"
            format24h
            with-seconds
            @update:model-value="updateModel">
            <div class="row items-center justify-end">
              <QBtn
                v-close-popup
                label="TODO: close"
                color="primary"
                flat />
            </div>
          </QTime>
        </QPopupProxy>
      </QIcon>
    </template>
  </QInput>
</template>
<script setup lang="ts">
import type {IAnswerOption, IQuestion} from '@i4mi/fhir_questionnaire';
import type {QuestionnaireResponseItemAnswer} from '@i4mi/fhir_r4';
import {QuestionnaireItemType} from '@i4mi/fhir_r4';
import {date, QBtn, QDate, QIcon, QInput, QPopupProxy, QTime} from 'quasar';
import {useFQInject} from '../FQComposables';

export type FQDateTimeInputProps = {
  question: IQuestion;
};

const props = defineProps<FQDateTimeInputProps>();
const {language, onAnswer} = useFQInject();

function updateModel(value: string | null) {
  if (typeof value === 'string') {
    const answer: IAnswerOption = {
      answer: {},
      code: {}
    };
    switch (props.question.type) {
      case QuestionnaireItemType.DATE:
        answer.code.valueDate = formatDate(parseInt(value));
        answer.answer[language] = answer.code.valueDate;
        break;
      case QuestionnaireItemType.TIME:
        answer.code.valueTime = formatTime(parseInt(value));
        answer.answer[language] = answer.code.valueTime;
        break;
      case QuestionnaireItemType.DATETIME:
        answer.code.valueDateTime = formatDateTime(parseInt(value));
        answer.answer[language] = answer.code.valueDateTime;
        break;
    }
    onAnswer(props.question, answer);
  } else {
    onAnswer(props.question, undefined);
  }
}

function getAnswerTimestamp(answer: QuestionnaireResponseItemAnswer | undefined) {
  let timestamp: number | null = null;
  if (answer) {
    switch (props.question.type) {
      case QuestionnaireItemType.DATE:
        if (answer.valueDate) {
          timestamp = new Date(answer.valueDate).getTime();
        }
        break;
      case QuestionnaireItemType.TIME:
        if (answer.valueTime) {
          const hms = answer.valueTime.split(':');
          const d = new Date();
          d.setHours(parseInt(hms[0]));
          d.setMinutes(parseInt(hms[1]));
          d.setSeconds(parseInt(hms[2]));
          timestamp = d.getTime();
        }
        break;
      case QuestionnaireItemType.DATETIME:
        if (answer.valueDateTime) {
          timestamp = new Date(answer.valueDateTime).getTime();
        }
        break;
    }
  }
  return timestamp?.toString() ?? '';
}

function format(stringTimestamp: string) {
  if (stringTimestamp !== '') {
    switch (props.question.type) {
      case QuestionnaireItemType.DATE:
        return formatDate(parseInt(stringTimestamp));
      case QuestionnaireItemType.TIME:
        return formatTime(parseInt(stringTimestamp));
      case QuestionnaireItemType.DATETIME:
        return formatDateTime(parseInt(stringTimestamp));
    }
  }
  return '';
}

function formatDate(timestamp: number) {
  return date.formatDate(timestamp, 'YYYY-MM-DD');
}

function formatTime(timestamp: number) {
  return date.formatDate(timestamp, 'HH:mm:ss');
}

function formatDateTime(timestamp: number) {
  return date.formatDate(timestamp, 'YYYY-MM-DDTHH:mm:ssZ');
}
</script>
<style scoped type="text/css"></style>
