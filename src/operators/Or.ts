import { thunk } from '_src/common';
import { compileOperand } from '_src/compileExpression';
import { evaluateOperand } from '_src/evaluateExpression';
import { registerOperator } from '_src/operatorMap';
import { Expression, Primitive } from '_src/ts';

export type Or = '||';
export const Or: Or = '||';

// tslint:disable-next-line interface-name
export interface OrExpression extends Expression {
  [0]: Or;
  [index: number]: Primitive | Expression;
}

registerOperator<Or, OrExpression>(
  Or,
  (exp, context) => {
    const len = exp.length;
    if (len < 2) {
      return false;
    }

    for (let i = 1; i < len; i += 1) {
      if (evaluateOperand(exp[i], context)) {
        return true;
      }
    }

    return false;
  },
  (exp) => {
    const getters = exp.slice(1).map(compileOperand);

    if (getters.length === 0) {
      return thunk(false);
    }

    return (context): boolean => {
      for (let i = 0, len = getters.length; i < len; i += 1) {
        if (getters[i](context)) {
          return true;
        }
      }
      return false;
    };
  }
);
