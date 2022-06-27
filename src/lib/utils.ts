export const REG = {
  // isBinary: /^0b([01]+(\\.[01]*)?|\\.[01]+)(p[+-]?\\d+)?$/i,
  // isHex: /^0x([0-9a-f]+(\\.[0-9a-f]*)?|\\.[0-9a-f]+)(p[+-]?\\d+)?$/i,
  // isOctal: /^0o([0-7]+(\\.[0-7]*)?|\\.[0-7]+)(p[+-]?\\d+)?$/i,
  isDecimal: /^(\\d+(\\.\\d*)?|\\.\\d+)(e[+-]?\\d+)?$/i,
};

/**
 * 获取指定数值的小数位长度
 * @param num
 */
 export function getDecimalLen(num): number {
  if (!isDecimal(num)) return 0;
  return toNonExponential(num).split('.')[1].length;
}

/**
 * 是否为小数
 * @param n 要识别的参数
 * @param useRegExp 是否使用正则方式。默认为 true（Node.js 16 下测试效率更快）
 */
export function isDecimal(n, useRegExp = true): boolean {
  if (useRegExp) return REG.isDecimal.test(n);

  n = Number(n);
  return !isNaN(n) && Math.ceil(n) !== n;
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
