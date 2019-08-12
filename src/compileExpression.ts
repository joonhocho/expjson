import { isExpression } from './common';
import { compilers } from './operatorMap';
import './operators';
import { EvaluateExpression, ExecutionContext, Expression } from './ts';

export const compileOperand = (operand: unknown): EvaluateExpression =>
  isExpression(operand) ? compileExpression(operand) : (): unknown => operand;

export const compileExpression = <
  Context extends ExecutionContext = ExecutionContext
>(
  exp: Expression
): EvaluateExpression<Context> => compilers[exp[0]](exp);
