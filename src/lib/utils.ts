/**
 * 获取指定数值的小数位长度
 * @param num
 */
export function getDecimalLen(num): number {
  if (!isDecimal(num)) return 0;
  try {
    return toNonExponential(num).split('.')[1].length;
  } catch (e) {
    console.error(num, e);
    return 0;
  }
}

/**
 * 是否为小数
 * @param n 要识别的参数
 * @param useRegExp 是否使用正则方式。默认为 false
 */
export function isDecimal(value: number | string): boolean {
  const n = Number(value);
  return !Number.isNaN(n) && Math.ceil(n) !== n;
}

/**
 * NaN、null、undefined 返回 true，其它为 false
 * @param value
 */
export function isNull(value): boolean {
  return null == value || isNaN(value);
}

/** 将指定的浮点数转换为非科学计数法的字符串格式 */
export function toNonExponential(num: number): string {
  if (!num) return '0';
  const strNum = String(num);
  if (strNum.indexOf('e') === -1) return strNum;
  num = Number(num);
  const m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
  return num.toFixed(Math.max(0, (m[1] || '').length - Number(m[2])));
}
