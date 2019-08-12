import { isExpression } from '_src/common';
import { compileExpression } from '_src/compileExpression';
import { evaluateExpression, evaluateOperand } from '_src/evaluateExpression';
import { registerOperator } from '_src/operatorMap';
import { Expression, Primitive } from '_src/ts';
import { In } from './In';

const { isArray } = Array;

export type NotIn = '!In';
export const NotIn: NotIn = '!In';

// tslint:disable-next-line interface-name
export interface NotInExpression extends Expression {
  [0]: NotIn;
  [1]: Primitive | Expression;
  [2]: Primitive[] | Expression;
  [3]: null;
  [index: number]: NotIn | Primitive | Primitive[] | Expression | null;
}

registerOperator<NotIn, NotInExpression>(
  NotIn,
  (exp, context) => {
    const v = evaluateOperand(exp[1], context);
    const exps = exp[2];
    if (isExpression(exps)) {
      // variable of array
      const vs = evaluateExpression(exps, context);
      if (isArray(vs)) {
        for (let i = 0, len = vs.length; i < len; i += 1) {
          if (v === vs[i]) {
            return false;
          }
        }
      }
    } else {
      for (let i = 0, len = exps.length; i < len; i += 1) {
        if (evaluateOperand(exps[i], context) === v) {
          return false;
        }
      }
    }
    return true;
  },
  (exp) => {
    // NotIn === !In
    const newExp = exp.slice();
    newExp[0] = In;
    const getIn = compileExpression(newExp as any);
    return (context): boolean => !getIn(context);
  }
);
