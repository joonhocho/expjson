import { compileOperand } from '_src/compileExpression';
import { evaluateOperand } from '_src/evaluateExpression';
import { registerOperator } from '_src/operatorMap';
import { Expression, Primitive } from '_src/ts';

export type Not = '!';
export const Not: Not = '!';

// tslint:disable-next-line interface-name
export interface NotExpression extends Expression {
  [0]: Not;
  [1]: Primitive | Expression;
  [2]: null;
  [index: number]: Not | Primitive | Expression | null;
}

registerOperator<Not, NotExpression>(
  Not,
  (exp, context) => !evaluateOperand(exp[1], context),
  (exp) => {
    const getV1 = compileOperand(exp[1]);
    return (context): boolean => !getV1(context);
  }
);
