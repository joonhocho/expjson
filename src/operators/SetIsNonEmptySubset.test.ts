// tslint:disable no-console
import { compileExpression } from '_src/compileExpression';
import { evaluateExpression } from '_src/evaluateExpression';
import { Expression } from '_src/ts';
import { SetIsNonEmptySubset } from './SetIsNonEmptySubset';

test('SetIsNonEmptySubset evaluate', () => {
  const runTest = (exp: Expression, context: any, expected: any): any =>
    expect(evaluateExpression(exp, context)).toBe(expected);

  runTest([SetIsNonEmptySubset, true as any, true as any], {}, false);
  runTest([SetIsNonEmptySubset, null as any, null as any], {}, false);
  runTest(
    [SetIsNonEmptySubset, { Not: null } as any, { Not: null } as any],
    {},
    false
  );
  runTest([SetIsNonEmptySubset, 1, 1], {}, true);
  runTest([SetIsNonEmptySubset, 1, []], {}, false);
  runTest([SetIsNonEmptySubset, 1, [1]], {}, true);
  runTest([SetIsNonEmptySubset, 1, [1, 2]], {}, true);
  runTest([SetIsNonEmptySubset, 1, [2, 3]], {}, false);

  runTest([SetIsNonEmptySubset, 1, 1], {}, true);
  runTest([SetIsNonEmptySubset, [], 1], {}, false);
  runTest([SetIsNonEmptySubset, [1], 1], {}, true);
  runTest([SetIsNonEmptySubset, [1, 2], 1], {}, false);
  runTest([SetIsNonEmptySubset, [2, 3], 1], {}, false);

  runTest([SetIsNonEmptySubset, [1, 2], [3, 4]], {}, false);
  runTest([SetIsNonEmptySubset, [2, 3], [3, 4]], {}, false);
  runTest([SetIsNonEmptySubset, [3, 4], [3, 4]], {}, true);
  runTest([SetIsNonEmptySubset, [4, 5], [3, 4]], {}, false);
  runTest([SetIsNonEmptySubset, [5, 6], [3, 4]], {}, false);

  runTest([SetIsNonEmptySubset, ['$', 'set1'], [3, 4]], {}, false);
  runTest(
    [SetIsNonEmptySubset, ['$', 'set1'], [3, 4]],
    { set1: [2, 3] },
    false
  );

  runTest(
    [SetIsNonEmptySubset, ['$', 'set1'], [3, 4]],
    { set1: [1, 2] },
    false
  );

  runTest(
    [SetIsNonEmptySubset, ['$', 'set1'], ['$', 'set2']],
    { set1: [1, 2] },
    false
  );

  runTest(
    [SetIsNonEmptySubset, ['$', 'set1'], ['$', 'set2']],
    { set1: [1, 2], set2: [2, 3] },
    false
  );

  runTest(
    [SetIsNonEmptySubset, ['$', 'set1'], ['$', 'set2']],
    { set1: [1, 2], set2: [3, 4] },
    false
  );

  runTest(
    [SetIsNonEmptySubset, ['$', 'set1'], ['$', 'set2']],
    { set1: { Not: [1, 2] }, set2: [3, 4] },
    false
  );

  runTest(
    [SetIsNonEmptySubset, ['$', 'set1'], ['$', 'set2']],
    { set1: { Not: [3, 4] }, set2: [3, 4] },
    false
  );

  runTest(
    [SetIsNonEmptySubset, ['$', 'set1'], ['$', 'set2']],
    { set1: { Not: [3, 4] }, set2: { Not: [3, 4] } },
    true
  );

  runTest(
    [SetIsNonEmptySubset, { Not: ['$', 'set1'] }, ['$', 'set2']],
    { set1: [3, 4], set2: [3, 4] },
    false
  );

  runTest(
    [SetIsNonEmptySubset, ['$', 'set1'], [3, 4]],
    { set1: { Not: [3, 4] } },
    false
  );

  runTest(
    [SetIsNonEmptySubset, ['$', 'set1'], [3, 4]],
    { set1: { Not: [4, 5] } },
    false
  );

  runTest(
    [SetIsNonEmptySubset, { Not: ['$', 'set1'] }, [3, 4]],
    { set1: [3, 4] },
    false
  );

  runTest(
    [SetIsNonEmptySubset, { Not: ['$', 'set1'] }, [3, 4]],
    { set1: [4, 5] },
    false
  );

  runTest([SetIsNonEmptySubset, { Not: [3, 4] }, [3, 4]], {}, false);

  runTest([SetIsNonEmptySubset, { Not: [4, 5] }, [3, 4]], {}, false);

  runTest([SetIsNonEmptySubset, { Not: 3 }, [3, 4]], {}, false);

  runTest([SetIsNonEmptySubset, { Not: 3 }, [3]], {}, false);

  runTest(
    [SetIsNonEmptySubset, { Not: ['$', 'set1'] }, [3, 4]],
    { set1: 3 },
    false
  );

  runTest(
    [SetIsNonEmptySubset, { Not: ['$', 'set1'] }, [3]],
    { set1: 3 },
    false
  );

  runTest(
    [SetIsNonEmptySubset, { Not: ['$', 'set1'] }, { Not: [] }],
    { set1: null },
    false
  );

  runTest(
    [SetIsNonEmptySubset, ['$', 'set1'], { Not: [] }],
    { set1: null },
    false
  );

  runTest(
    [SetIsNonEmptySubset, ['$', 'set1'], { Not: [] }],
    { set1: { Not: null } },
    false
  );
});

