<template>
  <div
    :id="'fq-item-' + question.id"
    :class="'fq-item-' + question.type">
    <template v-if="question.type === QuestionnaireItemType.GROUP">
      <template v-if="alreadyInCard">
        <FQLabel :question="question" />
        <template v-if="question.subItems">
          <FQItem
            v-for="subItem of question.subItems.filter((q) => shouldBeRendered(q))"
            :key="subItem.id"
            :question="subItem"
            already-in-card>
          </FQItem>
        </template>
      </template>
      <template v-else>
        <QCard
          class="q-pb-md fq-item"
          :class="{'fq-error': checkInvalidity(question)}"
          flat
          bordered>
          <FQLabel :question="question" />
          <template v-if="question.subItems">
            <FQItem
              v-for="subItem of question.subItems.filter((q) => shouldBeRendered(q))"
              :key="subItem.id"
              :question="subItem"
              already-in-card>
            </FQItem>
          </template>
        </QCard>
      </template>
    </template>
    <template v-else-if="question.type === QuestionnaireItemType.DISPLAY">
      <QCard
        class="fq-item"
        flat
        bordered>
        <FQDisplay :question="question" />
      </QCard>
    </template>
    <template v-else>
      <template v-if="alreadyInCard">
        <FQLabel :question="question" />
        <FQAnswer
          :key="question.id"
          :question="question" />
      </template>
      <template v-else>
        <QCard
          class="q-pb-md fq-item"
          :class="{'fq-error': question.isInvalid}"
          flat
          bordered>
          <FQLabel :question="question" />
          <FQAnswer
            :key="question.id"
            :question="question" />
        </QCard>
      </template>
      <template v-if="question.subItems">
        <FQItem
          v-for="subItem of question.subItems.filter((q) => shouldBeRendered(q))"
          :key="subItem.id"
          :question="subItem"
          :already-in-card="alreadyInCard" />
      </template>
    </template>
  </div>
</template>
<script setup lang="ts">
import {QCard} from 'quasar';
import type {IQuestion} from '@i4mi/fhir_questionnaire';
import {ItemControlType} from '@i4mi/fhir_questionnaire';
import {QuestionnaireItemType} from '@i4mi/fhir_r4';
import FQAnswer from './FQAnswer.vue';
import FQDisplay from './controls/FQDisplay.vue';
import FQLabel from './FQLabel.vue';

export type FQMobileItemProps = {
  question: IQuestion;
  alreadyInCard?: boolean;
};

defineProps<FQMobileItemProps>();

function shouldBeRendered(question: IQuestion) {
  if (question.isEnabled) {
    if (question.options) {
      if (question.options.controlTypes.includes(ItemControlType.HELP_BUTTON)) return false;
      if (question.options.controlTypes.includes(ItemControlType.PROMPT)) return false;
      if (question.options.controlTypes.includes(ItemControlType.UNIT)) return false;
    }
    return true;
  } else {
    return false;
  }
}

function checkInvalidity(question: IQuestion) {
  if (question.isInvalid) {
    return true;
  } else if (question.subItems === undefined || question.subItems?.length === 0) {
    return false;
  }
  let isInvalid = false;
  question.subItems?.filter((q) => shouldBeRendered(q)).forEach((q) => (isInvalid = isInvalid || checkInvalidity(q)));
  return isInvalid;
}
</script>
<style scoped type="text/css">
.fq-error {
  border-color: #d01e06;
}
</style>
