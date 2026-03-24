/**
 * OAuth 1.0 Authentication Types
 */

/**
 * OAuth 1.0 Authentication
 */
export interface AuthOAuth1 {
  type: 'oauth1';
  /** Consumer key (API key) */
  consumerKey?: string;
  /** Consumer secret (API secret) */
  consumerSecret?: string;
  /** Access token key */
  accessToken?: string;
  /** Access token secret */
  accessTokenSecret?: string;
  /** Callback URL for the Temporary Credentials Request (RFC 5849 §2.1). Use "oob" for out-of-band. */
  callbackUrl?: string;
  /** Verification code from the Resource Owner Authorization step (RFC 5849 §2.2). Required in Token Credentials Request (§2.3). */
  verifier?: string;
  /** Signature encoding */
  signatureEncoding?: 'HMAC-SHA1' | 'HMAC-SHA256' | 'HMAC-SHA512' | 'RSA-SHA1' | 'RSA-SHA256' | 'RSA-SHA512' | 'PLAINTEXT';
  /** Private key (PEM format, required for RSA-* methods). Use type 'text' for inline key, 'file' for file path. */
  privateKey?: { type: 'file' | 'text'; value: string };
  /** Custom timestamp (auto-generated if not provided) */
  timestamp?: string;
  /** Custom nonce (auto-generated if not provided) */
  nonce?: string;
  /** OAuth version (defaults to "1.0") */
  version?: string;
  /** Authentication realm */
  realm?: string;
  /** Where to add OAuth parameters */
  placement?: 'header' | 'query' | 'body';
  /** Whether to include a body hash in the signature */
  includeBodyHash?: boolean;
}
