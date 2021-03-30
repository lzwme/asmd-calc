// tslint:disable:no-expression-statement
import test from 'ava';
import * as calc from './calculation';

test('toNonExponential 将指定的数值转换为非科学计数法的字符串格式', (t) => {
  const toNExpList = [
    [Infinity, 'Infinity'],
    [-Infinity, '-Infinity'],
    [0, '0'],
    [100, '100'],
    [10e8, '1000000000'],
    [10e-10, '0.000000001'],
    [10.12e10, '101200000000'],
    [10.12e-10, '0.000000001012'],
    [-10.12e10, '-101200000000'],
    [null, '0'],
    [NaN, 'NaN'],
    [void 0, 'NaN'],
  ];

  toNExpList.forEach((item) => {
    t.is(calc.toNonExponential(item[0] as number), item[1] as string);
  });
});

test('addition 各种入参测试', (t) => {
  const list = [
    [NaN, 3, 3],
    [3, NaN, 3],
    [null, 3, 3],
    [3, null, 3],
    [3, void 0, 3],
    [void 0, 3, 3],
    [0.1, 0.2, 0.3],
    [1, 2, 3],
    [1.11111, 2.999, 4.11011],
    [111111, 299900, 411011],
    [1e-10, 2e-10, 3e-10],
  ];

  list.forEach((item) => {
    t.is(calc.add(item[0], item[1]), item[2]);
  });
});

test('addition 加法计算支持无限参数个数', (t) => {
  const list = [
    { param: [0.1, 0.2], value: 0.3 },
    { param: [1, 2, 0.1, 0.2, 0.3], value: 3.6 },
    { param: [null, 1.1, 2.2, 3, 4], value: 10.3 },
    { param: [void 0, 1, 1, 1.2, 1.1], value: 4.3 },
    { param: [1.11111, 2.999], value: 4.11011 },
    { param: [111111, 299900, 0.1, 0.2], value: 411011.3 },
    { param: [1e-10, 2e-10], value: 3e-10 },
  ];

  list.forEach((item) => {
    t.is(calc.add(...item.param), item.value);
  });
});

test('addition 科学计数法数值测试', (t) => {
  const list = [
    [1e2, 2e2, 300],
    [1e-2, 2e-2, 3e-2],
    [1e-10, 2e-10, 3e-10],
    [0.0000001, 2e-10, 0.0000001002],
  ];

  list.forEach((item) => {
    t.is(calc.add(item[0], item[1]), item[2]);
  });
});

test('subtraction 各种入参测试', (t) => {
  const list = [
    [3, 2, 1],
    [null, 3, -3],
    [1, null, 1],
    [void 0, 3, -3],
    [3, void 0, 3],
    [4.11011, 1.11111, 2.999],
    [411011, 111111, 299900],
  ];

  list.forEach((item) => {
    t.is(calc.sub(item[0], item[1]), item[2]);
  });

  t.is(calc.sub(), null);
});

test('subtraction 减法计算支持无限参数个数', (t) => {
  const list = [
    { param: [0.3, 0.1, 0.2], value: 0 },
    { param: [3.6, 1, 2, 0.1, 0.2, 0.3], value: 0 },
    { param: [10.3, null, 1.1, 2.2, 3, 4], value: 0 },
    { param: [4.3, void 0, 1, 1, 1.2, 1.1], value: 0 },
    { param: [4.11011, 1.11111, 2.999], value: 0 },
    { param: [411011.3, 111111, 299900, 0.1, 0.2], value: 0 },
    { param: [3e-10, 1e-10, 2e-10], value: 0 },
  ];

  list.forEach((item) => {
    t.is(calc.sub(...item.param), 0);
  });
});

test('multiplication 各种入参测试', (t) => {
  const list = [
    [3, 2, 6],
    [null, 3, 0],
    [1, null, 0],
    [void 0, 3, 0],
    [3, void 0, 0],
    [1.11, 1.11, 1.2321],
    [111, 111, 12321],
    ['10.00', '10.1', 101],
  ];

  list.forEach((item) => {
    t.is(calc.mul(item[0], item[1]), item[2] as number);
  });

  t.is(calc.mul(), 0);
});

test('multiplication 乘法计算支持无限参数个数', (t) => {
  const list = [
    { param: [3, 0.1, 0.2], value: 0.06 },
    { param: [3.6, 1, 2, 0.1, 0.2, 0.3], value: 0.0432 },
    { param: [10.3, null, 1.1, 2.2, 3, 4], value: 0 },
    { param: [4.3, void 0, 1, 1, 1.2, 1.1], value: 0 },
    { param: [4.11, 1.1, 2.999], value: 13.558479 },
    { param: [3, 1.1, 290, 0.1, 0.2], value: 19.14 },
    { param: [3e-10, 1e-10, 2e-10], value: 6e-30 },
  ];

  list.forEach((item) => {
    t.is(calc.mul(...item.param), item.value);
  });
});

