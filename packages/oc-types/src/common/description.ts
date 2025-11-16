/**
 * Description types derived from the OpenCollection schema
 */

export interface StructuredText {
  content: string;
  type: string;
}

export type Description = StructuredText | string | null;
