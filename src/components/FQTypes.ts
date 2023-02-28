import type {IAnswerOption, IQuestion} from '@i4mi/fhir_questionnaire';

export type FQProvided = {
  language: string;
  onAnswer: (q: IQuestion, a: IAnswerOption | undefined) => void;
  isSelected: (q: IQuestion, a: IAnswerOption) => boolean;
  translationStrings: TranslationStrings;
};

export type TranslationStrings = {
  save: string;
  reset: string;
  end: string;
  close: string;
};
