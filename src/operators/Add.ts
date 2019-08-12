import { thunk } from '_src/common';
import { compileOperand } from '_src/compileExpression';
import { evaluateOperand } from '_src/evaluateExpression';
import { registerOperator } from '_src/operatorMap';
import { Expression } from '_src/ts';

export type Add = '+';
export const Add: Add = '+';

// tslint:disable-next-line interface-name
export interface AddExpression extends Expression {
  [0]: Add;
  [1]: number | Expression;
  [2]: number | Expression;
  [index: number]: Add | number | Expression;
}

registerOperator<Add, AddExpression>(
  Add,
  (exp, context) => {
    const len = exp.length;
    if (len < 2) {
      return NaN;
    }

    let sum: number;

    const v = evaluateOperand(exp[1], context);
    if (typeof v === 'number' && v === v) {
      sum = v;
    } else {
      return NaN;
    }

    for (let i = 2; i < len; i += 1) {
      const vi = evaluateOperand(exp[i], context);
      if (typeof vi === 'number' && vi === vi) {
        sum += vi;
      } else {
        return NaN;
      }
    }

    return sum;
  },
  (exp) => {
    const getters = exp.slice(1).map(compileOperand);

    if (getters.length === 0) {
      return thunk(NaN);
    }

    return (context): number => {
      let sum: number;

      const v = getters[0](context);
      if (typeof v === 'number' && v === v) {
        sum = v;
      } else {
        return NaN;
      }

      for (let i = 1, len = getters.length; i < len; i += 1) {
        const vi = getters[i](context);
        if (typeof vi === 'number' && vi === vi) {
          sum += vi;
        } else {
          return NaN;
        }
      }

      return sum;
    };
  }
);
