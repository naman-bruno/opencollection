/**
 * OAuth 2.0 Authentication Types
 */

/**
 * OAuth 2.0 Token Placement - Header
 */
export interface OAuth2TokenPlacedInHeader {
  header: string;
}

/**
 * OAuth 2.0 Token Placement - Query
 */
export interface OAuth2TokenPlacedInQuery {
  query: string;
}

/**
 * OAuth 2.0 Token Placement
 */
export type OAuth2TokenPlacement = OAuth2TokenPlacedInHeader | OAuth2TokenPlacedInQuery;

/**
 * OAuth 2.0 Token Configuration
 */
export interface OAuth2TokenConfig {
  id?: string;
  placement?: OAuth2TokenPlacement;
}

/**
 * OAuth 2.0 Settings
 */
export interface OAuth2Settings {
  autoFetchToken?: boolean;
  autoRefreshToken?: boolean;
}

/**
 * OAuth 2.0 Client Credentials
 */
export interface OAuth2ClientCredentials {
  clientId?: string;
  clientSecret?: string;
  placement?: 'basic_auth_header' | 'body';
}

/**
 * OAuth 2.0 Resource Owner Credentials
 */
export interface OAuth2ResourceOwner {
  username?: string;
  password?: string;
}

/**
 * OAuth 2.0 PKCE Configuration
 */
export interface OAuth2PKCE {
  enabled?: boolean;
  method?: 'S256' | 'plain';
}

/**
 * OAuth 2.0 Additional Parameter
 */
export interface OAuth2AdditionalParameter {
  name?: string;
  value?: string;
  placement?: 'header' | 'query' | 'body';
}

/**
 * OAuth 2.0 Client Credentials Flow
 */
export interface OAuth2ClientCredentialsFlow {
  type: 'oauth2';
  flow: 'client_credentials';
  accessTokenUrl?: string;
  refreshTokenUrl?: string;
  credentials?: OAuth2ClientCredentials;
  scope?: string;
  additionalParameters?: {
    accessTokenRequest?: OAuth2AdditionalParameter[];
    refreshTokenRequest?: OAuth2AdditionalParameter[];
  };
  tokenConfig?: OAuth2TokenConfig;
  settings?: OAuth2Settings;
}

/**
 * OAuth 2.0 Resource Owner Password Flow
 */
export interface OAuth2ResourceOwnerPasswordFlow {
  type: 'oauth2';
  flow: 'resource_owner_password';
  accessTokenUrl?: string;
  refreshTokenUrl?: string;
  credentials?: OAuth2ClientCredentials;
  resourceOwner?: OAuth2ResourceOwner;
  scope?: string;
  additionalParameters?: {
    accessTokenRequest?: OAuth2AdditionalParameter[];
    refreshTokenRequest?: OAuth2AdditionalParameter[];
  };
  tokenConfig?: OAuth2TokenConfig;
  settings?: OAuth2Settings;
}

/**
 * OAuth 2.0 Authorization Code Flow
 */
export interface OAuth2AuthorizationCodeFlow {
  type: 'oauth2';
  flow: 'authorization_code';
  authorizationUrl?: string;
  accessTokenUrl?: string;
  refreshTokenUrl?: string;
  callbackUrl?: string;
  credentials?: OAuth2ClientCredentials;
  scope?: string;
  state?: string;
  pkce?: OAuth2PKCE;
  additionalParameters?: {
    authorizationRequest?: OAuth2AdditionalParameter[];
    accessTokenRequest?: OAuth2AdditionalParameter[];
    refreshTokenRequest?: OAuth2AdditionalParameter[];
  };
  tokenConfig?: OAuth2TokenConfig;
  settings?: OAuth2Settings;
}

/**
 * OAuth 2.0 Implicit Flow
 */
export interface OAuth2ImplicitFlow {
  type: 'oauth2';
  flow: 'implicit';
  authorizationUrl?: string;
  callbackUrl?: string;
  credentials?: {
    clientId?: string;
  };
  scope?: string;
  state?: string;
  additionalParameters?: {
    authorizationRequest?: OAuth2AdditionalParameter[];
  };
  tokenConfig?: OAuth2TokenConfig;
  settings?: OAuth2Settings;
}

/**
 * OAuth 2.0 Authentication (all flows)
 */
export type AuthOAuth2 =
  | OAuth2ClientCredentialsFlow
  | OAuth2ResourceOwnerPasswordFlow
  | OAuth2AuthorizationCodeFlow
  | OAuth2ImplicitFlow;

