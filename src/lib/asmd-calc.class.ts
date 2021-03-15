// tslint:disable:typedef
import { add, div, keepDotLength, mul, sub, toFixed, toNonExponential } from './calculation';

/**
 * 支持浮点数四则运算的链式操作类
 */
export class AsmdCalc {
  private total = 0;

  get value() {
    return this.total;
  }

  constructor(value) {
    if (!value) value = 0;

    const x = this;
    const type = typeof value;
    // if (!(x instanceof AsmdCalc)) return new AsmdCalc(value);

    if (value instanceof AsmdCalc) {
      x.total = value.total;
    } else if (type === 'number' || type === 'string') {
      x.total = Number(value);
    } else {
      throw Error('[AsmdCalcError] Invalid argument: ' + value);
    }

    return x;
  }
  /**
   * 加法
   *
   * ### Example (es module)
   * ```js
   * import { AsmdCalc } from 'asmd-calc';
   * const a = new AsmdCalc(0.1);
   * console.log(+a.add(0.2, 3));
   * // => 3.3
   * console.log(+a.add(0.2).add(3));
   * // => 6.5
   * ```
   *
   * @param args
   */
  public add(...args) {
    this.total = add(this.total, ...args);
    return this;
  }
  /**
   * 减法
   *
   * ### Example (es module)
   * ```js
   * import { AsmdCalc } from 'asmd-calc';
   * const a = new AsmdCalc(0.3);
   * console.log(+a.sub(0.1, 0.2));
   * // => 0
   * console.log(+a.sub(0.3).add(0.3));
   * // => 0
   * ```
   *
   * @param args
   */
  public sub(...args) {
    this.total = sub(this.total, ...args);
    return this;
  }
  /**
   * 乘法
   *
   * ### Example (es module)
   * ```js
   * import { AsmdCalc } from 'asmd-calc';
   * const a = new AsmdCalc(0.1);
   * console.log(+a.mul(0.2));
   * // => 0.02
   * console.log(+a.mul(0.3).mul(30));
   * // => 0.18
   * ```
   *
   * @param args
   */
  public mul(...args) {
    this.total = mul(this.total, ...args);
    return this;
  }
  /**
   * 除法
   *
   * ### Example (es module)
   * ```js
   * import { AsmdCalc } from 'asmd-calc';
   * const a = new AsmdCalc(0.3);
   * console.log(+a.div(0.1, 0.2).div(0.3));
   * // => 50
   * ```
   *
   * @param args
   */
  public div(...args) {
    this.total = div(this.total, ...args);
    return this;
  }
  /**
   * 最多保留 N 位小数
   *
   * ### Example (es module)
   * ```js
   * import { AsmdCalc } from 'asmd-calc';
   * const a = new AsmdCalc(0.33366666);
   * console.log(+a.keepDotLength(6));
   * // => 0.333666
   * console.log(+a.keepDotLength(5, false));
   * // => 0.33366
   * console.log(+a.keepDotLength(4, true));
   * // => 0.3337
   * ```
   *
   * @param len
   * @param isRounding
   */
  public keepDotLength(len: number, isRounding = false) {
    this.total = keepDotLength(this.total, len, isRounding);
    return this;
  }
  /**
   * 最多保留 N 位小数
   *
   * ### Example (es module)
   * ```js
   * import { AsmdCalc } from 'asmd-calc';
   * const a = new AsmdCalc(1.45);
   * console.log(a.toFixed(1));
   * // => 0.5
   * console.log(a.toFixed(2));
   * // => 1.45
   * console.log(a.toFixed(3));
   * // => 1.450
   * ```
   *
   */
  public toFixed(len: number) {
    return toFixed(this.total, len);
  }
  protected valueOf() {
    return this.total;
  }
  protected toString() {
    return toNonExponential(this.total);
  }
}
