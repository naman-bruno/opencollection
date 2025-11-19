/**
 * Info and Author types for collection metadata
 */

export interface Author {
  name?: string;
  email?: string;
  url?: string;
}

export interface Info {
  name?: string;
  summary?: string;
  version?: string;
  authors?: Author[];
}

