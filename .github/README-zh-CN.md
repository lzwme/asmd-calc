[![@lzwme/asmd-calc](https://nodei.co/npm/@lzwme/asmd-calc.png)][download-url]

@lzwme/asmd-calc
========

[![build status](https://github.com/lzwme/asmd-calc/actions/workflows/node-ci.yml/badge.svg)](https://github.com/lzwme/asmd-calc/actions/workflows/node-ci.yml)
[![NPM version][npm-badge]][npm-url]
[![node version][node-badge]][node-url]
[![npm download][download-badge]][download-url]
[![GitHub issues][issues-badge]][issues-url]
[![GitHub forks][forks-badge]][forks-url]
[![GitHub stars][stars-badge]][stars-url]
![license MIT](https://img.shields.io/github/license/lzwme/asmd-calc)
<!-- [![minzipped size][bundlephobia-badge]][bundlephobia-url] -->

一个短小精悍的四则运算 JS 工具方法库，支持浮点数精度的加减乘除计算。

提供常见的加(`add`)、减(`sub`)、乘(`mul`)、除(`div`)计算方法，可满足涉及金额、价格处理等前端数据计算的大多数应用场景。

**为什么选用 `asmd-calc`：**

- 短小精悍。仅包含加减乘除计算，核心代码不足百行，无其他依赖，文件小巧够用
- 执行性能高。仅考虑前端可精确表达的四则运算，实现逻辑简洁，执行性能优于功能丰富复杂的开源库(详见 Benchmark 部分)
- 准确稳定。数个金融类交易系统多年开发实践经验的积累，覆盖了常见的各种计算用例误差场景

**不适用的情况：**

- 对于涉及超大数等`前端无法精确表示的数值处理`，建议由后端语言计算并使用字符串方式返回给前端展示。也可使用 `math.js` 等开源库以字符串形式执行计算。
- 对于较为`复杂的数学科学计算`需求，推荐使用开源库如 [math.js](https://mathjs.org/index.html)、[decimal.js](https://github.com/MikeMcl/decimal.js)、[calculatorjs](https://github.com/fzred/calculatorjs)、[bignumber.js](https://github.com/MikeMcl/bignumber.js)、[big.js/](https://github.com/MikeMcl/big.js/)等，具体可分别参见其官方文档。

## 安装

```bash
# npm
npm i @lzwme/asmd-calc
# yarn
pnpm add @lzwme/asmd-calc
# pnpm
pnpm add @lzwme/asmd-calc
```

## 用法 (USEAGE)

### 1. 使用简单的工具方法计算示例

#### es module

```js
import { add } from '@lzwme/asmd-calc';

console.log(add(0.1, 0.2, 0.3));
// => 0.6
```

或

```js
import * as calc from '@lzwme/asmd-calc';

console.log(calc.add(0.1, 0.2, 0.3));
// => 0.6
```

#### commonjs


```js
const calc = require('@lzwme/asmd-calc');

console.log(calc.add(0.1, 0.2, 0.3));
// => 0.6
```

### 2. 使用链式操作类计算示例

#### es module

```js
import { AsmdCalc } from '@lzwme/asmd-calc';

const a = new AsmdCalc(0);
console.log(+a.add(0.1).add(0.2, 0.3));
// => 0.6

const b = new AsmdCalc(0.3);
  b.add(0.1, 0.2)
    .add(0.1)
    .sub(0.1, 0.2)
    .sub(0.1)
    .div(0.3)
    .mul(0.3);
console.log(+b);
// => 0.3
console.log(b.value);
// => 0.3
```

#### commonjs

```js
const AsmdCalc = require('@lzwme/asmd-calc').AsmdCalc;

const calc = new AsmdCalc(0);
console.log(calc.add(0.1).add(0.2, 0.3));
// => 0.6
```

## API

- `add(...args)` 加法运算
- `sub(...args)` 减法运算
- `mul(...args)` 乘法运算
- `div(...args)` 除法运算
- `keepDotLength(value, len, isRounding = false)` 保留 N 位小数(支持四舍五入或截断)
- `toFixed(value, len)` 保留 N 位小数(四舍五入，返回字符串)
- `getDecimalLen(num)` 获取指定数值的小数位长度
- `toNonExponential(num)` 将指定的浮点数转换为非科学计数法的字符串格式

## 开发与测试

- 开发

```bash
pnpm install
pnpm start
```

- 测试

```bash
# 单元测试
npm test

# 基准测试
npm run benchmark
```

- 构建

```bash
npm run build
```

## Benchmark

```bash
npm run benchmark
```

基准测试代码参见：[Benchmark](https://github.com/lzwme/asmd-calc/blob/master/benchmark/index.ts)

以下结果为在同一机器上分别执行 `10000*N` 次的耗时对比：

| type/times |   jsRaw  | asmd-calc |  mathjs   |
|     ---    |   ---    |    ---    |    ---    |
| add-10000  | 19.225ms | 169.535ms | 415.145ms |
| sub-10000  | 16.269ms | 34.827ms  | 171.263ms |
| mul-10000  | 18.518ms | 51.625ms  | 235.868ms |
| div-10000  | 27.025ms | 79.504ms  | 300.706ms |

预执行 `100_000` 次后再执行 `10000*N` 次的耗时对比：

| type/times |   jsRaw  | asmd-calc |  mathjs   |
|     ---    |   ---    |    ---    |    ---    |
| add-10000  | 7.768ms  | 155.836ms | 362.819ms |
| sub-10000  | 8.339ms  | 25.147ms  | 155.611ms |
| mul-10000  | 9.995ms  | 35.685ms  | 224.357ms |
| div-10000  | 15.666ms | 77.407ms  | 280.322ms |

### Benchmark Details

随机数据集（测试用例）:

| type/times | [jsRawCalc] | [asmdCalc] | [decimal] | [mathjs] |
|     ---    |   ---    |    ---    |    ---    |    ---    |
| add-10000 | 4.973ms | 144.934ms | 192.637ms | 363.513ms |
| sub-10000 | 6.971ms | 21.84ms | 65.373ms | 165.045ms |
| mul-10000 | 8.45ms | 36.014ms | 107.898ms | 223.708ms |
| div-10000 | 14.427ms | 64.409ms | 154.766ms | 290.645ms |

纯小数数据集:

| type/times | [jsRawCalc] | [asmdCalc] | [decimal] | [mathjs] |
|     ---    |   ---    |    ---    |    ---    |    ---    |
| add-10000 | 0.248ms | 16.958ms | 30.875ms | 55.538ms |
| sub-10000 | 0.462ms | 22.529ms | 32.719ms | 46.321ms |
| mul-10000 | 0.232ms | 18.006ms | 34.765ms | 46.195ms |
| div-10000 | 0.519ms | 17.37ms | 36.031ms | 47.271ms |

纯整数数据集:

| type/times | [jsRawCalc] | [asmdCalc] | [decimal] | [mathjs] |
|     ---    |   ---    |    ---    |    ---    |    ---    |
| add-10000 | 0.172ms | 0.681ms | 10.248ms | 35.004ms |
| sub-10000 | 0.816ms | 1.069ms | 12.736ms | 32.836ms |
| mul-10000 | 0.178ms | 0.733ms | 13.827ms | 33.486ms |
| div-10000 | 0.488ms | 0.699ms | 19.847ms | 42.217ms |


## 相关参考

- [确保前端 JavaScript 浮点数精度的四则运算方法](https://lzw.me/a/javascript-floating-point-arithmetic.html)
## License

`@lzwme/asmd-calc` is released under the MIT license.

该插件由[志文工作室](https://lzw.me)开发和维护。


[stars-badge]: https://img.shields.io/github/stars/lzwme/asmd-calc.svg
[stars-url]: https://github.com/lzwme/asmd-calc/stargazers
[forks-badge]: https://img.shields.io/github/forks/lzwme/asmd-calc.svg
[forks-url]: https://github.com/lzwme/asmd-calc/network
[issues-badge]: https://img.shields.io/github/issues/lzwme/asmd-calc.svg
[issues-url]: https://github.com/lzwme/asmd-calc/issues
[npm-badge]: https://img.shields.io/npm/v/@lzwme/asmd-calc.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@lzwme/asmd-calc
[node-badge]: https://img.shields.io/badge/node.js-%3E=_10.9.0-green.svg?style=flat-square
[node-url]: https://nodejs.org/download/
[download-badge]: https://img.shields.io/npm/dm/@lzwme/asmd-calc.svg?style=flat-square
[download-url]: https://npmjs.org/package/@lzwme/asmd-calc
[bundlephobia-url]: https://bundlephobia.com/result?p=@lzwme/asmd-calc@latest
[bundlephobia-badge]: https://badgen.net/bundlephobia/minzip/@lzwme/asmd-calc@latest
