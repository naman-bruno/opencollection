/**
 * Environment and collection-level configuration types
 */

import type { Description } from '../common/description';
import type { Variable } from '../common/variables';
import type { ClientCertificate } from './certificates';
import type { Protobuf } from './protobuf';
import type { Proxy } from './proxy';

export interface Environment {
  name: string;
  color?: string;
  description?: Description;
  variables?: Variable[];
  clientCertificates?: ClientCertificate[];
  extends?: string;
  dotEnvFilePath?: string;
}

export interface CollectionConfig {
  environments?: Environment[];
  protobuf?: Protobuf;
  proxy?: false | Proxy | 'inherit';
  clientCertificates?: ClientCertificate[];
}
