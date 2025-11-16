/**
 * Authentication configuration shared across request types
 */

export interface AuthAwsV4 {
  type: 'awsv4';
  accessKeyId?: string;
  secretAccessKey?: string;
  sessionToken?: string;
  service?: string;
  region?: string;
  profileName?: string;
}

export interface AuthBasic {
  type: 'basic';
  username?: string;
  password?: string;
}

export interface AuthWsse {
  type: 'wsse';
  username?: string;
  password?: string;
}

export interface AuthBearer {
  type: 'bearer';
  token?: string;
}

export interface AuthDigest {
  type: 'digest';
  username?: string;
  password?: string;
}

export interface AuthNTLM {
  type: 'ntlm';
  username?: string;
  password?: string;
  domain?: string;
}

export interface AuthApiKey {
  type: 'apikey';
  key?: string;
  value?: string;
  placement?: 'header' | 'query';
}

export type Auth =
  | AuthAwsV4
  | AuthBasic
  | AuthWsse
  | AuthBearer
  | AuthDigest
  | AuthNTLM
  | AuthApiKey;
