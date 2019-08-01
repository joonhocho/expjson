import {
  Add,
  And,
  Divide,
  Equal,
  GreaterThan,
  GreaterThanOrEqual,
  IfThenElse,
  In,
  LessThan,
  LessThanOrEqual,
  Modulo,
  Multiply,
  Not,
  NotEqual,
  NotIn,
  Or,
  Subtract,
  Var,
} from './operator';

export type Value =
  | null
  | boolean
  | number
  | string
  | Array<null | boolean | number | string>;

export type Expression1 =
  // Relational
  | [Equal, Value, Value]
  | [NotEqual, Value, Value]
  | [GreaterThan, Value, Value]
  | [GreaterThanOrEqual, Value, Value]
  | [LessThan, Value, Value]
  | [LessThanOrEqual, Value, Value]
  // Arithmetic
  | [Add, Value, Value]
  | [Subtract, Value, Value]
  | [Multiply, Value, Value]
  | [Divide, Value, Value]
  | [Modulo, Value, Value]
  // Logical
  | [Not, Value]
  | [And, ...Value[]]
  | [Or, ...Value[]]
  // Conditional
  | [IfThenElse, Value, Value, Value]
  // Set
  | [In, Value, Value[]]
  | [NotIn, Value, Value[]]
  // Value
  | [Var, string];

export type Value2 = Value | Expression1;

export type Expression2 =
  // Relational
  | [Equal, Value2, Value2]
  | [NotEqual, Value2, Value2]
  | [GreaterThan, Value2, Value2]
  | [GreaterThanOrEqual, Value2, Value2]
  | [LessThan, Value2, Value2]
  | [LessThanOrEqual, Value2, Value2]
  // Arithmetic
  | [Add, Value2, Value2]
  | [Subtract, Value2, Value2]
  | [Multiply, Value2, Value2]
  | [Divide, Value2, Value2]
  | [Modulo, Value2, Value2]
  // Logical
  | [Not, Value2]
  | [And, ...Value2[]]
  | [Or, ...Value2[]]
  // Conditional
  | [IfThenElse, Value2, Value2, Value2]
  // Set
  | [In, Value2, Value2[]]
  | [NotIn, Value2, Value2[]]
  // Value
  | [Var, string];

export type Value3 = Value | Expression1 | Value2 | Expression2;

export type Expression3 =
  // Relational
  | [Equal, Value3, Value3]
  | [NotEqual, Value3, Value3]
  | [GreaterThan, Value3, Value3]
  | [GreaterThanOrEqual, Value3, Value3]
  | [LessThan, Value3, Value3]
  | [LessThanOrEqual, Value3, Value3]
  // Arithmetic
  | [Add, Value3, Value3]
  | [Subtract, Value3, Value3]
  | [Multiply, Value3, Value3]
  | [Divide, Value3, Value3]
  | [Modulo, Value3, Value3]
  // Logical
  | [Not, Value3]
  | [And, ...Value3[]]
  | [Or, ...Value3[]]
  // Conditional
  | [IfThenElse, Value3, Value3, Value3]
  // Set
  | [In, Value3, Value3[]]
  | [NotIn, Value3, Value3[]]
  // Value
  | [Var, string];

export type Value4 =
  | Value
  | Expression1
  | Value2
  | Expression2
  | Value3
  | Expression3;

export type Expression =
  // Relational
  | [Equal, Value4, Value4]
  | [NotEqual, Value4, Value4]
  | [GreaterThan, Value4, Value4]
  | [GreaterThanOrEqual, Value4, Value4]
  | [LessThan, Value4, Value4]
  | [LessThanOrEqual, Value4, Value4]
  // Arithmetic
  | [Add, Value4, Value4]
  | [Subtract, Value4, Value4]
  | [Multiply, Value4, Value4]
  | [Divide, Value4, Value4]
  | [Modulo, Value4, Value4]
  // Logical
  | [Not, Value4]
  | [And, ...Value4[]]
  | [Or, ...Value4[]]
  // Conditional
  | [IfThenElse, Value4, Value4, Value4]
  // Set
  | [In, Value4, Value4[]]
  | [NotIn, Value4, Value4[]]
  // Value
  | [Var, string];

// tslint:disable-next-line interface-name
export interface ExecutionContext {
  [key: string]: Value;
}
