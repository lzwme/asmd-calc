import { Decimal } from 'decimal.js';

function fixInputValue(value) {
  // return Number.isNaN(value) || value === '-' || !value ? 0 : value;
  return Number.isNaN(value) || value === '' || value === '-' || !value ? 0 : value ?? 0;
}

export function Deci(value?: number | string | Decimal) {
  return new Decimal(fixInputValue(value));
}

export { Decimal };

type FuncType = 'add' | 'div' | 'mul' | 'sub' | 'mod';
type ArgsMutiItem = number | string | Decimal;
type ArgsMuti = ArgsMutiItem[];

function calc(funcType: FuncType, args: ArgsMuti) {
  let valChain = Deci(args[0]);

  args.slice(1).forEach((arg) => {
    valChain = valChain[funcType](fixInputValue(arg));
  });

  return valChain.toNumber();
}

/** 加法 */
export function add(...args: ArgsMuti) {
  return calc('add', args);
}
/** 减法 */
export function sub(...args: ArgsMuti) {
  return calc('sub', args);
}
/** 乘法 */
export function mul(...args: ArgsMuti) {
  return calc('mul', args);
}
/** 除法 */
export function div(...args: ArgsMuti) {
  return calc('div', args);
}
/** 取余 */
export function mod(...args: ArgsMuti) {
  return calc('mod', args);
}
export function toFixed(x: number, n: number) {
  return Deci(x).toFixed(fixInputValue(n));
}

/** 小于 */
export function smaller(a: ArgsMutiItem, b: ArgsMutiItem): boolean {
  return Deci(a).lt(b);
}
/** 小于等于 */
export function smallerEq(a: ArgsMutiItem, b: ArgsMutiItem): boolean {
  return Deci(a).lte(b);
}
/** 大于 */
export function larger(a: ArgsMutiItem, b: ArgsMutiItem): boolean {
  return Deci(a).gt(b);
}
/** 大于等于 */
export function largerEq(a: ArgsMutiItem, b: ArgsMutiItem): boolean {
  return Deci(a).gte(b);
}

// ---- 原型扩展兼容 ----
// Number.prototype.div = function (...args: ArgsMuti) {
//     return div(this.valueOf(), ...args);
// };

// Number.prototype.mul = function (...args: ArgsMuti) {
//     return mul(this.valueOf(), ...args);
// };

// Number.prototype.add = function (...args: ArgsMuti) {
//     return add(this.valueOf(), ...args);
// };

// Number.prototype.sub = function (...args: ArgsMuti) {
//     return sub(this.valueOf(), ...args);
// };
