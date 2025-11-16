/**
 * gRPC request definitions
 */

import type { Auth } from '../common/auth';
import type { Description } from '../common/description';
import type { Assertion } from '../common/assertions';
import type { Scripts } from '../common/scripts';
import type { Variable } from '../common/variables';
import type { Tag } from '../common/tags';

export interface GrpcMetadata {
  name: string;
  value: string;
  description?: Description;
  disabled?: boolean;
}

export interface GrpcRequestMessage {
  description?: Description;
  message: string;
}

export type GrpcMessage = string;

export interface GrpcMessageVariant {
  title: string;
  selected?: boolean;
  message: GrpcMessage;
}

export type GrpcMessagePayload = GrpcMessage | GrpcMessageVariant[];

export type GrpcMethodType =
  | 'unary'
  | 'client-streaming'
  | 'server-streaming'
  | 'bidi-streaming';

export interface GrpcRequest {
  type: 'grpc';
  name?: string;
  description?: Description;
  url?: string;
  method?: string;
  methodType?: GrpcMethodType;
  protoFilePath?: string;
  metadata?: GrpcMetadata[];
  message?: GrpcMessagePayload;
  auth?: Auth;
  scripts?: Scripts;
  variables?: Variable[];
  assertions?: Assertion[];
  docs?: string;
  tags?: Tag[];
}
