[![Code Climate](https://lzw.me/images/logo.png)](https://lzw.me)
[![@lzwme/asmd-calc](https://nodei.co/npm/@lzwme/asmd-calc.png)][download-url]

@lzwme/asmd-calc
========

[![NPM version][npm-image]][npm-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]
[![GitHub issues][issues-img]][issues-url]
[![GitHub forks][forks-img]][forks-url]
[![GitHub stars][stars-img]][stars-url]

[stars-img]: https://img.shields.io/github/stars/lzwme/asmd-calc.svg
[stars-url]: https://github.com/lzwme/asmd-calc/stargazers
[forks-img]: https://img.shields.io/github/forks/lzwme/asmd-calc.svg
[forks-url]: https://github.com/lzwme/asmd-calc/network
[issues-img]: https://img.shields.io/github/issues/lzwme/asmd-calc.svg
[issues-url]: https://github.com/lzwme/asmd-calc/issues
[npm-image]: https://img.shields.io/npm/v/@lzwme/asmd-calc.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@lzwme/asmd-calc
[node-image]: https://img.shields.io/badge/node.js-%3E=_10.9.0-green.svg?style=flat-square
[node-url]: https://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/@lzwme/asmd-calc.svg?style=flat-square
[download-url]: https://npmjs.org/package/@lzwme/asmd-calc

支持浮点数精度的加减乘除四则运算 JS 工具方法库。

提供常见的加(`add`)、减(`sub`)、乘(`mul`)、除(`div`)计算方法，可满足涉及金额或价格处理等前端数据计算的绝大多数场景。

**不适用的情况：**

- 对于涉及超大数等前端无法精确表示的数值处理，应当由后端语言计算并使用字符串方式返回给前端展示。
- 对于较为复杂的数学科学计算需求，推荐使用开源库 [decimal.js](https://github.com/MikeMcl/decimal.js)，具体可参见其文档 [decimal.js API](http://mikemcl.github.io/decimal.js/)。

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


## License

`@lzwme/asmd-calc` is released under the MIT license.

该插件由[志文工作室](https://lzw.me)开发和维护。
