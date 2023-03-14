<script setup lang="ts">
import {QBtn, QCard, QCardSection, QLinearProgress} from 'quasar';
import {computed, provide, ref} from 'vue';
import type {QuestionnaireData} from '@i4mi/fhir_questionnaire';
import {FQProvidedKey} from './FQKeys';
import FQItem from './FQItem.vue';
import VueMarkdown from 'vue-markdown-render';
import FQEnd from './FQEnd.vue';
import type {FQTranslationStrings} from './FQTypes';

export type FQRendererProps = {
  questionnaireData: QuestionnaireData;
  language: string;
  translationStrings: FQTranslationStrings;
  disableSave: boolean;
};

const props = defineProps<FQRendererProps>();
const emits = defineEmits<{
  (e: 'reset'): void;
  (e: 'save', mobile: boolean): void;
}>();

const index = ref(-1);
const progress = computed(() => (index.value + 1) / (props.questionnaireData.getQuestions().length + 1));

provide(FQProvidedKey, {
  language: props.language,
  onAnswer: props.questionnaireData.updateQuestionAnswers.bind(props.questionnaireData),
  isSelected: props.questionnaireData.isAnswerOptionSelected.bind(props.questionnaireData),
  translationStrings: props.translationStrings
});

function reset() {
  index.value = -1;
  emits('reset');
}

function save(mobile: boolean) {
  emits('save', mobile);
}

function next() {
  if (index.value === -1 || props.questionnaireData.isQuestionComplete(props.questionnaireData.getQuestions()[index.value])) {
    index.value++;
  }
}
</script>
<template>
  <template v-if="$q.platform.is.desktop">
    <div class="fq-desktop">
      <QCard
        class="fq-intro"
        flat
        bordered>
        <QCardSection class="text-body2 text-weight-medium text-center q-pb-none">
          {{ questionnaireData.getQuestionnaireTitle(language) }}
        </QCardSection>
        <QCardSection class="fq-description text-body2">
          <vue-markdown :source="questionnaireData.getQuestionnaireDescription(language) ?? ''" />
        </QCardSection>
      </QCard>
      <FQItem
        v-for="question in questionnaireData.getQuestions().filter((q) => q.isEnabled)"
        :key="question.id"
        :question="question" />
      <FQEnd
        :disable-save="disableSave"
        @reset="reset"
        @save="save" />
    </div>
  </template>
  <template v-else-if="$q.platform.is.mobile">
    <div class="fq-mobile">
      <div id="fq-mobile-content">
        <QCard
          v-if="index === -1"
          class="fq-intro"
          flat
          bordered>
          <QCardSection class="text-body2 text-weight-medium text-center q-pb-none">
            {{ questionnaireData.getQuestionnaireTitle(language) }}
          </QCardSection>
          <QCardSection class="fq-description text-body2">
            <vue-markdown :source="questionnaireData.getQuestionnaireDescription(language) ?? ''" />
          </QCardSection>
        </QCard>
        <FQItem
          v-if="index > -1 && index < questionnaireData.getQuestions().length"
          :question="questionnaireData.getQuestions()[index]" />
        <FQEnd
          v-if="index === questionnaireData.getQuestions().length"
          :disable-save="disableSave"
          @reset="reset"
          @save="save" />

        <div style="height: 60px"></div>
      </div>
      <div
        id="fq-mobile-bottom"
        class="fixed-bottom">
        <QBtn
          flat
          color="primary"
          icon="fa-solid fa-chevron-left"
          :disable="index === -1"
          @click="index--" />
        <QLinearProgress
          rounded
          size="20px"
          :value="progress"
          color="primary"
          class="q-mt-sm q-mr-md" />
        <QBtn
          flat
          color="primary"
          icon="fa-solid fa-chevron-right"
          :disable="index === questionnaireData.getQuestions().length"
          @click="next" />
      </div>
    </div>
  </template>
  <template v-else>
    {{ 'unsupported' }}
  </template>
</template>
<style scoped type="text/css">
#fq-mobile-bottom {
  background-color: #fff;
  padding: 15px;
  justify-content: space-between;
  display: flex;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}
</style>
