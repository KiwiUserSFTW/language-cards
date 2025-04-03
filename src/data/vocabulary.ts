export type cardsDataType = {
  [key: string]: string;
};
export type vocabularyType = {
  [key: string]: cardsDataType;
};

let vocabulary: vocabularyType = {
  "init-vocabulary": {
    apple: "яблуко",
    banana: "банан",
    potato: "картопля",
    tomato: "помідор",
    cucumber: "огірок",
    carrot: "морква",
    grape: "виноград",
    lemon: "лимон",
    watermelon: "кавун",
    strawberry: "полуниця",
    cherry: "вишня",
    onion: "цибуля",
    garlic: "часник",
    pear: "груша",
    peach: "персик",
    pumpkin: "гарбуз",
    orange: "апельсин",
    cabbage: "капуста",
    pepper: "перець",
    raspberry: "малина",
    blueberry: "чорниця",
    melon: "диня",
  },
};

// Vocabulary database actions
export const addVocabulary = (key: string, value: cardsDataType) => {
  if (vocabulary[key]) {
    console.error(`Vocabulary with key "${key}" already exists.`);
    return;
  }
  vocabulary = { ...vocabulary, [key]: value };
};
// TODO create error Messages file
export const deleteVocabulary = (key: string) => {
  if (!vocabulary[key]) {
    console.error(`Vocabulary with key "${key}" does not exist.`);
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [key]: _deleted, ...newVocabulary } = vocabulary;
  vocabulary = newVocabulary;
};

export const getVocabulary = (key: string) => {
  if (!vocabulary[key]) {
    console.error(`Vocabulary with key "${key}" does not exist.`);
    return;
  }
  return vocabulary[key];
};
// Vocabulary value actions
export const addVocabularyValue = (
  vocabularyKey: string,
  key: string,
  value: string
) => {
  if (!vocabulary[vocabularyKey]) {
    console.error(`Vocabulary with key "${key}" does not exist.`);
    return;
  }
  if (vocabulary[vocabularyKey][key]) {
    console.error(
      `Vocabulary with key "${key}" already exists in vocabulary "${vocabularyKey}.`
    );
    return;
  }
  vocabulary[vocabularyKey] = { ...vocabulary[vocabularyKey], [key]: value };
};

export const deleteVocabularyValue = (vocabularyKey: string, key: string) => {
  if (!vocabulary[vocabularyKey]) {
    console.error(`Vocabulary with key "${key}" does not exist.`);
    return;
  }
  if (!vocabulary[vocabularyKey][key]) {
    console.error(
      `Vocabulary with key "${key}" does not exists in vocabulary "${vocabularyKey}.`
    );
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [key]: _deleted, ...newVocabulary } = vocabulary[vocabularyKey];
  vocabulary[vocabularyKey] = newVocabulary;
};
