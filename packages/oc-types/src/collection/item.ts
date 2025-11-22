/**
 * Collection items supported by the OpenCollection schema
 */

import type { Description } from '../common/description';
import type { Documentation } from '../common/documentation';
import type { RequestDefaults } from '../common/request-defaults';
import type { Tag } from '../common/tags';
import type { GraphQLRequest } from '../requests/graphql';
import type { GrpcRequest } from '../requests/grpc';
import type { HttpRequest } from '../requests/http';
import type { WebSocketRequest } from '../requests/websocket';

export interface Folder {
  type: 'folder';
  name?: string;
  description?: Description;
  seq?: number;
  items?: Item[];
  request?: RequestDefaults;
  docs?: Documentation;
  tags?: Tag[];
}

export interface Script {
  type: 'script';
  script?: string;
}

export type Item = HttpRequest | GraphQLRequest | GrpcRequest | WebSocketRequest | Folder | Script;
