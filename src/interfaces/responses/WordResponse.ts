import { BaseResponse } from "./BaseResponse";
import { PartOfSpeechResponse } from "./PartOfSpeechResponse";

export interface WordResponse extends BaseResponse {
  id: number;
  word: string;
  meaning: string;
  topic?: string;
  partOfSpeech?: PartOfSpeechResponse;
  pronunciation?: string;
  audioUrl?: string;
  exampleSentence?: string;
}
