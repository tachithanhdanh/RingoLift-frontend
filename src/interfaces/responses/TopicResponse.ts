// src/interfaces/TopicResponse.ts

import { BaseResponse } from "./BaseResponse";

export interface TopicResponse extends BaseResponse {
    id: number;
    name: string;
}
