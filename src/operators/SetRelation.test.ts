// tslint:disable no-console no-bitwise
import { Intersecting, Subset, Superset } from '_deps/relationset';
import { compileExpression } from '_src/compileExpression';
import { evaluateExpression } from '_src/evaluateExpression';
import { Expression } from '_src/ts';
import { SetRelation } from './SetRelation';

test('SetRelation evaluate', () => {
  const runTest = (exp: Expression, context: any, expected: any): any =>
    expect(evaluateExpression(exp, context)).toBe(expected);

  runTest([SetRelation, true as any, true as any], {}, 0);
  runTest([SetRelation, null as any, null as any], {}, 0);
  runTest([SetRelation, { Not: null } as any, { Not: null } as any], {}, 0);
  runTest([SetRelation, 1, 1], {}, Intersecting | Subset | Superset);
  runTest([SetRelation, 1, [1, 2]], {}, Intersecting | Subset);
  runTest([SetRelation, [1, 2, 3], [1, 2]], {}, Intersecting | Superset);
  runTest(
    [SetRelation, { Not: [2, 3] }, ['$', 'b']],
    { b: [1, 2] },
    Intersecting
  );
});

test('SetRelation compile', () => {
  const runTest = (exp: Expression, context: any, expected: any): any =>
    expect(compileExpression(exp)(context)).toBe(expected);

  runTest([SetRelation, true as any, true as any], {}, 0);
  runTest([SetRelation, null as any, null as any], {}, 0);
  runTest([SetRelation, { Not: null } as any, { Not: null } as any], {}, 0);
  runTest([SetRelation, 1, 1], {}, Intersecting | Subset | Superset);
  runTest([SetRelation, 1, [1, 2]], {}, Intersecting | Subset);
  runTest([SetRelation, [1, 2, 3], [1, 2]], {}, Intersecting | Superset);
  runTest(
    [SetRelation, { Not: [2, 3] }, ['$', 'b']],
    { b: [1, 2] },
    Intersecting
  );
});
