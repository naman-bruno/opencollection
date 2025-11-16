/**
 * Root OpenCollection types and collection-level defaults
 */

import type { Description } from './common/description';
import type { Documentation } from './common/documentation';
import type { RequestDefaults } from './common/request-defaults';
import type { CollectionConfig } from './config/environments';
import type { Item } from './collection/item';

export type Extensions = Record<string, unknown>;

export interface OpenCollection {
  name?: string;
  description?: Description;
  config?: CollectionConfig;
  items?: Item[];
  request?: RequestDefaults;
  docs?: Documentation;
  bundled?: boolean;
  extensions?: Extensions;
}
