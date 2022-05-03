import { AsmdCalc } from '../lib/asmd-calc.class';

describe('class AsmdCalc', () => {
  it('AsmdCalc', () => {
    const a = new AsmdCalc(12);
    expect(+a).toBe(12);
    expect(a.value).toBe(12);

    const b = new AsmdCalc('15');
    expect(+b).toBe(15);
    expect(b.value).toBe(15);

    const x = new AsmdCalc(0);
    expect(+x).toBe(0);
    expect(+x.add(1, 2).add(3)).toBe(6);
  });

  it('AsmdCalc.add', () => {
    const a = new AsmdCalc(0.1);
    expect(+a).toBe(0.1);

    expect(+a.add(0).add(0.2).add(0.3)).toBe(0.6);
  });

  it('AsmdCalc.sub', () => {
    const a = new AsmdCalc(0.3);
    expect(+a).toBe(0.3);
    expect(+a.sub(0.1)).toBe(0.2);
    expect(+a.sub(0.2)).toBe(0);

    expect(+a.mul(0).add(0.3).sub(0.1, 0.2)).toBe(0);
    expect(+a.sub(0.3).add(0.3)).toBe(0);
  });

  it('AsmdCalc.mul', () => {
    const a = new AsmdCalc(0.1);
    expect(+a).toBe(0.1);

    expect(+a.mul(0.2).mul(2).mul(100)).toBe(4);

    expect(
      +a
        .mul(0)
        .add(0.1) // 重置为 0.1
        .mul(0.2, 2, 100)
    ).toBe(4);
  });

  it('AsmdCalc.div', () => {
    const a = new AsmdCalc(0.3);
    expect(+a).toBe(0.3);

    expect(+a.div(0.1).div(0.2).div(0.3)).toBe(50);
  });

  it('AsmdCalc.keepDotLength', () => {
    const a = new AsmdCalc(0.33366666);
    expect(+a).toBe(0.33366666);

    expect(+a.keepDotLength(6)).toBe(0.333666);
    expect(+a.keepDotLength(5, false)).toBe(0.33366);
    expect(+a.keepDotLength(4, true)).toBe(0.3337);
  });

  it('AsmdCalc.toFixed', () => {
    const a = new AsmdCalc(1.45);
    expect(+a).toBe(1.45);

    expect(a.toFixed(1)).toBe('1.5');
    expect(a.toFixed(2)).toBe('1.45');
    expect(a.toFixed(3)).toBe('1.450');
  });

  it('AsmdCalc.toValue 应返回当前值', () => {
    const a = new AsmdCalc(1);
    expect(Number(a)).toBe(1);
    expect(Number(a)).toBe(a.value);
  });

  it('AsmdCalc.toString 应返回当前值的非科学计数法字符串格式', () => {
    const a = new AsmdCalc(1);
    expect(String(a)).toBe('1');
    a.mul(0.000000001);
    expect(String(a)).toBe('0.000000001');
  });

  it('AsmdCalc 各种链式计算', () => {
    const a = new AsmdCalc(0.3);
    a.sub(0.1, 0.2).add(0.1, 0.2).add(0.1).sub(0.1).div(0.3).mul(0.3);
    expect(+a).toBe(0.3);
  });

  it('AsmdCalc 异常入参', () => {
    const a = new AsmdCalc(0.3);
    const b = new AsmdCalc(a);
    expect(+b).toBe(0.3);

    expect(() => {
      return new AsmdCalc({ a: 1 });
    }).toThrow();
  });
});
