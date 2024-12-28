// src/models/Word.ts

import { PartOfSpeechResponse } from '../responses/PartOfSpeechResponse';

export interface Word {
    id: number;
    word: string;
    meaning: string;
    topic?: string;
    partOfSpeech?: PartOfSpeechResponse;
    pronunciation?: string;
    audioUrl?: string;
    exampleSentence?: string;
}
