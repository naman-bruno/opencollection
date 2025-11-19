/**
 * Assertions for validating collection responses
 */

import type { Description } from './description';

export interface Assertion {
  expression: string;
  operator: string;
  value: string;
  disabled?: boolean;
  description?: Description;
}
