import { isExpression } from '_src/common';
import { compileExpression, compileOperand } from '_src/compileExpression';
import { evaluateExpression, evaluateOperand } from '_src/evaluateExpression';
import { registerOperator } from '_src/operatorMap';
import { Expression, Primitive } from '_src/ts';

const { isArray } = Array;

export type In = 'In';
export const In: In = 'In';

// tslint:disable-next-line interface-name
export interface InExpression extends Expression {
  [0]: In;
  [1]: Primitive | Expression;
  [2]: Expression | Array<Primitive | Expression>;
  [3]: null;
  [index: number]:
    | In
    | Primitive
    | Expression
    | Array<Primitive | Expression>
    | null;
}

registerOperator<In, InExpression>(
  In,
  (exp, context) => {
    const v = evaluateOperand(exp[1], context);
    const candidates = exp[2];
    if (isExpression(candidates)) {
      // variable of array
      const vs = evaluateExpression(candidates, context);
      if (isArray(vs)) {
        for (let i = 0, len = vs.length; i < len; i += 1) {
          if (v === vs[i]) {
            return true;
          }
        }
      }
    } else {
      for (let i = 0, len = candidates.length; i < len; i += 1) {
        if (evaluateOperand(candidates[i], context) === v) {
          return true;
        }
      }
    }
    return false;
  },
  (exp) => {
    const getV = compileOperand(exp[1]);
    const candidates = exp[2];
    if (isExpression(candidates)) {
      // variable of array
      const getValues = compileExpression(candidates);
      return (context): boolean => {
        const v = getV(context);
        const vs = getValues(context);
        if (isArray(vs)) {
          for (let i = 0, len = vs.length; i < len; i += 1) {
            if (v === vs[i]) {
              return true;
            }
          }
        }
        return false;
      };
    }
    const getters = candidates.map(compileOperand);
    return (context): boolean => {
      const v = getV(context);
      for (let i = 0, len = getters.length; i < len; i += 1) {
        if (getters[i](context) === v) {
          return true;
        }
      }
      return false;
    };
  }
);
