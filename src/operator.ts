import { Add } from './operators/Add';
import { And } from './operators/And';
import { BitwiseAnd } from './operators/BitwiseAnd';
import { BitwiseOr } from './operators/BitwiseOr';
import { Divide } from './operators/Divide';
import { Equal } from './operators/Equal';
import { GreaterThan } from './operators/GreaterThan';
import { GreaterThanOrEqual } from './operators/GreaterThanOrEqual';
import { IfThenElse } from './operators/IfThenElse';
import { In } from './operators/In';
import { LessThan } from './operators/LessThan';
import { LessThanOrEqual } from './operators/LessThanOrEqual';
import { Modulo } from './operators/Modulo';
import { Multiply } from './operators/Multiply';
import { Not } from './operators/Not';
import { NotEqual } from './operators/NotEqual';
import { NotIn } from './operators/NotIn';
import { Or } from './operators/Or';
import { SetIsEqual } from './operators/SetIsEqual';
import { SetIsIntersecting } from './operators/SetIsIntersecting';
import { SetIsNonEmptySubset } from './operators/SetIsNonEmptySubset';
import { SetIsNonEmptySuperset } from './operators/SetIsNonEmptySuperset';
import { SetRelation } from './operators/SetRelation';
import { Subtract } from './operators/Subtract';
import { Var } from './operators/Var';

export type Operator =
  // Variable
  | Var
  // Relational
  | Equal
  | NotEqual
  | GreaterThan
  | GreaterThanOrEqual
  | LessThan
  | LessThanOrEqual
  // Arithmetic
  | Add
  | Subtract
  | Multiply
  | Divide
  | Modulo
  // Bitwise
  | BitwiseAnd
  | BitwiseOr
  // Logical
  | Not
  | And
  | Or
  // Conditional
  | IfThenElse
  // Set
  | In
  | NotIn
  // Set Relations
  | SetIsIntersecting
  | SetIsNonEmptySubset
  | SetIsNonEmptySuperset
  | SetIsEqual
  | SetRelation;
