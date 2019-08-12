// tslint:disable no-console
import { compileExpression } from '_src/compileExpression';
import { evaluateExpression } from '_src/evaluateExpression';
import { Expression } from '_src/ts';
import { SetIsEqual } from './SetIsEqual';

test('SetIsEqual evaluate', () => {
  const runTest = (exp: Expression, context: any, expected: any): any =>
    expect(evaluateExpression(exp, context)).toBe(expected);

  runTest([SetIsEqual, true as any, true as any], {}, false);
  runTest([SetIsEqual, null as any, null as any], {}, false);
  runTest([SetIsEqual, { Not: null } as any, { Not: null } as any], {}, false);
  runTest([SetIsEqual, 1, 1], {}, true);
  runTest([SetIsEqual, 1, []], {}, false);
  runTest([SetIsEqual, 1, [1]], {}, true);
  runTest([SetIsEqual, 1, [1, 2]], {}, false);
  runTest([SetIsEqual, 1, [2, 3]], {}, false);

  runTest([SetIsEqual, 1, 1], {}, true);
  runTest([SetIsEqual, [], 1], {}, false);
  runTest([SetIsEqual, [1], 1], {}, true);
  runTest([SetIsEqual, [1, 2], 1], {}, false);
  runTest([SetIsEqual, [2, 3], 1], {}, false);

  runTest([SetIsEqual, [1, 2], [3, 4]], {}, false);
  runTest([SetIsEqual, [2, 3], [3, 4]], {}, false);
  runTest([SetIsEqual, [3, 4], [3, 4]], {}, true);
  runTest([SetIsEqual, [4, 5], [3, 4]], {}, false);
  runTest([SetIsEqual, [5, 6], [3, 4]], {}, false);

  runTest([SetIsEqual, ['$', 'set1'], [3, 4]], {}, false);
  runTest([SetIsEqual, ['$', 'set1'], [3, 4]], { set1: [2, 3] }, false);

  runTest([SetIsEqual, ['$', 'set1'], [3, 4]], { set1: [1, 2] }, false);

  runTest([SetIsEqual, ['$', 'set1'], ['$', 'set2']], { set1: [1, 2] }, false);

  runTest(
    [SetIsEqual, ['$', 'set1'], ['$', 'set2']],
    { set1: [1, 2], set2: [2, 3] },
    false
  );

  runTest(
    [SetIsEqual, ['$', 'set1'], ['$', 'set2']],
    { set1: [1, 2], set2: [3, 4] },
    false
  );

  runTest(
    [SetIsEqual, ['$', 'set1'], ['$', 'set2']],
    { set1: { Not: [1, 2] }, set2: [3, 4] },
    false
  );

  runTest(
    [SetIsEqual, ['$', 'set1'], ['$', 'set2']],
    { set1: { Not: [3, 4] }, set2: [3, 4] },
    false
  );

  runTest(
    [SetIsEqual, ['$', 'set1'], ['$', 'set2']],
    { set1: { Not: [3, 4] }, set2: { Not: [3, 4] } },
    true
  );

  runTest(
    [SetIsEqual, { Not: ['$', 'set1'] }, ['$', 'set2']],
    { set1: [3, 4], set2: [3, 4] },
    false
  );

  runTest(
    [SetIsEqual, ['$', 'set1'], [3, 4]],
    { set1: { Not: [3, 4] } },
    false
  );

  runTest(
    [SetIsEqual, ['$', 'set1'], [3, 4]],
    { set1: { Not: [4, 5] } },
    false
  );

  runTest(
    [SetIsEqual, { Not: ['$', 'set1'] }, [3, 4]],
    { set1: [3, 4] },
    false
  );

  runTest(
    [SetIsEqual, { Not: ['$', 'set1'] }, [3, 4]],
    { set1: [4, 5] },
    false
  );

  runTest([SetIsEqual, { Not: [3, 4] }, [3, 4]], {}, false);

  runTest([SetIsEqual, { Not: [4, 5] }, [3, 4]], {}, false);

  runTest([SetIsEqual, { Not: 3 }, [3, 4]], {}, false);

  runTest([SetIsEqual, { Not: 3 }, [3]], {}, false);

  runTest([SetIsEqual, { Not: ['$', 'set1'] }, [3, 4]], { set1: 3 }, false);

  runTest([SetIsEqual, { Not: ['$', 'set1'] }, [3]], { set1: 3 }, false);

  runTest(
    [SetIsEqual, { Not: ['$', 'set1'] }, { Not: [] }],
    { set1: null },
    false
  );

  runTest([SetIsEqual, ['$', 'set1'], { Not: [] }], { set1: null }, false);

  runTest(
    [SetIsEqual, ['$', 'set1'], { Not: [] }],
    { set1: { Not: null } },
    false
  );
});

