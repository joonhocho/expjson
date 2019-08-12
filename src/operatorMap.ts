import { Expression, ExpressionCompiler, ExpressionEvaluator } from './ts';

export const OperatorMap: { [key: string]: 1 } = {};

export const evaluators: {
  [k in string]: ExpressionEvaluator<any, any>;
} = {} as any;

export const compilers: {
  [k in string]: ExpressionCompiler<any, any>;
} = {} as any;

export const registerOperator = <
  Op extends string,
  Expr extends Expression = Expression
>(
  operator: Op,
  evaluator: ExpressionEvaluator<Expr>,
  compiler: ExpressionCompiler<Expr>
): void => {
  OperatorMap[operator] = 1;
  evaluators[operator] = evaluator;
  compilers[operator] = compiler;
};
