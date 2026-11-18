export interface WordEntry {
  letter: string;
  word: string;
  commonDefinition: string;
  legaleseDefinition: string;
  etymology: string;
  legalUsage: string;
  whyItMatters: string;
  lexQuote: string;
}

import { wordsAF } from "./words-a-f";
import { wordsGL } from "./words-g-l";
import { wordsMR } from "./words-m-r";
import { wordsSZ } from "./words-s-z";

export const wordDataset: Record<string, WordEntry[]> = {
  ...wordsAF,
  ...wordsGL,
  ...wordsMR,
  ...wordsSZ,
};
