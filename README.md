# I4MI FHIR-Questionnaire Renderer

This package provides a Quasar component that renders a FHIR-Questionnaire.

## Basic use

### Install

Before you can use this package in your Quasar project, you need to install it, using npm. Point your terminal to the root directory of your Quasar project (where also package.json is located) and enter the following command:

```bash
npm install @i4mi/fhir-questionnaire-renderer
```

You also need the following packages in your project (see `peerDependecies` in `package.json` for the version):

- `@i4mi/fhir_questionnaire`
- `@i4mi/fhir_r4`
- `quasar`
- `vue`

After the installation completed, you will be able to use the `FQRenderer` component.

### Setup

Here is a basic exemple with a FHIR-Questionnaire only in english. To see how to save and reset the QuestionnaireData see the [documentation](https://www.npmjs.com/package/@i4mi/fhir_questionnaire) from the `@i4mi/fhir_questionnaire` package.

```html
<script
  setup
  lang="ts">
  import {ref} from 'vue';
  import {Questionnaire} from '@i4mi/fhir_r4';
  import {QuestionnaireData} from '@i4mi/fhir_questionnaire';
  import {FQRenderer} from '@i4mi/fhir-questionnaire-renderer';

  const fhirQuestionnaire: Questionnaire = {
    /* some FHIR-Questionnaire */
  };
  // IMPORTANT!!! The QuestionnaireData should be wrapped in a ref.
  const questionnaireData = ref(new QuestionnaireData(fhirQuestionnaire, ['en']));

  function save() {
    // SEE to @i4mi/fhir_questionnaire documentation.
  }

  function reset() {
    // SEE to @i4mi/fhir_questionnaire documentation.
  }
</script>
<template>
  <FQRenderer
    :questionnaire-data="questionnaireData"
    language="en"
    :translation-strings="{/* TranslationStrings object */}"
    @save="save"
    @reset="reset" />
</template>
```

For a complete example within a Quasar project, see TODO: prototype 4 GitHub.

## Features
There is only a partial support for the question type to render, and also for the Help Button, Prompt and Unit DISPLAYs from the [questionnaire-item-control](https://www.hl7.org/fhir/valueset-questionnaire-item-control.html) value-set. Check-box and radio-button are also supported for the question with the CHOICE type and the corresponding extension.

| Type        | Can be rendered    | Help Button        | Prompt             | Unit               |
| ----------- | ------------------ | ------------------ | ------------------ | ------------------ |
| GROUP       | 🟩 supported       | 🟩 supported       | ⬜️ not applicable | ⬜️ not applicable |
| DISPLAY     | 🟩 supported       | 🟩 supported       | ⬜️ not applicable | ⬜️ not applicable |
| BOOLEAN     | 🟩 supported       | 🟩 supported       | ⬜️ not applicable | ⬜️ not applicable |
| DECIMAL     | 🟩 supported       | 🟩 supported       | 🟩 supported       | 🟩 supported       |
| INTEGER     | 🟩 supported       | 🟩 supported       | 🟩 supported       | 🟩 supported       |
| DATE        | 🟩 supported       | 🟩 supported       | 🟩 supported       | ⬜️ not applicable |
| DATETIME    | 🟩 supported       | 🟩 supported       | 🟩 supported       | ⬜️ not applicable |
| TIME        | 🟩 supported       | 🟩 supported       | 🟩 supported       | ⬜️ not applicable |
| STRING      | 🟩 supported       | 🟩 supported       | 🟩 supported       | 🟩 supported       |
| TEXT        | 🟩 supported       | 🟩 supported       | 🟩 supported       | 🟩 supported       |
| URL         | 🟩 supported       | 🟩 supported       | 🟩 supported       | ⬜️ not applicable |
| CHOICE      | 🟩 supported       | 🟩 supported       | ⬜️ not applicable | ⬜️ not applicable |
| OPEN_CHOICE | 🟥 not implemented | 🟥 not implemented | 🟥 not implemented | 🟥 not implemented |
| ATTACHMENT  | 🟥 not implemented | 🟥 not implemented | 🟥 not implemented | 🟥 not implemented |
| REFERENCE   | 🟥 not implemented | 🟥 not implemented | 🟥 not implemented | 🟥 not implemented |
| QUANTITY    | 🟥 not implemented | 🟥 not implemented | 🟥 not implemented | 🟥 not implemented |
