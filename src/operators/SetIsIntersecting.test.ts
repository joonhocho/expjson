// tslint:disable no-console
import { compileExpression } from '_src/compileExpression';
import { evaluateExpression } from '_src/evaluateExpression';
import { Expression } from '_src/ts';
import { SetIsIntersecting } from './SetIsIntersecting';

test('SetIsIntersecting evaluate', () => {
  const runTest = (exp: Expression, context: any, expected: any): any =>
    expect(evaluateExpression(exp, context)).toBe(expected);

  runTest([SetIsIntersecting, true as any, true as any], {}, false);
  runTest([SetIsIntersecting, null as any, null as any], {}, false);
  runTest(
    [SetIsIntersecting, { Not: null } as any, { Not: null } as any],
    {},
    false
  );
  runTest([SetIsIntersecting, 1, 1], {}, true);
  runTest([SetIsIntersecting, 1, []], {}, false);
  runTest([SetIsIntersecting, 1, [1]], {}, true);
  runTest([SetIsIntersecting, 1, [1, 2]], {}, true);
  runTest([SetIsIntersecting, 1, [2, 3]], {}, false);

  runTest([SetIsIntersecting, 1, 1], {}, true);
  runTest([SetIsIntersecting, [], 1], {}, false);
  runTest([SetIsIntersecting, [1], 1], {}, true);
  runTest([SetIsIntersecting, [1, 2], 1], {}, true);
  runTest([SetIsIntersecting, [2, 3], 1], {}, false);

  runTest([SetIsIntersecting, [1, 2], [3, 4]], {}, false);
  runTest([SetIsIntersecting, [2, 3], [3, 4]], {}, true);
  runTest([SetIsIntersecting, [3, 4], [3, 4]], {}, true);
  runTest([SetIsIntersecting, [4, 5], [3, 4]], {}, true);
  runTest([SetIsIntersecting, [5, 6], [3, 4]], {}, false);

  runTest([SetIsIntersecting, ['$', 'set1'], [3, 4]], {}, false);
  runTest([SetIsIntersecting, ['$', 'set1'], [3, 4]], { set1: [2, 3] }, true);

  runTest([SetIsIntersecting, ['$', 'set1'], [3, 4]], { set1: [1, 2] }, false);

  runTest(
    [SetIsIntersecting, ['$', 'set1'], ['$', 'set2']],
    { set1: [1, 2] },
    false
  );

  runTest(
    [SetIsIntersecting, ['$', 'set1'], ['$', 'set2']],
    { set1: [1, 2], set2: [2, 3] },
    true
  );

  runTest(
    [SetIsIntersecting, ['$', 'set1'], ['$', 'set2']],
    { set1: [1, 2], set2: [3, 4] },
    false
  );

  runTest(
    [SetIsIntersecting, ['$', 'set1'], ['$', 'set2']],
    { set1: { Not: [1, 2] }, set2: [3, 4] },
    true
  );

  runTest(
    [SetIsIntersecting, ['$', 'set1'], ['$', 'set2']],
    { set1: { Not: [3, 4] }, set2: [3, 4] },
    false
  );

  runTest(
    [SetIsIntersecting, ['$', 'set1'], ['$', 'set2']],
    { set1: { Not: [3, 4] }, set2: { Not: [3, 4] } },
    true
  );

  runTest(
    [SetIsIntersecting, { Not: ['$', 'set1'] }, ['$', 'set2']],
    { set1: [3, 4], set2: [3, 4] },
    false
  );

  runTest(
    [SetIsIntersecting, ['$', 'set1'], [3, 4]],
    { set1: { Not: [3, 4] } },
    false
  );

  runTest(
    [SetIsIntersecting, ['$', 'set1'], [3, 4]],
    { set1: { Not: [4, 5] } },
    true
  );

  runTest(
    [SetIsIntersecting, { Not: ['$', 'set1'] }, [3, 4]],
    { set1: [3, 4] },
    false
  );

  runTest(
    [SetIsIntersecting, { Not: ['$', 'set1'] }, [3, 4]],
    { set1: [4, 5] },
    true
  );

  runTest([SetIsIntersecting, { Not: [3, 4] }, [3, 4]], {}, false);

  runTest([SetIsIntersecting, { Not: [4, 5] }, [3, 4]], {}, true);

  runTest([SetIsIntersecting, { Not: 3 }, [3, 4]], {}, true);

  runTest([SetIsIntersecting, { Not: 3 }, [3]], {}, false);

  runTest(
    [SetIsIntersecting, { Not: ['$', 'set1'] }, [3, 4]],
    { set1: 3 },
    true
  );

  runTest([SetIsIntersecting, { Not: ['$', 'set1'] }, [3]], { set1: 3 }, false);

  runTest(
    [SetIsIntersecting, { Not: ['$', 'set1'] }, { Not: [] }],
    { set1: null },
    false
  );

  runTest(
    [SetIsIntersecting, ['$', 'set1'], { Not: [] }],
    { set1: null },
    false
  );

  runTest(
    [SetIsIntersecting, ['$', 'set1'], { Not: [] }],
    { set1: { Not: null } },
    false
  );
});

