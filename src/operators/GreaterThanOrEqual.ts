import { compileOperand } from '_src/compileExpression';
import { evaluateOperand } from '_src/evaluateExpression';
import { registerOperator } from '_src/operatorMap';
import { Expression } from '_src/ts';

export type GreaterThanOrEqual = '>=';
export const GreaterThanOrEqual: GreaterThanOrEqual = '>=';

// tslint:disable-next-line interface-name
export interface GreaterThanOrEqualExpression extends Expression {
  [0]: GreaterThanOrEqual;
  [1]: number | Expression;
  [2]: number | Expression;
  [3]: null;
  [index: number]: GreaterThanOrEqual | number | Expression | null;
}

registerOperator<GreaterThanOrEqual, GreaterThanOrEqualExpression>(
  GreaterThanOrEqual,
  (exp, context) => {
    const v1 = evaluateOperand(exp[1], context);
    if (typeof v1 === 'number' && v1 === v1) {
      const v2 = evaluateOperand(exp[2], context);
      return typeof v2 === 'number' && v1 >= v2;
    }
    return false;
  },
  (exp) => {
    const getV1 = compileOperand(exp[1]);
    const getV2 = compileOperand(exp[2]);
    return (context): boolean => {
      const v1 = getV1(context);
      if (typeof v1 === 'number' && v1 === v1) {
        const v2 = getV2(context);
        return typeof v2 === 'number' && v1 >= v2;
      }
      return false;
    };
  }
);
