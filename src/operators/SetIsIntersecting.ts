import { getRelationOfSets, Intersecting } from '_deps/relationset';
import { registerOperator } from '_src/operatorMap';
import {
  compileSetOperand,
  evaluateSetOperand,
  SetOperand,
} from '_src/setOperand';
import { Expression } from '_src/ts';

export type SetIsIntersecting = 'SetIsIntersecting';
export const SetIsIntersecting: SetIsIntersecting = 'SetIsIntersecting';

// tslint:disable-next-line interface-name
export interface SetIsIntersectingExpression extends Expression {
  [0]: SetIsIntersecting;
  [1]: SetOperand;
  [2]: SetOperand;
  [3]: null;
  [index: number]: null | SetOperand;
}

registerOperator<SetIsIntersecting, SetIsIntersectingExpression>(
  SetIsIntersecting,
  (exp, context) => {
    const set1 = evaluateSetOperand(exp[1] as any, context);
    if (set1 !== null) {
      const set2 = evaluateSetOperand(exp[2] as any, context);
      if (set2 !== null) {
        // tslint:disable-next-line no-bitwise
        return (getRelationOfSets(set1, set2) & Intersecting) === Intersecting;
      }
    }
    return false;
  },
  (exp) => {
    const getV1 = compileSetOperand(exp[1] as any);
    const getV2 = compileSetOperand(exp[2] as any);

    return (context): boolean => {
      const set1 = getV1(context);
      if (set1 !== null) {
        const set2 = getV2(context);
        if (set2 !== null) {
          return (
            // tslint:disable-next-line no-bitwise
            (getRelationOfSets(set1, set2) & Intersecting) === Intersecting
          );
        }
      }
      return false;
    };
  }
);