test('division 各种入参测试', (t) => {
  const list = [
    [0, 0, NaN],
    [6, 3, 2],
    [6, 0, Infinity],
    [null, 3, 0],
    [1, null, Infinity],
    [void 0, 3, 0],
    [3, void 0, Infinity],
    [1.2321, 1.11, 1.11],
    [12321, 111, 111],
    [101, '10.00', 10.1],
    [4.86111, 100, 0.0486111],
  ];

  list.forEach((item) => {
    t.is(calc.div(item[0], item[1]), item[2]);
  });

  t.is(calc.div(), null);
});

test('division 除法计算支持无限参数个数', (t) => {
  const list = [
    { param: [0.06, 3, 0.1, 0.2], value: 1 },
    { param: [0.0432, 3.6, 1, 2, 0.1, 0.2, 0.3], value: 1 },
    { param: [10.3, null, 1.1, 2.2, 3, 4], value: Infinity },
    { param: [4.3, void 0, 1, 1, 1.2, 1.1], value: Infinity },
    { param: [13.558479, 4.11, 1.1, 2.999], value: 1 },
    { param: [19.14, 3, 1.1, 290, 0.1, 0.2], value: 1 },
    { param: [6e-20, 3e-10, 2e-10], value: 1 },
    { param: [null, 3e-10, 1e-10, 2e-10], value: 0 },
  ];

  list.forEach((item) => {
    t.is(calc.div(...item.param), item.value);
  });
});

test('keepDotLength 各种入参测试（截断模式）', (t) => {
  const list = [
    [null, 3, null],
    [void 0, 3, null],
    [1, null, 1],
    [1, void 0, 1],
    [1.001, -1, 1],
    [1.001, null, 1],
    [1.001, void 0, 1],
    [6, 0, 6],
    [6, 10, 6],
    [6.999999, 2, 6.99],
    [99.999999, 2, 99.99],
    [6.1288, 0, 6],
    [6.1288, 1, 6.1],
    [6.1288, 2, 6.12],
    [6.1288, 3, 6.128],
    [6.1288, 10, 6.1288],
  ];

  list.forEach((item) => {
    t.is(calc.keepDotLength(item[0], item[1]), item[2]);
  });
});

test('keepDotLength 各种入参测试（四舍五入方式，等同于 toFixed 结果转整数）', (t) => {
  const list = [
    [null, 3, null],
    [1, null, 1],
    [1.55, null, 2],
    [1.45, 1, 1.5],
    [1.55, 1, 1.6],
    [1.515, 2, 1.52],
    [6, 0, 6],
    [6, 10, 6],
    [6.1288, 0, 6],
    [6.1288, 1, 6.1],
    [6.1288, 2, 6.13],
    [6.999999, 2, 7],
    [99.999999, 2, 100],
    [16.1288, 3, 16.129],
    [1000000000006.1288, 10, 1000000000006.1288],
  ];

  list.forEach((item) => {
    t.is(calc.keepDotLength(item[0], item[1], true), item[2]);
  });
});

test('toFixed 各种入参测试', (t) => {
  const list = [
    [null, 3, null],
    [1, null, 1],
    [1.45, 1, 1.5],
    [1.55, 1, 1.6],
    [1.515, 2, 1.52],
    [6, 0, 6],
    [6, 5, '6.00000'],
    [6.1288, 0, 6],
    [6.1288, 1, 6.1],
    [6.1288, 2, 6.13],
    [6.999999, 2, '7.00'],
    [99.999999, 2, '100.00'],
    [16.1288, 3, 16.129],
    [1000000000006.1288, 0, '1000000000006'],
    [1000000000006.1288, 1, '1000000000006.1'],
    [1000000000006.1288, 2, '1000000000006.13'],
    [1000000000006.1288, 3, '1000000000006.129'],
    [1000000000006.1288, 4, '1000000000006.1288'],
    [1000000000006.1288, 5, '1000000000006.12880'],
    [0.00001811, 3, '0.000'],
    [-0.00001811, 3, '0.000'],
  ];

  list.forEach((item) => {
    t.is(calc.toFixed(item[0], item[1] as number), null == item[2] ? item[2] : String(item[2]));
  });
});
