import { compileOperand } from '_src/compileExpression';
import { evaluateOperand } from '_src/evaluateExpression';
import { registerOperator } from '_src/operatorMap';
import { Expression } from '_src/ts';

export type IfThenElse = '?:';
export const IfThenElse: IfThenElse = '?:';

// tslint:disable-next-line interface-name
export interface IfThenElseExpression extends Expression {
  [0]: IfThenElse;
  [4]: null;
}

registerOperator<IfThenElse, IfThenElseExpression>(
  IfThenElse,
  (exp, context) =>
    evaluateOperand(exp[1], context)
      ? evaluateOperand(exp[2], context)
      : evaluateOperand(exp[3], context),
  (exp) => {
    const getV1 = compileOperand(exp[1]);
    const getV2 = compileOperand(exp[2]);
    const getV3 = compileOperand(exp[3]);
    return (context): unknown =>
      getV1(context) ? getV2(context) : getV3(context);
  }
);