test('SetIsNonEmptySubset compile', () => {
  const runTest = (exp: Expression, context: any, expected: any): any =>
    expect(compileExpression(exp)(context)).toBe(expected);

  runTest([SetIsNonEmptySubset, true as any, true as any], {}, false);
  runTest([SetIsNonEmptySubset, null as any, null as any], {}, false);
  runTest(
    [SetIsNonEmptySubset, { Not: null } as any, { Not: null } as any],
    {},
    false
  );
  runTest([SetIsNonEmptySubset, 1, '1'], {}, false);
  runTest([SetIsNonEmptySubset, 1, 1], {}, true);
  runTest([SetIsNonEmptySubset, 1, []], {}, false);
  runTest([SetIsNonEmptySubset, 1, [1]], {}, true);
  runTest([SetIsNonEmptySubset, 1, [1, 2]], {}, true);
  runTest([SetIsNonEmptySubset, 1, [2, 3]], {}, false);

  runTest([SetIsNonEmptySubset, '1', 1], {}, false);
  runTest([SetIsNonEmptySubset, 1, 1], {}, true);
  runTest([SetIsNonEmptySubset, [], 1], {}, false);
  runTest([SetIsNonEmptySubset, [1], 1], {}, true);
  runTest([SetIsNonEmptySubset, [1, 2], 1], {}, false);
  runTest([SetIsNonEmptySubset, [2, 3], 1], {}, false);

  runTest([SetIsNonEmptySubset, [1, 2], [3, 4]], {}, false);
  runTest([SetIsNonEmptySubset, [2, 3], [3, 4]], {}, false);
  runTest([SetIsNonEmptySubset, [3, 4], [3, 4]], {}, true);
  runTest([SetIsNonEmptySubset, [4, 5], [3, 4]], {}, false);
  runTest([SetIsNonEmptySubset, [5, 6], [3, 4]], {}, false);

  runTest([SetIsNonEmptySubset, ['$', 'set1'], [3, 4]], {}, false);
  runTest(
    [SetIsNonEmptySubset, ['$', 'set1'], [3, 4]],
    { set1: [2, 3] },
    false
  );

  runTest(
    [SetIsNonEmptySubset, ['$', 'set1'], [3, 4]],
    { set1: [1, 2] },
    false
  );

  runTest(
    [SetIsNonEmptySubset, ['$', 'set1'], ['$', 'set2']],
    { set1: [1, 2] },
    false
  );

  runTest(
    [SetIsNonEmptySubset, ['$', 'set1'], ['$', 'set2']],
    { set1: [1, 2], set2: [2, 3] },
    false
  );

  runTest(
    [SetIsNonEmptySubset, ['$', 'set1'], ['$', 'set2']],
    { set1: [1, 2], set2: [3, 4] },
    false
  );

  runTest(
    [SetIsNonEmptySubset, ['$', 'set1'], ['$', 'set2']],
    { set1: { Not: [1, 2] }, set2: [3, 4] },
    false
  );

  runTest(
    [SetIsNonEmptySubset, ['$', 'set1'], ['$', 'set2']],
    { set1: { Not: [3, 4] }, set2: [3, 4] },
    false
  );

  runTest(
    [SetIsNonEmptySubset, ['$', 'set1'], ['$', 'set2']],
    { set1: { Not: [3, 4] }, set2: { Not: [3, 4] } },
    true
  );

  runTest(
    [SetIsNonEmptySubset, { Not: ['$', 'set1'] }, ['$', 'set2']],
    { set1: [3, 4], set2: [3, 4] },
    false
  );

  runTest(
    [SetIsNonEmptySubset, ['$', 'set1'], [3, 4]],
    { set1: { Not: [3, 4] } },
    false
  );

  runTest(
    [SetIsNonEmptySubset, ['$', 'set1'], [3, 4]],
    { set1: { Not: [4, 5] } },
    false
  );

  runTest(
    [SetIsNonEmptySubset, { Not: ['$', 'set1'] }, [3, 4]],
    { set1: [3, 4] },
    false
  );

  runTest(
    [SetIsNonEmptySubset, { Not: ['$', 'set1'] }, [3, 4]],
    { set1: [4, 5] },
    false
  );

  runTest([SetIsNonEmptySubset, { Not: [3, 4] }, [3, 4]], {}, false);

  runTest([SetIsNonEmptySubset, { Not: [4, 5] }, [3, 4]], {}, false);

  runTest([SetIsNonEmptySubset, { Not: 3 }, [3, 4]], {}, false);

  runTest([SetIsNonEmptySubset, { Not: 3 }, [3]], {}, false);

  runTest(
    [SetIsNonEmptySubset, { Not: ['$', 'set1'] }, [3, 4]],
    { set1: 3 },
    false
  );

  runTest(
    [SetIsNonEmptySubset, { Not: ['$', 'set1'] }, [3]],
    { set1: 3 },
    false
  );

  runTest(
    [SetIsNonEmptySubset, { Not: ['$', 'set1'] }, { Not: [] }],
    { set1: null },
    false
  );

  runTest(
    [SetIsNonEmptySubset, ['$', 'set1'], { Not: [] }],
    { set1: null },
    false
  );

  runTest(
    [SetIsNonEmptySubset, ['$', 'set1'], { Not: [] }],
    { set1: { Not: null } },
    false
  );
});
