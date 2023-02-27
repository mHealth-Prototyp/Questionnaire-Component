import {inject} from 'vue';
import {FQProvidedKey} from './FQKeys';
import type {FQProvided} from './FQTypes';

/**
 * Composable function to safely inject an FQProvided object.
 * @returns the injected values as an FQProvided.
 */
export function useFQInject(): FQProvided {
  const resolved = inject(FQProvidedKey);
  if (!resolved) {
    throw new Error(`${FQProvidedKey.toString()} was not provided.`);
  }

  return resolved;
}
