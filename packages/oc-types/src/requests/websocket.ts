/**
 * WebSocket request definitions
 */

import type { Auth } from '../common/auth';
import type { Description } from '../common/description';
import type { Scripts } from '../common/scripts';
import type { Variable } from '../common/variables';
import type { Tag } from '../common/tags';
import type { HttpHeader } from './http';

export type WebSocketMessageType = 'text' | 'json' | 'xml' | 'binary';

export interface WebSocketMessage {
  type: WebSocketMessageType;
  data: string;
}

export interface WebSocketMessageVariant {
  title: string;
  selected?: boolean;
  message: WebSocketMessage;
}

export type WebSocketPayload = WebSocketMessage | WebSocketMessageVariant[];

export interface WebSocketRequest {
  name?: string;
  description?: Description;
  url?: string;
  headers?: HttpHeader[];
  message?: WebSocketPayload;
  auth?: Auth;
  scripts?: Scripts;
  variables?: Variable[];
  docs?: string;
  tags?: Tag[];
}
