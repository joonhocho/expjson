// tslint:disable no-console
import { compileExpression } from '_src/compileExpression';
import { evaluateExpression } from '_src/evaluateExpression';
import { Expression } from '_src/ts';
import { SetIsNonEmptySuperset } from './SetIsNonEmptySuperset';

test('SetIsNonEmptySuperset evaluate', () => {
  const runTest = (exp: Expression, context: any, expected: any): any =>
    expect(evaluateExpression(exp, context)).toBe(expected);

  runTest([SetIsNonEmptySuperset, true as any, true as any], {}, false);
  runTest([SetIsNonEmptySuperset, null as any, null as any], {}, false);
  runTest(
    [SetIsNonEmptySuperset, { Not: null } as any, { Not: null } as any],
    {},
    false
  );
  runTest([SetIsNonEmptySuperset, 1, 1], {}, true);
  runTest([SetIsNonEmptySuperset, 1, []], {}, false);
  runTest([SetIsNonEmptySuperset, 1, [1]], {}, true);
  runTest([SetIsNonEmptySuperset, 1, [1, 2]], {}, false);
  runTest([SetIsNonEmptySuperset, 1, [2, 3]], {}, false);

  runTest([SetIsNonEmptySuperset, 1, 1], {}, true);
  runTest([SetIsNonEmptySuperset, [], 1], {}, false);
  runTest([SetIsNonEmptySuperset, [1], 1], {}, true);
  runTest([SetIsNonEmptySuperset, [1, 2], 1], {}, true);
  runTest([SetIsNonEmptySuperset, [2, 3], 1], {}, false);

  runTest([SetIsNonEmptySuperset, [1, 2], [3, 4]], {}, false);
  runTest([SetIsNonEmptySuperset, [2, 3], [3, 4]], {}, false);
  runTest([SetIsNonEmptySuperset, [3, 4], [3, 4]], {}, true);
  runTest([SetIsNonEmptySuperset, [4, 5], [3, 4]], {}, false);
  runTest([SetIsNonEmptySuperset, [5, 6], [3, 4]], {}, false);

  runTest([SetIsNonEmptySuperset, ['$', 'set1'], [3, 4]], {}, false);
  runTest(
    [SetIsNonEmptySuperset, ['$', 'set1'], [3, 4]],
    { set1: [2, 3] },
    false
  );

  runTest(
    [SetIsNonEmptySuperset, ['$', 'set1'], [3, 4]],
    { set1: [1, 2] },
    false
  );

  runTest(
    [SetIsNonEmptySuperset, ['$', 'set1'], ['$', 'set2']],
    { set1: [1, 2] },
    false
  );

  runTest(
    [SetIsNonEmptySuperset, ['$', 'set1'], ['$', 'set2']],
    { set1: [1, 2], set2: [2, 3] },
    false
  );

  runTest(
    [SetIsNonEmptySuperset, ['$', 'set1'], ['$', 'set2']],
    { set1: [1, 2], set2: [3, 4] },
    false
  );

  runTest(
    [SetIsNonEmptySuperset, ['$', 'set1'], ['$', 'set2']],
    { set1: { Not: [1, 2] }, set2: [3, 4] },
    true
  );

  runTest(
    [SetIsNonEmptySuperset, ['$', 'set1'], ['$', 'set2']],
    { set1: { Not: [3, 4] }, set2: [3, 4] },
    false
  );

  runTest(
    [SetIsNonEmptySuperset, ['$', 'set1'], ['$', 'set2']],
    { set1: { Not: [3, 4] }, set2: { Not: [3, 4] } },
    true
  );

  runTest(
    [SetIsNonEmptySuperset, { Not: ['$', 'set1'] }, ['$', 'set2']],
    { set1: [3, 4], set2: [3, 4] },
    false
  );

  runTest(
    [SetIsNonEmptySuperset, ['$', 'set1'], [3, 4]],
    { set1: { Not: [3, 4] } },
    false
  );

  runTest(
    [SetIsNonEmptySuperset, ['$', 'set1'], [3, 4]],
    { set1: { Not: [4, 5] } },
    false
  );

  runTest(
    [SetIsNonEmptySuperset, { Not: ['$', 'set1'] }, [3, 4]],
    { set1: [3, 4] },
    false
  );

  runTest(
    [SetIsNonEmptySuperset, { Not: ['$', 'set1'] }, [3, 4]],
    { set1: [4, 5] },
    false
  );

  runTest([SetIsNonEmptySuperset, { Not: [3, 4] }, [3, 4]], {}, false);

  runTest([SetIsNonEmptySuperset, { Not: [4, 5] }, [3, 4]], {}, false);

  runTest([SetIsNonEmptySuperset, { Not: 3 }, [3, 4]], {}, false);

  runTest([SetIsNonEmptySuperset, { Not: 3 }, [3]], {}, false);

  runTest(
    [SetIsNonEmptySuperset, { Not: ['$', 'set1'] }, [3, 4]],
    { set1: 3 },
    false
  );

  runTest(
    [SetIsNonEmptySuperset, { Not: ['$', 'set1'] }, [3]],
    { set1: 3 },
    false
  );

  runTest(
    [SetIsNonEmptySuperset, { Not: ['$', 'set1'] }, { Not: [] }],
    { set1: null },
    false
  );

  runTest(
    [SetIsNonEmptySuperset, ['$', 'set1'], { Not: [] }],
    { set1: null },
    false
  );

  runTest(
    [SetIsNonEmptySuperset, ['$', 'set1'], { Not: [] }],
    { set1: { Not: null } },
    false
  );
});

