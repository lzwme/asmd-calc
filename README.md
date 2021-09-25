[![@lzwme/asmd-calc](https://nodei.co/npm/@lzwme/asmd-calc.png)][download-url]

@lzwme/asmd-calc
========

[![NPM version][npm-badge]][npm-url]
[![node version][node-badge]][node-url]
[![npm download][download-badge]][download-url]
[![minzipped size][bundlephobia-badge]][bundlephobia-url]
[![GitHub issues][issues-badge]][issues-url]
[![GitHub forks][forks-badge]][forks-url]
[![GitHub stars][stars-badge]][stars-url]
![license MIT](https://img.shields.io/github/license/lzwme/asmd-calc)

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

支持浮点数精度的加减乘除四则运算 JS 工具方法库。

提供常见的加(`add`)、减(`sub`)、乘(`mul`)、除(`div`)计算方法，可满足涉及金额或价格处理等前端数据计算的绝大多数场景。

**为什么选用 `asmd-calc`：**

- 短小精悍。仅包含加减乘除计算，核心代码不足百行，无其他依赖，文件小巧够用
- 相对准确稳定。数个金融类交易系统多年开发实践经验的积累，覆盖了常见的各种计算用例误差场景

**不适用的情况：**

- 对于涉及超大数等前端无法精确表示的数值处理，应当由后端语言计算并使用字符串方式返回给前端展示。
- 对于较为复杂的数学科学计算需求，推荐使用开源库如 [math.js](https://mathjs.org/index.html)、[decimal.js](https://github.com/MikeMcl/decimal.js)、[calculatorjs](https://github.com/fzred/calculatorjs)、[bignumber.js](https://github.com/MikeMcl/bignumber.js)、[big.js/](https://github.com/MikeMcl/big.js/)等，具体可分别参见其官方文档。

## 安装

```bash
# npm
npm i @lzwme/asmd-calc
# yarn
yarn add @lzwme/asmd-calc
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

console.log(add(0.1, 0.2, 0.3));
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

const a = new AsmdCalc(0);
console.log(a.add(0.1).add(0.2, 0.3));
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
yarn install
yarn start
```

- 测试

```bash
yarn test
```

- 构建

```bash
yarn build
```

## 相关参考

- [确保前端 JavaScript 浮点数精度的四则运算方法](https://lzw.me/a/javascript-floating-point-arithmetic.html)
## License

`@lzwme/asmd-calc` is released under the MIT license.

该插件由[志文工作室](https://lzw.me)开发和维护。
