/*
 * @Author: renxia
 * @Date: 2018-09-10 15:10:40
 * @LastEditors: lzw
 * @LastEditTime: 2021-03-30 17:01:57
 * @Description: 支持浮点数精度的加减乘除四则运算
 */

/**
 * NaN、null、undefined 返回 true，其它为 false
 * @param value
 */
export function isNull(value): boolean {
  return String(value) === 'NaN' || null === value || void 0 === value;
}

/**
 * 获取指定数值的小数位长度
 * @param num
 */
export function getDecimalLen(num): number {
  try {
    return toNonExponential(num).split('.')[1].length;
  } catch (f) {
    return 0;
  }
}

/** 将指定的浮点数转换为非科学计数法的字符串格式 */
export function toNonExponential(num: number): string {
  num = Number(num);
  const strNum = String(num);
  if (strNum.indexOf('e') === -1) return strNum;
  const m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
  return num.toFixed(Math.max(0, (m[1] || '').length - Number(m[2])));
}

/**
 * addition 加法计算。与普通加法运算不同的是，任意参数为 `null/NaN/undefined`，均会被视为 `0` 而忽略
 *
 * ### Example (es module)
 * ```js
 * import { add } from 'asmd-calc';
 * console.log(add(0.1, 0.2, 3));
 * // => 3.3
 * ```
 *
 * @returns 永远返回有效的数值，不存在 NaN(视作0处理)
 */
export function add(...args): number {
  let total = 0;
  args.forEach((val) => {
    if (!val) return;
    if (!total) return (total = val);

    const aDecimalLen = getDecimalLen(val);
    const bDecimalLen = getDecimalLen(total);
    const e = Math.pow(10, Math.max(aDecimalLen, bDecimalLen));

    total = (mul(total, e) + mul(val, e)) / e;
  });

  return total;
}

/**
 * subtraction 减法计算。与普通减法运算不同的是，任意参数为 `null/NaN/undefined`，均会被视为 `0` 而忽略
 *
 * ### Example (es module)
 * ```js
 * import { sub } from 'asmd-calc';
 * console.log(sub(0.3, 0.2, 0.1));
 * // => 0
 * ```
 *
 * @param args 第一个值为减数，后续值均为被减数
 * @returns 永远返回有效的数值，不存在 NaN(视作0处理)
 */
export function sub(...args): number {
  if (!args.length) return null;
  args.slice(1).forEach((val, idx) => {
    if (val) args[idx + 1] = -val;
  });

  return add(...args);
}

/**
 * multiplication 乘法计算。
 * - 注意小数位不宜过长(总长度不超过18位，结果不超过18位)
 * - 任意参数为 `null/NaN/undefined`，均会被视为 `0`
 *
 * ### Example (es module)
 * ```js
 * import { mul } from 'asmd-calc';
 * console.log(mul(3, 0.2, 0.1));
 * // => 0.06
 * ```
 *
 * @returns 永远返回有效的数值，不存在 NaN(视作0处理)
 */
export function mul(...args): number {
  let total = 1;

  if (!args.length) return 0;

  args.forEach((value) => {
    value = Number(value) || 0;
    if (!value || !total) return (total = 0);
    if (1 === total) return (total = value);

    const decimalLen = getDecimalLen(total) + getDecimalLen(value);
    const e = Math.pow(10, decimalLen);
    const aa = Number(toNonExponential(total).replace('.', ''));
    const bb = Number(toNonExponential(value).replace('.', ''));

    total = (aa * bb) / e;
  });

  return total;
}
/**
 * division 除法计算。
 *
 * 任意参数为 `null/NaN/undefined`，均会被视为 `0`。于是会有如下情况：
 * ```
 * NaN / 1 = 0 / 1 = 0
 * 0 / NaN = 0 / 0 = NaN
 * 1 / NaN = 1 / 0 = Infinity
 * ```
 *
 * ### Example (es module)
 * ```js
 * import { div } from 'asmd-calc';
 * console.log(div(0.6, 0.1, 0.2));
 * // => 30
 * ```
 *
 * @param args 第一个参数为除数，后续参数均为被除数
 * @returns 永远返回有效的数值。
 */
export function div(...args): number {
  if (!args.length) return null;

  let total = Number(args[0]) || 0;

  args.slice(1).forEach((value) => {
    value = Number(value) || 0;

    const decimalLen = getDecimalLen(value) - getDecimalLen(total);
    let e = Math.pow(10, decimalLen);
    if (decimalLen < 0) e = Number(e.toFixed(-decimalLen));

    const aa = Number(toNonExponential(total).replace('.', ''));
    const bb = Number(toNonExponential(value).replace('.', ''));
    total = e === 1 ? aa / bb : mul(aa / bb, e);
  });

  return total;
}
/**
 * 最多保留 N 位小数
 *
 * ### Example (es module)
 * ```js
 * import { keepDotLength } from 'asmd-calc';
 * console.log(keepDotLength(0.66666, 2));
 * // => 0.66
 * console.log(keepDotLength(0.66666, 2, false));
 * // => 0.66
 * console.log(keepDotLength(0.66666, 2, true));
 * // => 0.67
 * ```
 *
 * @param value 数值
 * @param precision 小数位数，应为 0-16 之间的整数
 * @param isrounding 是否四舍五入取值。默认 false
 */
export function keepDotLength(value: number | string, precision: number, isRounding = false): number {
  if (isNull(value)) return null;
  precision = Math.max(Number(precision), 0) || 0;

  if (isRounding) return Number(toFixed(Number(value), precision));

  let str = toNonExponential(Number(value));

  if (str.indexOf('.') !== -1) str = str.substring(0, str.indexOf('.') + precision + 1);

  return Number(str);
}

/**
 * toFixed 方法重写 【解决 Number.toFixed 方法在不同浏览器表现不一致的问题】
 *
 * ### Example (es module)
 * ```js
 * import { toFixed } from 'asmd-calc';
 * console.log(toFixed(0.66666, 2));
 * // => 0.67
 * console.log(toFixed(1.45, 1));
 * // => 1.5
 * console.log(toFixed(1.55, 1));
 * // => 1.6
 * console.log(toFixed(1.515, 2));
 * // => 1.52
 * ```
 *
 * @param value 数值
 * @param precision 小数位数，应为 0-16 之间的整数
 */
export function toFixed(value: number | string, precision: number): string {
  if (isNull(value)) return null;

  value = Number(value);
  precision = Math.max(Number(precision), 0);
  if (!precision) return String(Math.round(value));

  const valList = toNonExponential(value).split('.');

  if (!valList[1]) {
    valList[1] = new Array(precision + 1).join('0');
    return valList.join('.');
  } else {
    const result = String(Math.round(Math.pow(10, precision) * Number('0.' + valList[1])) / Math.pow(10, precision)).split('.');

    // result = 1，则没有小数部分
    if (!result[1]) {
      result[1] = '';
      valList[0] = String(Number(valList[0]) + Number(result[0]));
    }

    // 小数部分末尾补 0
    if (result[1].length < precision) {
      result[1] += new Array(precision - result[1].length + 1).join('0');
    }

    valList[1] = result[1];
    return valList.join('.');
  }
}
