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

[简体中文](./.github/README-zh-CN.md)

A short and concise JavaScript library for the four fundamental operations of arithmetic, which supports the addition, subtraction, multiplication and division calculation of floating-point precision.

## Features

- Short and sharp. It only includes the calculation of addition, subtraction, multiplication and division. The core code is less than 100 lines. There is no other dependency.
- High execution performance. Only the four operations that can be accurately expressed by the front end are considered to realize simple logic and better execution performance than the open source library with rich and complex functions (see `Benchmark` for details).
- Accurate and stable. The accumulation of many years of practical experience in the development of several financial trading systems covers various common calculation use case error scenarios.

**Not Applicable**

- For numerical processing involving very large numbers that front-end can not be accurately represented.
- Complex mathematical scientific calculation. 

These libraries are recommended:

- [math.js](https://mathjs.org/index.html)
- [decimal.js](https://github.com/MikeMcl/decimal.js)
- [calculatorjs](https://github.com/fzred/calculatorjs)
- [bignumber.js](https://github.com/MikeMcl/bignumber.js)
- [big.js/](https://github.com/MikeMcl/big.js/)。

## Install

```bash
# npm
npm i @lzwme/asmd-calc
# yarn
yarn add @lzwme/asmd-calc
# pnpm
pnpm add @lzwme/asmd-calc
```

## Useage

### 1. Calculation example using simple tool method

#### es module

```js
import { add } from '@lzwme/asmd-calc';

console.log(add(0.1, 0.2, 0.3));
// => 0.6
```

#### commonjs


```js
const calc = require('@lzwme/asmd-calc');

console.log(calc.add(0.1, 0.2, 0.3));
// => 0.6
```

### 2. Calculation example using chain operation

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

- `add(...args);` - Addition
- `sub(...args);` - Subtraction
- `mul(...args);` - Multiplication
- `div(...args);` - Division
- `keepDotLength(value, len, isRounding = false): number;` - Keep N decimal places
- `toFixed(value, len): string;` - Similar to `Number.prototype.toFixed`, but fixed precision of the result
- `getDecimalLen(num): number;` - Get the decimal length
- `toNonExponential(num): string;` - Convert to string format of unscientific counting method

## Development and testing

- Development

```bash
pnpm install
pnpm start
```

- Testing

```bash
npm test
npm run benchmark
```

- Build

```bash
npm run build
```

## Benchmark

```bash
npm run benchmark
```

See：[Benchmark](https://github.com/lzwme/asmd-calc/blob/master/benchmark/index.ts)

The following results are the time-consuming comparison of executing `10000 * N` times on the same machine:

| type/times |   jsRaw  | asmd-calc |  mathjs   |
|     ---    |   ---    |    ---    |    ---    |
| add-10000  | 19.225ms | 169.535ms | 415.145ms |
| sub-10000  | 16.269ms | 34.827ms  | 171.263ms |
| mul-10000  | 18.518ms | 51.625ms  | 235.868ms |
| div-10000  | 27.025ms | 79.504ms  | 300.706ms |

Pre execution of 1000000 times and then stats time-consuming of execution of `10000 * N` times:

| type/times |   jsRaw  | asmd-calc |  mathjs   |
|     ---    |   ---    |    ---    |    ---    |
| add-10000  | 7.768ms  | 155.836ms | 362.819ms |
| sub-10000  | 8.339ms  | 25.147ms  | 155.611ms |
| mul-10000  | 9.995ms  | 35.685ms  | 224.357ms |
| div-10000  | 15.666ms | 77.407ms  | 280.322ms |

## References

- [754-2008 – IEEE Standard for Floating-Point Arithmetic](https://ieeexplore.ieee.org/document/4610935)
- [Floating Point Math – https://0.30000000000000004.com](https://0.30000000000000004.com)
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
