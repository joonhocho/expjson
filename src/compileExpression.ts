import { isExpression } from './common';
import {
  Add,
  And,
  Divide,
  Equal,
  GreaterThan,
  GreaterThanOrEqual,
  IfThenElse,
  In,
  LessThan,
  LessThanOrEqual,
  Modulo,
  Multiply,
  Not,
  NotEqual,
  NotIn,
  Or,
  Subtract,
  Var,
} from './operator';
import { ExecutionContext, Expression, Value, Value3 } from './ts';

export type EvaluateExpression<
  Context extends ExecutionContext = ExecutionContext
> = (context: Context) => Value;

export const compileOperand = (operand: Value3): EvaluateExpression =>
  isExpression(operand) ? compileExpression(operand) : (): Value => operand;

export const compileExpression = <
  Context extends ExecutionContext = ExecutionContext
>(
  exp: Expression
): EvaluateExpression<Context> => {
  switch (exp[0]) {
    case Equal: {
      const getV1 = compileOperand(exp[1]);
      const getV2 = compileOperand(exp[2]);
      return (context: Context): boolean => getV1(context) === getV2(context);
    }
    case NotEqual: {
      const getV1 = compileOperand(exp[1]);
      const getV2 = compileOperand(exp[2]);
      return (context: Context): boolean => getV1(context) !== getV2(context);
    }
    case GreaterThan: {
      const getV1 = compileOperand(exp[1]);
      const getV2 = compileOperand(exp[2]);
      return (context: Context): boolean => {
        const v1 = getV1(context);
        if (typeof v1 === 'number' && !isNaN(v1)) {
          const v2 = getV2(context);
          return typeof v2 === 'number' && v1 > v2;
        }
        return false;
      };
    }
    case GreaterThanOrEqual: {
      const getV1 = compileOperand(exp[1]);
      const getV2 = compileOperand(exp[2]);
      return (context: Context): boolean => {
        const v1 = getV1(context);
        if (typeof v1 === 'number' && !isNaN(v1)) {
          const v2 = getV2(context);
          return typeof v2 === 'number' && v1 >= v2;
        }
        return false;
      };
    }
    case LessThan: {
      const getV1 = compileOperand(exp[1]);
      const getV2 = compileOperand(exp[2]);
      return (context: Context): boolean => {
        const v1 = getV1(context);
        if (typeof v1 === 'number' && !isNaN(v1)) {
          const v2 = getV2(context);
          return typeof v2 === 'number' && v1 < v2;
        }
        return false;
      };
    }
    case LessThanOrEqual: {
      const getV1 = compileOperand(exp[1]);
      const getV2 = compileOperand(exp[2]);
      return (context: Context): boolean => {
        const v1 = getV1(context);
        if (typeof v1 === 'number' && !isNaN(v1)) {
          const v2 = getV2(context);
          return typeof v2 === 'number' && v1 <= v2;
        }
        return false;
      };
    }
    case Add: {
      const getV1 = compileOperand(exp[1]);
      const getV2 = compileOperand(exp[2]);
      return (context: Context): number => {
        const v1 = getV1(context);
        if (typeof v1 === 'number' && !isNaN(v1)) {
          const v2 = getV2(context);
          if (typeof v2 === 'number') {
            return v1 + v2;
          }
        }
        return NaN;
      };
    }
    case Subtract: {
      const getV1 = compileOperand(exp[1]);
      const getV2 = compileOperand(exp[2]);
      return (context: Context): number => {
        const v1 = getV1(context);
        if (typeof v1 === 'number' && !isNaN(v1)) {
          const v2 = getV2(context);
          if (typeof v2 === 'number') {
            return v1 - v2;
          }
        }
        return NaN;
      };
    }
    case Multiply: {
      const getV1 = compileOperand(exp[1]);
      const getV2 = compileOperand(exp[2]);
      return (context: Context): number => {
        const v1 = getV1(context);
        if (typeof v1 === 'number' && !isNaN(v1)) {
          const v2 = getV2(context);
          if (typeof v2 === 'number') {
            return v1 * v2;
          }
        }
        return NaN;
      };
    }
    case Divide: {
      const getV1 = compileOperand(exp[1]);
      const getV2 = compileOperand(exp[2]);
      return (context: Context): number => {
        const v1 = getV1(context);
        if (typeof v1 === 'number' && !isNaN(v1)) {
          const v2 = getV2(context);
          if (typeof v2 === 'number') {
            return v1 / v2;
          }
        }
        return NaN;
      };
    }
    case Modulo: {
      const getV1 = compileOperand(exp[1]);
      const getV2 = compileOperand(exp[2]);
      return (context: Context): number => {
        const v1 = getV1(context);
        if (typeof v1 === 'number' && !isNaN(v1)) {
          const v2 = getV2(context);
          if (typeof v2 === 'number') {
            return v1 % v2;
          }
        }
        return NaN;
      };
    }
    case Not: {
      const getV1 = compileOperand(exp[1]);
      return (context: Context): boolean => !getV1(context);
    }
    case And: {
      const getters = exp.slice(1).map(compileOperand);
      return (context: Context): boolean => {
        for (let i = 0, len = getters.length; i < len; i += 1) {
          if (!getters[i](context)) {
            return false;
          }
        }
        return true;
      };
    }
    case Or: {
      const getters = exp.slice(1).map(compileOperand);
      return (context: Context): boolean => {
        for (let i = 0, len = getters.length; i < len; i += 1) {
          if (getters[i](context)) {
            return true;
          }
        }
        return false;
      };
    }
    case IfThenElse: {
      const getV1 = compileOperand(exp[1]);
      const getV2 = compileOperand(exp[2]);
      const getV3 = compileOperand(exp[3]);
      return (context: Context): Value =>
        getV1(context) ? getV2(context) : getV3(context);
    }
    case In: {
      const getV = compileOperand(exp[1]);
      const exps = exp[2];
      if (isExpression(exps)) {
        // variable of array
        const getValues = compileExpression(exps);
        return (context: Context): boolean => {
          const v = getV(context);
          const vs = getValues(context);
          if (Array.isArray(vs)) {
            for (let i = 0, len = vs.length; i < len; i += 1) {
              if (v === vs[i]) {
                return true;
              }
            }
          }
          return false;
        };
      }
      const getters = exps.map(compileOperand);
      return (context: Context): boolean => {
        const v = getV(context);
        for (let i = 0, len = getters.length; i < len; i += 1) {
          if (getters[i](context) === v) {
            return true;
          }
        }
        return false;
      };
    }
    case NotIn: {
      // NotIn === !In
      const newExp = exp.slice();
      newExp[0] = In;
      const getIn = compileExpression(newExp as any);
      return (context: Context): boolean => !getIn(context);
    }
    case Var: {
      const name = exp[1];
      return exp.length < 2
        ? (context: Context): Value => context[name]
        : (context: Context): Value => {
            let val: any = context[name];
            for (let i = 2, len = exp.length; i < len; i += 1) {
              if (val == null) {
                return null;
              }
              val = val[exp[i]];
            }
            return val;
          };
    }
  }
};
