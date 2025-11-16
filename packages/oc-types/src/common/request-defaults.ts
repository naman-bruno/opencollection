/**
 * Shared request defaults applied at collection and folder level
 */

import type { Auth } from './auth';
import type { Scripts } from './scripts';
import type { Variable } from './variables';
import type { HttpHeader, HttpRequestSettings } from '../requests/http';
import type { GraphQLRequestSettings } from '../requests/graphql';
import type { GrpcMetadata } from '../requests/grpc';

export interface RequestSettings {
  http?: HttpRequestSettings;
  graphql?: GraphQLRequestSettings;
}

export interface RequestDefaults {
  headers?: HttpHeader[];
  metadata?: GrpcMetadata[];
  auth?: Auth;
  variables?: Variable[];
  scripts?: Scripts;
  settings?: RequestSettings;
}
