import { getRelationOfSets, IntersectingSuperset } from '_deps/relationset';
import { registerOperator } from '_src/operatorMap';
import {
  compileSetOperand,
  evaluateSetOperand,
  SetOperand,
} from '_src/setOperand';
import { Expression } from '_src/ts';

export type SetIsNonEmptySuperset = 'SetIsNonEmptySuperset';
export const SetIsNonEmptySuperset: SetIsNonEmptySuperset =
  'SetIsNonEmptySuperset';

// tslint:disable-next-line interface-name
export interface SetIsNonEmptySupersetExpression extends Expression {
  [0]: SetIsNonEmptySuperset;
  [1]: SetOperand;
  [2]: SetOperand;
  [3]: null;
  [index: number]: null | SetOperand;
}

registerOperator<SetIsNonEmptySuperset, SetIsNonEmptySupersetExpression>(
  SetIsNonEmptySuperset,
  (exp, context) => {
    const set1 = evaluateSetOperand(exp[1] as any, context);
    if (set1 !== null) {
      const set2 = evaluateSetOperand(exp[2] as any, context);
      if (set2 !== null) {
        return (
          // tslint:disable-next-line no-bitwise
          (getRelationOfSets(set1, set2) & IntersectingSuperset) ===
          IntersectingSuperset
        );
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
            (getRelationOfSets(set1, set2) & IntersectingSuperset) ===
            IntersectingSuperset
          );
        }
      }
      return false;
    };
  }
);
