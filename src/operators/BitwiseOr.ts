import { thunk } from '_src/common';
import { compileOperand } from '_src/compileExpression';
import { evaluateOperand } from '_src/evaluateExpression';
import { registerOperator } from '_src/operatorMap';
import { Expression } from '_src/ts';

export type BitwiseOr = 'b|';
export const BitwiseOr: BitwiseOr = 'b|';

// tslint:disable-next-line interface-name
export interface BitwiseOrExpression extends Expression {
  [0]: BitwiseOr;
  [1]: number | Expression;
  [2]: number | Expression;
  [index: number]: BitwiseOr | number | Expression;
}

registerOperator<BitwiseOr, BitwiseOrExpression>(
  BitwiseOr,
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
        sum |= vi; // tslint:disable-line no-bitwise
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
          sum |= vi; // tslint:disable-line no-bitwise
        } else {
          return NaN;
        }
      }

      return sum;
    };
  }
);
