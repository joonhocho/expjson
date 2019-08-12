import { getRelationOfSets } from '_deps/relationset';
import { registerOperator } from '_src/operatorMap';
import {
  compileSetOperand,
  evaluateSetOperand,
  SetOperand,
} from '_src/setOperand';
import { Expression } from '_src/ts';

export type SetRelation = 'SetRelation';
export const SetRelation: SetRelation = 'SetRelation';

// tslint:disable-next-line interface-name
export interface SetRelationExpression extends Expression {
  [0]: SetRelation;
  [1]: SetOperand;
  [2]: SetOperand;
  [3]: null;
  [index: number]: null | SetOperand;
}

registerOperator<SetRelation, SetRelationExpression>(
  SetRelation,
  (exp, context) => {
    const set1 = evaluateSetOperand(exp[1] as any, context);
    if (set1 !== null) {
      const set2 = evaluateSetOperand(exp[2] as any, context);
      if (set2 !== null) {
        return getRelationOfSets(set1, set2);
      }
    }
    return 0;
  },
  (exp) => {
    const getV1 = compileSetOperand(exp[1] as any);
    const getV2 = compileSetOperand(exp[2] as any);

    return (context): number => {
      const set1 = getV1(context);
      if (set1 !== null) {
        const set2 = getV2(context);
        if (set2 !== null) {
          return getRelationOfSets(set1, set2);
        }
      }
      return 0;
    };
  }
);
