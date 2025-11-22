/**
 * HTTP request types and shared authentication definitions
 */

import type { Auth } from '../common/auth';
import type { Description } from '../common/description';
import type { Assertion } from '../common/assertions';
import type { Scripts } from '../common/scripts';
import type { Variable } from '../common/variables';
import type { Tag } from '../common/tags';

export interface HttpHeader {
  name: string;
  value: string;
  description?: Description;
  disabled?: boolean;
}

export interface HttpRequestParam {
  name: string;
  value: string;
  description?: Description;
  type: 'query' | 'path';
  disabled?: boolean;
}

export interface RawBody {
  type: 'json' | 'text' | 'xml' | 'sparql';
  data: string;
}

export interface FormUrlEncodedEntry {
  name: string;
  value: string;
  description?: Description;
  disabled?: boolean;
}

export interface FormUrlEncodedBody {
  type: 'form-urlencoded';
  data: FormUrlEncodedEntry[];
}

export interface MultipartFormEntry {
  name: string;
  type: 'text' | 'file';
  value: string | string[];
  description?: Description;
  disabled?: boolean;
}

export interface MultipartFormBody {
  type: 'multipart-form';
  data: MultipartFormEntry[];
}

export interface FileBodyEntry {
  filePath: string;
  contentType: string;
  selected: boolean;
}

export interface FileBody {
  type: 'file';
  data: FileBodyEntry[];
}

export type HttpRequestBody = RawBody | FormUrlEncodedBody | MultipartFormBody | FileBody;

export interface HttpRequestBodyVariant {
  title: string;
  selected?: boolean;
  body: HttpRequestBody;
}

export interface HttpRequestSettings {
  encodeUrl?: boolean | 'inherit';
  timeout?: number | 'inherit';
  followRedirects?: boolean | 'inherit';
  maxRedirects?: number | 'inherit';
}

export interface HttpRequestExampleRequest {
  url?: string;
  method?: string;
  headers?: HttpHeader[];
  params?: HttpRequestParam[];
  body?: HttpRequestBody;
}

export interface HttpRequestExampleResponseBody {
  type: 'json' | 'text' | 'xml' | 'html' | 'binary';
  data: string;
}

export interface HttpRequestExampleResponse {
  status?: number;
  statusText?: string;
  headers?: HttpHeader[];
  body?: HttpRequestExampleResponseBody;
}

export interface HttpRequestExample {
  name?: string;
  description?: Description;
  request?: HttpRequestExampleRequest;
  response?: HttpRequestExampleResponse;
}

export interface HttpRequest {
  type: 'http';
  name?: string;
  description?: Description;
  seq?: number;
  url?: string;
  method?: string;
  params?: HttpRequestParam[];
  headers?: HttpHeader[];
  body?: HttpRequestBody | HttpRequestBodyVariant[];
  auth?: Auth;
  scripts?: Scripts;
  variables?: Variable[];
  assertions?: Assertion[];
  docs?: string;
  settings?: HttpRequestSettings;
  tags?: Tag[];
  examples?: HttpRequestExample[];
}

export type { Auth, AuthApiKey, AuthAwsV4, AuthBasic, AuthBearer, AuthDigest, AuthNTLM, AuthWsse } from '../common/auth';