test('SetIsEqual compile', () => {
  const runTest = (exp: Expression, context: any, expected: any): any =>
    expect(compileExpression(exp)(context)).toBe(expected);

  runTest([SetIsEqual, true as any, true as any], {}, false);
  runTest([SetIsEqual, null as any, null as any], {}, false);
  runTest([SetIsEqual, { Not: null } as any, { Not: null } as any], {}, false);
  runTest([SetIsEqual, 1, '1'], {}, false);
  runTest([SetIsEqual, 1, 1], {}, true);
  runTest([SetIsEqual, 1, []], {}, false);
  runTest([SetIsEqual, 1, [1]], {}, true);
  runTest([SetIsEqual, 1, [1, 2]], {}, false);
  runTest([SetIsEqual, 1, [2, 3]], {}, false);

  runTest([SetIsEqual, '1', 1], {}, false);
  runTest([SetIsEqual, 1, 1], {}, true);
  runTest([SetIsEqual, [], 1], {}, false);
  runTest([SetIsEqual, [1], 1], {}, true);
  runTest([SetIsEqual, [1, 2], 1], {}, false);
  runTest([SetIsEqual, [2, 3], 1], {}, false);

  runTest([SetIsEqual, [1, 2], [3, 4]], {}, false);
  runTest([SetIsEqual, [2, 3], [3, 4]], {}, false);
  runTest([SetIsEqual, [3, 4], [3, 4]], {}, true);
  runTest([SetIsEqual, [4, 5], [3, 4]], {}, false);
  runTest([SetIsEqual, [5, 6], [3, 4]], {}, false);

  runTest([SetIsEqual, ['$', 'set1'], [3, 4]], {}, false);
  runTest([SetIsEqual, ['$', 'set1'], [3, 4]], { set1: [2, 3] }, false);

  runTest([SetIsEqual, ['$', 'set1'], [3, 4]], { set1: [1, 2] }, false);

  runTest([SetIsEqual, ['$', 'set1'], ['$', 'set2']], { set1: [1, 2] }, false);

  runTest(
    [SetIsEqual, ['$', 'set1'], ['$', 'set2']],
    { set1: [1, 2], set2: [2, 3] },
    false
  );

  runTest(
    [SetIsEqual, ['$', 'set1'], ['$', 'set2']],
    { set1: [1, 2], set2: [3, 4] },
    false
  );

  runTest(
    [SetIsEqual, ['$', 'set1'], ['$', 'set2']],
    { set1: { Not: [1, 2] }, set2: [3, 4] },
    false
  );

  runTest(
    [SetIsEqual, ['$', 'set1'], ['$', 'set2']],
    { set1: { Not: [3, 4] }, set2: [3, 4] },
    false
  );

  runTest(
    [SetIsEqual, ['$', 'set1'], ['$', 'set2']],
    { set1: { Not: [3, 4] }, set2: { Not: [3, 4] } },
    true
  );

  runTest(
    [SetIsEqual, { Not: ['$', 'set1'] }, ['$', 'set2']],
    { set1: [3, 4], set2: [3, 4] },
    false
  );

  runTest(
    [SetIsEqual, ['$', 'set1'], [3, 4]],
    { set1: { Not: [3, 4] } },
    false
  );

  runTest(
    [SetIsEqual, ['$', 'set1'], [3, 4]],
    { set1: { Not: [4, 5] } },
    false
  );

  runTest(
    [SetIsEqual, { Not: ['$', 'set1'] }, [3, 4]],
    { set1: [3, 4] },
    false
  );

  runTest(
    [SetIsEqual, { Not: ['$', 'set1'] }, [3, 4]],
    { set1: [4, 5] },
    false
  );

  runTest([SetIsEqual, { Not: [3, 4] }, [3, 4]], {}, false);

  runTest([SetIsEqual, { Not: [4, 5] }, [3, 4]], {}, false);

  runTest([SetIsEqual, { Not: 3 }, [3, 4]], {}, false);

  runTest([SetIsEqual, { Not: 3 }, [3]], {}, false);

  runTest([SetIsEqual, { Not: ['$', 'set1'] }, [3, 4]], { set1: 3 }, false);

  runTest([SetIsEqual, { Not: ['$', 'set1'] }, [3]], { set1: 3 }, false);

  runTest(
    [SetIsEqual, { Not: ['$', 'set1'] }, { Not: [] }],
    { set1: null },
    false
  );

  runTest([SetIsEqual, ['$', 'set1'], { Not: [] }], { set1: null }, false);

  runTest(
    [SetIsEqual, ['$', 'set1'], { Not: [] }],
    { set1: { Not: null } },
    false
  );
});
