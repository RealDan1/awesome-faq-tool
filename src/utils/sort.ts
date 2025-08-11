import type { FaqData } from '../types/types';

export function sortByAlphabet(items: FaqData[]) {
  const sorted: FaqData[] = items.toSorted((a, b) => a.question.localeCompare(b.question));
  return sorted;
}
