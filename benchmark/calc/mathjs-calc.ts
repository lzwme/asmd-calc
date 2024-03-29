/*
 * @Author: lzw
 * @Date: 2021-03-12 12:37:12
 * @LastEditors: lzw
 * @LastEditTime: 2022-06-23 16:52:15
 * @Description: 基于 math.js 的加减乘除基本运算
 */

import { bignumber, chain } from 'mathjs';

type FuncType = 'add' | 'divide' | 'multiply' | 'subtract' | 'mod';
type ArgsMutiItem = number | string;
type ArgsMuti = ArgsMutiItem[];

function calc(funcType: FuncType, args: ArgsMuti) {
  let valChain = chain(bignumber(+args[0]));

  args.slice(1).forEach((arg) => {
    valChain = valChain[funcType](bignumber(+arg));
  });

  return +valChain.done();
}

/** 加法 */
export function add(...args: ArgsMuti) {
  return calc('add', args);
}
/** 减法 */
export function sub(...args: ArgsMuti) {
  return calc('subtract', args);
}
/** 乘法 */
export function mul(...args: ArgsMuti) {
  return calc('multiply', args);
}
/** 除法 */
export function div(...args: ArgsMuti) {
  return calc('divide', args);
}
/** 取余 */
export function mod(...args: ArgsMuti) {
  return calc('mod', args);
}
/** 小于 */
export function smaller(a: ArgsMutiItem, b: ArgsMutiItem) {
  return chain(bignumber(a)).smaller(bignumber(b)).done();
}
/** 小于等于 */
export function smallerEq(a: ArgsMutiItem, b: ArgsMutiItem) {
  return chain(bignumber(a)).smallerEq(bignumber(b)).done();
}
/** 大于 */
export function larger(a: ArgsMutiItem, b: ArgsMutiItem) {
  return chain(bignumber(a)).larger(bignumber(b)).done();
}
/** 大于等于 */
export function largerEq(a: ArgsMutiItem, b: ArgsMutiItem) {
  return chain(bignumber(a)).largerEq(bignumber(b)).done();
}

// Number.prototype.div = function (...args: ArgsMuti) {
//   return div(this.valueOf(), ...args);
// };

// Number.prototype.mul = function (...args: ArgsMuti) {
//   return mul(this.valueOf(), ...args);
// };

// Number.prototype.add = function (...args: ArgsMuti) {
//   return add(this.valueOf(), ...args);
// };

// Number.prototype.sub = function (...args: ArgsMuti) {
//   return sub(this.valueOf(), ...args);
// };
