/*
 * @Author: renxia
 * @Date: 2018-09-10 15:10:40
 * @LastEditors: lzw
 * @LastEditTime: 2020-11-28 11:47:59
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
  // if (!m) return num.toExponential();
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
 * @param len 小数位数
 * @param isrounding 是否四舍五入取值。默认 false
 */
export function keepDotLength(value: number | string, len: number, isRounding = false): number {
  if (isNull(value)) return null;
  if ((+len <= 0 && len !== 0) || isNull(len)) return Number(value);

  len = Number(len);

  if (isRounding) return Number(Number(value).toFixed(len));

  let str = toNonExponential(Number(value));

  if (str.indexOf('.') !== -1) str = str.substring(0, str.indexOf('.') + len + 1);

  return Number(str);
}
