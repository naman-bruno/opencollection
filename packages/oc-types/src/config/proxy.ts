/**
 * Proxy configuration for HTTP and gRPC requests
 */

export interface ProxyAuth {
  username: string;
  password: string;
}

export type ProxyAuthConfig = false | ProxyAuth;

export interface Proxy {
  protocol: string;
  hostname: string;
  port: number;
  auth?: ProxyAuthConfig;
  bypassProxy?: string;
}
