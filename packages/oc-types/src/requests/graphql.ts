/**
 * GraphQL request definitions
 */

import type { Auth } from '../common/auth';
import type { Description } from '../common/description';
import type { Assertion } from '../common/assertions';
import type { Scripts } from '../common/scripts';
import type { Variable } from '../common/variables';
import type { Tag } from '../common/tags';
import type { HttpHeader, HttpRequestParam } from './http';

export interface GraphQLBody {
  query?: string;
  variables?: string;
}

export interface GraphQLBodyVariant {
  title: string;
  selected?: boolean;
  body: GraphQLBody;
}

export interface GraphQLRequestSettings {
  encodeUrl?: boolean | 'inherit';
  timeout?: number;
  followRedirects?: boolean | 'inherit';
  maxRedirects?: number | 'inherit';
}

export interface GraphQLRequest {
  type: 'graphql';
  name?: string;
  description?: Description;
  seq?: number;
  url?: string;
  method?: string;
  params?: HttpRequestParam[];
  headers?: HttpHeader[];
  body?: GraphQLBody | GraphQLBodyVariant[];
  auth?: Auth;
  scripts?: Scripts;
  variables?: Variable[];
  assertions?: Assertion[];
  docs?: string;
  settings?: GraphQLRequestSettings;
  tags?: Tag[];
}
