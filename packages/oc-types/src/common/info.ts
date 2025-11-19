/**
 * Info and Link types for collection metadata
 */

export interface Link {
  name: string;
  url: string;
}

export interface Info {
  name?: string;
  summary?: string;
  version?: string;
  links?: Link[];
}

