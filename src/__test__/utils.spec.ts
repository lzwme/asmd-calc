import { getDecimalLen, isDecimal, toNonExponential } from '../lib/utils';

describe('calc', () => {
  it('toNonExponential 将指定的数值转换为非科学计数法的字符串格式', () => {
    const toNExpList = [
      [0, '0'],
      [null, '0'],
      [NaN, '0'],
      [void 0, '0'],
      [Infinity, 'Infinity'],
      [-Infinity, '-Infinity'],
      [100, '100'],
      [10e8, '1000000000'],
      [10e-10, '0.000000001'],
      [10.12e10, '101200000000'],
      [10.12e-10, '0.000000001012'],
      [-10.12e10, '-101200000000'],
    ];

    toNExpList.forEach((item) => {
      expect(toNonExponential(item[0] as number)).toBe(item[1] as string);
    });
  });

  it('isDecimal', () => {
    const decimalList = ['0.00000001012', '100.1', 100.1, 0.0001, -0.1, -100.01, 0.3 - 0.2];
    const aList = [100, 'a', 'bbb', 0, void 0, null, 0, NaN, '', 10001];
    const caseList = [...decimalList, aList];

    decimalList.forEach((val) => {
      expect(isDecimal(val)).toBeTruthy();
    });
    aList.forEach((val) => {
      expect(isDecimal(val)).toBeFalsy();
    });

    caseList.forEach((val) => {
      const ok = isDecimal(val, false) === isDecimal(val, true);
      if (!ok) console.error(val, isDecimal(val, false), isDecimal(val, true));
      expect(ok).toBeTruthy();
    });
  });

  it('getDecimalLen', () => {
    expect(getDecimalLen(10)).toBe(0);
    expect(getDecimalLen(null)).toBe(0);
    expect(getDecimalLen(1e-9)).toBe(9);
    expect(getDecimalLen('abc')).toBe(0);
    expect(getDecimalLen('0.001')).toBe(3);
  });
});
