import { compileOperand } from '_src/compileExpression';
import { evaluateOperand } from '_src/evaluateExpression';
import { registerOperator } from '_src/operatorMap';
import { Expression, Primitive } from '_src/ts';

export type Equal = '==';
export const Equal: Equal = '==';

// tslint:disable-next-line interface-name
export interface EqualExpression extends Expression {
  [0]: Equal;
  [1]: Primitive | Expression;
  [2]: Primitive | Expression;
  [3]: null;
  [index: number]: Primitive | Expression;
}

registerOperator<Equal, EqualExpression>(
  Equal,
  (exp, context) =>
    evaluateOperand(exp[1], context) === evaluateOperand(exp[2], context),
  (exp) => {
    const getV1 = compileOperand(exp[1]);
    const getV2 = compileOperand(exp[2]);
    return (context): boolean => getV1(context) === getV2(context);
  }
);
