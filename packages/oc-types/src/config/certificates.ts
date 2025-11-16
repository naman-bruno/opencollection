/**
 * Client certificate configuration types
 */

export interface PemCertificate {
  domain: string;
  type: 'pem';
  certificateFilePath: string;
  privateKeyFilePath: string;
  passphrase?: string;
}

export interface Pkcs12Certificate {
  domain: string;
  type: 'pkcs12';
  pkcs12FilePath: string;
  passphrase?: string;
}

export type ClientCertificate = PemCertificate | Pkcs12Certificate;
