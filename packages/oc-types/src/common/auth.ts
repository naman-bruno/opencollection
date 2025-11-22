/**
 * Authentication configuration shared across request types
 */

import type { AuthOAuth2 } from './auth-oauth2';

// Re-export OAuth2 types for convenience
export type { AuthOAuth2 } from './auth-oauth2';
export type {
  OAuth2TokenPlacedInHeader,
  OAuth2TokenPlacedInQuery,
  OAuth2TokenPlacement,
  OAuth2TokenConfig,
  OAuth2Settings,
  OAuth2ClientCredentials,
  OAuth2ResourceOwner,
  OAuth2PKCE,
  OAuth2AdditionalParameter,
  OAuth2ClientCredentialsFlow,
  OAuth2ResourceOwnerPasswordFlow,
  OAuth2AuthorizationCodeFlow,
  OAuth2ImplicitFlow,
} from './auth-oauth2';

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
  | AuthApiKey
  | AuthOAuth2
  | 'inherit';
