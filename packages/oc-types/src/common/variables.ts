/**
 * Variables and related value types defined in the schema
 */

import type { Description } from './description';

export type VariableValueType = 'string' | 'number' | 'boolean' | 'null' | 'object';

export interface VariableTypedValue {
  type: VariableValueType;
  data: string;
}

export type VariableValue = string | VariableTypedValue;

export interface VariableValueVariant {
  title: string;
  selected?: boolean;
  value: VariableValue;
}

export type VariableValueOrVariants = VariableValue | VariableValueVariant[];

export interface Variable {
  name: string;
  value?: VariableValueOrVariants;
  description?: Description;
  disabled?: boolean;
  transient?: boolean;
  default?: VariableValue;
}
