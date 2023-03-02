<script setup lang="ts">
import type {IQuestion} from '@i4mi/fhir_questionnaire';
import {ItemControlType} from '@i4mi/fhir_questionnaire';
import {QCardSection, QIcon, QTooltip} from 'quasar';
import {ref} from 'vue';
import {useFQInject} from './FQComposables';

export type FQLabelProps = {
  question: IQuestion;
};

const props = defineProps<FQLabelProps>();
const {language} = useFQInject();

const help = ref(props.question.subItems?.filter((x) => x.options?.controlTypes?.find((y) => y === ItemControlType.HELP_BUTTON))?.at(0));
</script>
<template>
  <QCardSection class="text-body2 text-weight-medium text-justify q-pb-none fq-flex-container">
    <QIcon
      v-if="help"
      class="q-mr-sm cursor-pointer fq-help"
      name="fa-solid fa-circle-question"
      size="xs">
      <QTooltip class="text-body2 fq-help-text">
        {{ help?.label[language] }}
      </QTooltip>
    </QIcon>
    <label
      class="fq-label"
      :class="{'fq-error-label': question.isInvalid}"
      :for="question.id">
      {{ (question.prefix ? question.prefix + ': ' : '') + question.label[language] + (question.required ? ' *' : '') }}
    </label>
  </QCardSection>
</template>
<style scoped type="text/css">
.fq-flex-container {
  display: flex;
}

.fq-error-label {
  color: red;
}
</style>
