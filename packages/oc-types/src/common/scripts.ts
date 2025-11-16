/**
 * Scripts executed throughout the collection lifecycle
 */

export interface Scripts {
  preRequest?: string;
  postResponse?: string;
  tests?: string;
  hooks?: string;
}