test('SetIsIntersecting compile', () => {
  const runTest = (exp: Expression, context: any, expected: any): any =>
    expect(compileExpression(exp)(context)).toBe(expected);

  runTest([SetIsIntersecting, true as any, true as any], {}, false);
  runTest([SetIsIntersecting, null as any, null as any], {}, false);
  runTest(
    [SetIsIntersecting, { Not: null } as any, { Not: null } as any],
    {},
    false
  );
  runTest([SetIsIntersecting, 1, '1'], {}, false);
  runTest([SetIsIntersecting, 1, 1], {}, true);
  runTest([SetIsIntersecting, 1, []], {}, false);
  runTest([SetIsIntersecting, 1, [1]], {}, true);
  runTest([SetIsIntersecting, 1, [1, 2]], {}, true);
  runTest([SetIsIntersecting, 1, [2, 3]], {}, false);

  runTest([SetIsIntersecting, '1', 1], {}, false);
  runTest([SetIsIntersecting, 1, 1], {}, true);
  runTest([SetIsIntersecting, [], 1], {}, false);
  runTest([SetIsIntersecting, [1], 1], {}, true);
  runTest([SetIsIntersecting, [1, 2], 1], {}, true);
  runTest([SetIsIntersecting, [2, 3], 1], {}, false);

  runTest([SetIsIntersecting, [1, 2], [3, 4]], {}, false);
  runTest([SetIsIntersecting, [2, 3], [3, 4]], {}, true);
  runTest([SetIsIntersecting, [3, 4], [3, 4]], {}, true);
  runTest([SetIsIntersecting, [4, 5], [3, 4]], {}, true);
  runTest([SetIsIntersecting, [5, 6], [3, 4]], {}, false);

  runTest([SetIsIntersecting, ['$', 'set1'], [3, 4]], {}, false);
  runTest([SetIsIntersecting, ['$', 'set1'], [3, 4]], { set1: [2, 3] }, true);

  runTest([SetIsIntersecting, ['$', 'set1'], [3, 4]], { set1: [1, 2] }, false);

  runTest(
    [SetIsIntersecting, ['$', 'set1'], ['$', 'set2']],
    { set1: [1, 2] },
    false
  );

  runTest(
    [SetIsIntersecting, ['$', 'set1'], ['$', 'set2']],
    { set1: [1, 2], set2: [2, 3] },
    true
  );

  runTest(
    [SetIsIntersecting, ['$', 'set1'], ['$', 'set2']],
    { set1: [1, 2], set2: [3, 4] },
    false
  );

  runTest(
    [SetIsIntersecting, ['$', 'set1'], ['$', 'set2']],
    { set1: { Not: [1, 2] }, set2: [3, 4] },
    true
  );

  runTest(
    [SetIsIntersecting, ['$', 'set1'], ['$', 'set2']],
    { set1: { Not: [3, 4] }, set2: [3, 4] },
    false
  );

  runTest(
    [SetIsIntersecting, ['$', 'set1'], ['$', 'set2']],
    { set1: { Not: [3, 4] }, set2: { Not: [3, 4] } },
    true
  );

  runTest(
    [SetIsIntersecting, { Not: ['$', 'set1'] }, ['$', 'set2']],
    { set1: [3, 4], set2: [3, 4] },
    false
  );

  runTest(
    [SetIsIntersecting, ['$', 'set1'], [3, 4]],
    { set1: { Not: [3, 4] } },
    false
  );

  runTest(
    [SetIsIntersecting, ['$', 'set1'], [3, 4]],
    { set1: { Not: [4, 5] } },
    true
  );

  runTest(
    [SetIsIntersecting, { Not: ['$', 'set1'] }, [3, 4]],
    { set1: [3, 4] },
    false
  );

  runTest(
    [SetIsIntersecting, { Not: ['$', 'set1'] }, [3, 4]],
    { set1: [4, 5] },
    true
  );

  runTest([SetIsIntersecting, { Not: [3, 4] }, [3, 4]], {}, false);

  runTest([SetIsIntersecting, { Not: [4, 5] }, [3, 4]], {}, true);

  runTest([SetIsIntersecting, { Not: 3 }, [3, 4]], {}, true);

  runTest([SetIsIntersecting, { Not: 3 }, [3]], {}, false);

  runTest(
    [SetIsIntersecting, { Not: ['$', 'set1'] }, [3, 4]],
    { set1: 3 },
    true
  );

  runTest([SetIsIntersecting, { Not: ['$', 'set1'] }, [3]], { set1: 3 }, false);

  runTest(
    [SetIsIntersecting, { Not: ['$', 'set1'] }, { Not: [] }],
    { set1: null },
    false
  );

  runTest(
    [SetIsIntersecting, ['$', 'set1'], { Not: [] }],
    { set1: null },
    false
  );

  runTest(
    [SetIsIntersecting, ['$', 'set1'], { Not: [] }],
    { set1: { Not: null } },
    false
  );
});
