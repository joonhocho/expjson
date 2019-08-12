import { FiniteSet, Set } from '_deps/relationset';
import { isOperator, thunk } from '_src/common';
import { compileOperand } from '_src/compileExpression';
import { evaluateOperand } from '_src/evaluateExpression';
import { EvaluateExpression, ExecutionContext } from '_src/ts';
import { VarExpression } from './operators/Var';

export type SetValue = VarExpression | string | number | string[] | number[];

export type SetOperand = SetValue | { Not: SetValue };

const { isArray } = Array;

export const toFiniteSet = (v: any): FiniteSet | null => {
  switch (typeof v) {
    case 'number':
    case 'string':
      return [v];
    case 'object': {
      if (isArray(v)) {
        return v;
      }
    }
  }
  return null;
};

export const toSet = (v: any): Set | null => {
  switch (typeof v) {
    case 'number':
    case 'string':
      return [v];
    case 'object': {
      if (v === null) {
        return null;
      }
      if (isArray(v)) {
        return v;
      }
      const Not = toFiniteSet(v.Not);
      return Not === null ? null : { Not };
    }
  }
  return null;
};

export const evaluateSetOperand = (
  v: any,
  context: ExecutionContext
): Set | null => {
  switch (typeof v) {
    case 'number':
    case 'string':
      return [v];
    case 'object': {
      if (v === null) {
        return null;
      }

      if (isArray(v)) {
        if (isOperator(v[0])) {
          // v is expression
          return toSet(evaluateOperand(v, context));
        }
        // v is set
        return v;
      }

      // could be { Not }
      const Not = toFiniteSet(v.Not);
      if (Not === null) {
        return null;
      }

      if (isOperator(Not[0])) {
        // not is expression
        const set = toSet(evaluateOperand(Not, context));
        // double negation or Not
        return set && ((set as any).Not || { Not: set });
      }

      return { Not };
    }
  }
  return null;
};

export const compileSetOperand = (
  v: any
): EvaluateExpression<ExecutionContext, Set | null> => {
  switch (typeof v) {
    case 'number':
    case 'string':
      return thunk([v]);
    case 'object': {
      if (v === null) {
        return thunk(null);
      }

      if (isArray(v)) {
        if (isOperator(v[0])) {
          // v is expression
          const getV = compileOperand(v);
          // tslint:disable-next-line typedef
          return (context) => toSet(getV(context));
        }
        // v is set
        return thunk(v);
      }

      // could be { Not }
      const Not = toFiniteSet(v.Not);
      if (Not === null) {
        return thunk(null);
      }

      if (isOperator(Not[0])) {
        // not is expression
        const getV = compileOperand(Not);

        // tslint:disable-next-line typedef
        return (context) => {
          const set = toSet(getV(context));
          // double negation or Not
          return set && ((set as any).Not || { Not: set });
        };
      }

      return thunk({ Not });
    }
  }
  return thunk(null);
};
