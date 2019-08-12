import { SetOperand } from './setOperand';

export type Primitive = null | boolean | number | string;

export type Value = Primitive | Primitive[];

// tslint:disable-next-line interface-name
export interface Expression
  extends Array<
    Value | Expression | Array<Primitive | Expression> | SetOperand
  > {
  [0]: string; // operator
}

export type ValueOrExpression = Value | Expression;

// tslint:disable-next-line interface-name
export interface ExecutionContext {
  [key: string]: any;
}

export type ExpressionEvaluator<
  Expr extends Expression = Expression,
  Context extends ExecutionContext = ExecutionContext,
  Val = unknown
> = (exp: Expr, context: Context) => Val;

export type EvaluateExpression<
  Context extends ExecutionContext = ExecutionContext,
  Val = unknown
> = (context: Context) => Val;

export type ExpressionCompiler<
  Expr extends Expression = Expression,
  Context extends ExecutionContext = ExecutionContext
> = (exp: Expr) => EvaluateExpression<Context>;
