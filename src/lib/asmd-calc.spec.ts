// tslint:disable:no-expression-statement
import test from 'ava';
import { AsmdCalc } from './asmd-calc.class';

test('AsmdCalc', (t) => {
  const a = new AsmdCalc(12);
  t.is(+a, 12);
  t.is(a.value, 12);

  const b = new AsmdCalc(15);
  t.is(+b, 15);
  t.is(b.value, 15);

  const x = new AsmdCalc(0);
  t.is(+x, 0);
  t.is(+x.add(1, 2).add(3), 6);
});

test('AsmdCalc.add', (t) => {
  const a = new AsmdCalc(0.1);
  t.is(+a, 0.1);

  t.is(+a.add(0).add(0.2).add(0.3), 0.6);
});

test('AsmdCalc.sub', (t) => {
  const a = new AsmdCalc(0.3);
  t.is(+a, 0.3);
  t.is(+a.sub(0.1), 0.2);
  t.is(+a.sub(0.2), 0);

  t.is(+a.mul(0).add(0.3).sub(0.1, 0.2), 0);
  t.is(+a.sub(0.3).add(0.3), 0);
});

test('AsmdCalc.mul', (t) => {
  const a = new AsmdCalc(0.1);
  t.is(+a, 0.1);

  t.is(+a.mul(0.2).mul(2).mul(100), 4);

  t.is(
    +a
      .mul(0)
      .add(0.1) // 重置为 0.1
      .mul(0.2, 2, 100),
    4
  );
});

test('AsmdCalc.div', (t) => {
  const a = new AsmdCalc(0.3);
  t.is(+a, 0.3);

  t.is(+a.div(0.1).div(0.2).div(0.3), 50);
});

test('AsmdCalc.keepDotLength', (t) => {
  const a = new AsmdCalc(0.33366666);
  t.is(+a, 0.33366666);

  t.is(+a.keepDotLength(6), 0.333666);
  t.is(+a.keepDotLength(5, false), 0.33366);
  t.is(+a.keepDotLength(4, true), 0.3337);
});

test('AsmdCalc.toFixed', (t) => {
  const a = new AsmdCalc(1.45);
  t.is(+a, 1.45);

  t.is(a.toFixed(1), '1.5');
  t.is(a.toFixed(2), '1.45');
  t.is(a.toFixed(3), '1.450');
});

test('AsmdCalc.toValue 应返回当前值', (t) => {
  const a = new AsmdCalc(1);
  t.is(Number(a), 1);
  t.is(Number(a), a.value);
});

test('AsmdCalc.toString 应返回当前值的非科学计数法字符串格式', (t) => {
  const a = new AsmdCalc(1);
  t.is(String(a), '1');
  a.mul(0.000000001);
  t.is(String(a), '0.000000001');
});

test('AsmdCalc 各种链式计算', (t) => {
  const a = new AsmdCalc(0.3);
  a.sub(0.1, 0.2).add(0.1, 0.2).add(0.1).sub(0.1).div(0.3).mul(0.3);
  t.is(+a, 0.3);
});

test('AsmdCalc 异常入参', (t) => {
  const a = new AsmdCalc(0.3);
  const b = new AsmdCalc(a);
  t.is(+b, 0.3);

  t.throws(() => {
    return new AsmdCalc({ a: 1 });
  });
});
