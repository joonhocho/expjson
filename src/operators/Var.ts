import { registerOperator } from '_src/operatorMap';
import { Expression, Value } from '_src/ts';

export type Var = '$';
export const Var: Var = '$';

// tslint:disable-next-line interface-name
export interface VarExpression extends Expression {
  [0]: Var;
  [1]: string;
  [index: number]: string;
}

registerOperator<Var, VarExpression>(
  Var,
  (exp, context) => {
    let val: any = context[exp[1]];
    for (let i = 2, len = exp.length; i < len; i += 1) {
      if (val == null) {
        return null;
      }
      val = val[exp[i]];
    }
    return val;
  },
  (exp) => {
    const name = exp[1];
    return exp.length < 2
      ? (context): Value => context[name]
      : (context): Value => {
          let val: any = context[name];
          for (let i = 2, len = exp.length; i < len; i += 1) {
            if (val == null) {
              return null;
            }
            val = val[exp[i]];
          }
          return val;
        };
  }
);