test('SetIsNonEmptySuperset compile', () => {
  const runTest = (exp: Expression, context: any, expected: any): any =>
    expect(compileExpression(exp)(context)).toBe(expected);

  runTest([SetIsNonEmptySuperset, true as any, true as any], {}, false);
  runTest([SetIsNonEmptySuperset, null as any, null as any], {}, false);
  runTest(
    [SetIsNonEmptySuperset, { Not: null } as any, { Not: null } as any],
    {},
    false
  );
  runTest([SetIsNonEmptySuperset, 1, '1'], {}, false);
  runTest([SetIsNonEmptySuperset, 1, 1], {}, true);
  runTest([SetIsNonEmptySuperset, 1, []], {}, false);
  runTest([SetIsNonEmptySuperset, 1, [1]], {}, true);
  runTest([SetIsNonEmptySuperset, 1, [1, 2]], {}, false);
  runTest([SetIsNonEmptySuperset, 1, [2, 3]], {}, false);

  runTest([SetIsNonEmptySuperset, '1', 1], {}, false);
  runTest([SetIsNonEmptySuperset, 1, 1], {}, true);
  runTest([SetIsNonEmptySuperset, [], 1], {}, false);
  runTest([SetIsNonEmptySuperset, [1], 1], {}, true);
  runTest([SetIsNonEmptySuperset, [1, 2], 1], {}, true);
  runTest([SetIsNonEmptySuperset, [2, 3], 1], {}, false);

  runTest([SetIsNonEmptySuperset, [1, 2], [3, 4]], {}, false);
  runTest([SetIsNonEmptySuperset, [2, 3], [3, 4]], {}, false);
  runTest([SetIsNonEmptySuperset, [3, 4], [3, 4]], {}, true);
  runTest([SetIsNonEmptySuperset, [4, 5], [3, 4]], {}, false);
  runTest([SetIsNonEmptySuperset, [5, 6], [3, 4]], {}, false);

  runTest([SetIsNonEmptySuperset, ['$', 'set1'], [3, 4]], {}, false);
  runTest(
    [SetIsNonEmptySuperset, ['$', 'set1'], [3, 4]],
    { set1: [2, 3] },
    false
  );

  runTest(
    [SetIsNonEmptySuperset, ['$', 'set1'], [3, 4]],
    { set1: [1, 2] },
    false
  );

  runTest(
    [SetIsNonEmptySuperset, ['$', 'set1'], ['$', 'set2']],
    { set1: [1, 2] },
    false
  );

  runTest(
    [SetIsNonEmptySuperset, ['$', 'set1'], ['$', 'set2']],
    { set1: [1, 2], set2: [2, 3] },
    false
  );

  runTest(
    [SetIsNonEmptySuperset, ['$', 'set1'], ['$', 'set2']],
    { set1: [1, 2], set2: [3, 4] },
    false
  );

  runTest(
    [SetIsNonEmptySuperset, ['$', 'set1'], ['$', 'set2']],
    { set1: { Not: [1, 2] }, set2: [3, 4] },
    true
  );

  runTest(
    [SetIsNonEmptySuperset, ['$', 'set1'], ['$', 'set2']],
    { set1: { Not: [3, 4] }, set2: [3, 4] },
    false
  );

  runTest(
    [SetIsNonEmptySuperset, ['$', 'set1'], ['$', 'set2']],
    { set1: { Not: [3, 4] }, set2: { Not: [3, 4] } },
    true
  );

  runTest(
    [SetIsNonEmptySuperset, { Not: ['$', 'set1'] }, ['$', 'set2']],
    { set1: [3, 4], set2: [3, 4] },
    false
  );

  runTest(
    [SetIsNonEmptySuperset, ['$', 'set1'], [3, 4]],
    { set1: { Not: [3, 4] } },
    false
  );

  runTest(
    [SetIsNonEmptySuperset, ['$', 'set1'], [3, 4]],
    { set1: { Not: [4, 5] } },
    false
  );

  runTest(
    [SetIsNonEmptySuperset, { Not: ['$', 'set1'] }, [3, 4]],
    { set1: [3, 4] },
    false
  );

  runTest(
    [SetIsNonEmptySuperset, { Not: ['$', 'set1'] }, [3, 4]],
    { set1: [4, 5] },
    false
  );

  runTest([SetIsNonEmptySuperset, { Not: [3, 4] }, [3, 4]], {}, false);

  runTest([SetIsNonEmptySuperset, { Not: [4, 5] }, [3, 4]], {}, false);

  runTest([SetIsNonEmptySuperset, { Not: 3 }, [3, 4]], {}, false);

  runTest([SetIsNonEmptySuperset, { Not: 3 }, [3]], {}, false);

  runTest(
    [SetIsNonEmptySuperset, { Not: ['$', 'set1'] }, [3, 4]],
    { set1: 3 },
    false
  );

  runTest(
    [SetIsNonEmptySuperset, { Not: ['$', 'set1'] }, [3]],
    { set1: 3 },
    false
  );

  runTest(
    [SetIsNonEmptySuperset, { Not: ['$', 'set1'] }, { Not: [] }],
    { set1: null },
    false
  );

  runTest(
    [SetIsNonEmptySuperset, ['$', 'set1'], { Not: [] }],
    { set1: null },
    false
  );

  runTest(
    [SetIsNonEmptySuperset, ['$', 'set1'], { Not: [] }],
    { set1: { Not: null } },
    false
  );
});
