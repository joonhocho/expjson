import { isExpression, variablePattern } from './common';
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
} from './operator';
import { ExecutionContext, Expression, Value, Value4 } from './ts';

export const evaluateOperand = (
  operand: Value4,
  context: ExecutionContext
): Value => {
  if (isExpression(operand)) {
    return evaluateExpression(operand, context);
  }
  if (typeof operand === 'string') {
    if (variablePattern.test(operand)) {
      return context[operand.substring(1)];
    }
    if (operand.lastIndexOf('\\$', 0) === 0) {
      // escape \$
      return operand.substring(1);
    }
  }
  return operand;
};

export const evaluateExpression = (
  exp: Expression,
  context: ExecutionContext
): Value => {
  switch (exp[0]) {
    case Equal: {
      return (
        evaluateOperand(exp[1], context) === evaluateOperand(exp[2], context)
      );
    }
    case NotEqual: {
      return (
        evaluateOperand(exp[1], context) !== evaluateOperand(exp[2], context)
      );
    }
    case GreaterThan: {
      const v1 = evaluateOperand(exp[1], context);
      if (typeof v1 === 'number' && !isNaN(v1)) {
        const v2 = evaluateOperand(exp[2], context);
        return typeof v2 === 'number' && v1 > v2;
      }
      return false;
    }
    case GreaterThanOrEqual: {
      const v1 = evaluateOperand(exp[1], context);
      if (typeof v1 === 'number' && !isNaN(v1)) {
        const v2 = evaluateOperand(exp[2], context);
        return typeof v2 === 'number' && v1 >= v2;
      }
      return false;
    }
    case LessThan: {
      const v1 = evaluateOperand(exp[1], context);
      if (typeof v1 === 'number' && !isNaN(v1)) {
        const v2 = evaluateOperand(exp[2], context);
        return typeof v2 === 'number' && v1 < v2;
      }
      return false;
    }
    case LessThanOrEqual: {
      const v1 = evaluateOperand(exp[1], context);
      if (typeof v1 === 'number' && !isNaN(v1)) {
        const v2 = evaluateOperand(exp[2], context);
        return typeof v2 === 'number' && v1 <= v2;
      }
      return false;
    }
    case Add: {
      const v1 = evaluateOperand(exp[1], context);
      if (typeof v1 === 'number' && !isNaN(v1)) {
        const v2 = evaluateOperand(exp[2], context);
        if (typeof v2 === 'number') {
          return v1 + v2;
        }
      }
      return NaN;
    }
    case Subtract: {
      const v1 = evaluateOperand(exp[1], context);
      if (typeof v1 === 'number' && !isNaN(v1)) {
        const v2 = evaluateOperand(exp[2], context);
        if (typeof v2 === 'number') {
          return v1 - v2;
        }
      }
      return NaN;
    }
    case Multiply: {
      const v1 = evaluateOperand(exp[1], context);
      if (typeof v1 === 'number' && !isNaN(v1)) {
        const v2 = evaluateOperand(exp[2], context);
        if (typeof v2 === 'number') {
          return v1 * v2;
        }
      }
      return NaN;
    }
    case Divide: {
      const v1 = evaluateOperand(exp[1], context);
      if (typeof v1 === 'number' && !isNaN(v1)) {
        const v2 = evaluateOperand(exp[2], context);
        if (typeof v2 === 'number') {
          return v1 / v2;
        }
      }
      return NaN;
    }
    case Modulo: {
      const v1 = evaluateOperand(exp[1], context);
      if (typeof v1 === 'number' && !isNaN(v1)) {
        const v2 = evaluateOperand(exp[2], context);
        if (typeof v2 === 'number') {
          return v1 % v2;
        }
      }
      return NaN;
    }
    case Not: {
      return !evaluateOperand(exp[1], context);
    }
    case And: {
      for (let i = 1, len = exp.length; i < len; i += 1) {
        if (!evaluateOperand(exp[i], context)) {
          return false;
        }
      }
      return true;
    }
    case Or: {
      for (let i = 1, len = exp.length; i < len; i += 1) {
        if (evaluateOperand(exp[i], context)) {
          return true;
        }
      }
      return false;
    }
    case IfThenElse: {
      return evaluateOperand(exp[1], context)
        ? evaluateOperand(exp[2], context)
        : evaluateOperand(exp[3], context);
    }
    case In: {
      const v = evaluateOperand(exp[1], context);
      const exps = exp[2];
      if (typeof exps === 'string') {
        // variable of array
        const vs = evaluateOperand(exps, context);
        if (Array.isArray(vs)) {
          for (let i = 0, len = vs.length; i < len; i += 1) {
            if (v === vs[i]) {
              return true;
            }
          }
        }
      } else {
        for (let i = 0, len = exps.length; i < len; i += 1) {
          if (evaluateOperand(exps[i], context) === v) {
            return true;
          }
        }
      }
      return false;
    }
    case NotIn: {
      const v = evaluateOperand(exp[1], context);
      const exps = exp[2];
      if (typeof exps === 'string') {
        // variable of array
        const vs = evaluateOperand(exps, context);
        if (Array.isArray(vs)) {
          for (let i = 0, len = vs.length; i < len; i += 1) {
            if (v === vs[i]) {
              return false;
            }
          }
        }
      } else {
        for (let i = 0, len = exps.length; i < len; i += 1) {
          if (evaluateOperand(exps[i], context) === v) {
            return false;
          }
        }
      }
      return true;
    }
  }
};
