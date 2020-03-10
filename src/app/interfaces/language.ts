export interface Language {
  value: string;
  display: string;
  flag?: string;
}

export const LANGUAGES: Language[] = [
  { value: 'vi', display: 'Vietnamese', flag: 'vietnam' },
  { value: 'en', display: 'English', flag: 'usa' },
  { value: 'ja', display: 'Japanese', flag: 'japan' },
];
