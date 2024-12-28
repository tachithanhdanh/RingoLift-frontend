export interface WordRequest {
    word: string;
    meaning: string;
    topic?: string;
    partOfSpeechId?: number;
    pronunciation?: string;
    audioUrl?: string;
    exampleSentence?: string;
  }
  