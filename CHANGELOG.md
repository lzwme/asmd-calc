# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.3.4](https://github.com/lzwme/asmd-calc/compare/v1.3.3...v1.3.4) (2025-04-02)

### [1.3.3](https://github.com/lzwme/asmd-calc/compare/v1.3.2...v1.3.3) (2023-07-20)

### Bug Fixes

- 恢复 types 输出方式，修正按文件加载时 ts 类型丢失的问题 ([963a56b](https://github.com/lzwme/asmd-calc/commit/963a56bd3e77b6ff0f80c74873c38726ca4a3d90))
- 修复字符串类型数字的加法运算结果为字符串拼接的问题 ([ff52802](https://github.com/lzwme/asmd-calc/commit/ff528025e035d52026692d9dbc217fbfcb8b8fb4))
- fix for isDecimal ([850a21e](https://github.com/lzwme/asmd-calc/commit/850a21e95c156e43fe01f9230ccc7fd5523542de))
- isDecimal() should return a boolean value ([c50b6d9](https://github.com/lzwme/asmd-calc/commit/c50b6d994eadfd6200be9aeae17d3724a7577b93))

### [1.3.2](https://github.com/lzwme/asmd-calc/compare/v1.3.1...v1.3.2) (2022-05-09)

### Bug Fixes

- fix for husky install scripts ([e4da474](https://github.com/lzwme/asmd-calc/commit/e4da474d056342726eb5f2845b896e76a26ecdee))

### [1.3.1](https://github.com/lzwme/asmd-calc/compare/v1.3.0...v1.3.1) (2022-05-05)

### Bug Fixes

- fix for types dir name ([c8518d0](https://github.com/lzwme/asmd-calc/commit/c8518d08dd68b35f1ea68081f2461dddb67ea912))

## [1.3.0](https://github.com/lzwme/asmd-calc/compare/v1.1.5...v1.3.0) (2022-05-03)

### Features

- 重构部分逻辑实现，改善执行性能，并增加 benchmark 基准测试 ([c6c5918](https://github.com/lzwme/asmd-calc/commit/c6c591872c34b739616f55ccdbf08f169008c886))

## [1.2.0](https://github.com/lzwme/asmd-calc/compare/v1.1.5...v1.2.0) (2022-03-09)

### Features

- 重构部分逻辑实现，改善执行性能，并增加 benchmark 基准测试 ([c6c5918](https://github.com/lzwme/asmd-calc/commit/c6c591872c34b739616f55ccdbf08f169008c886))

## 1.1.5 (2021-09-25)

### Bug Fixes

- 修复 tofixed 在计算科学计算法表示的数据时异常([#6](https://github.com/lzwme/asmd-calc/issues/6)) ([834c156](https://github.com/lzwme/asmd-calc/commit/608a2a87193cb03fa310b3811f7caf46f73d8df8))

### [1.1.2](https://github.com/lzwme/asmd-calc/compare/v1.1.1...v1.1.2) (2021-03-30)

### Bug Fixes

- 修复 toFixed 方法小数结果为 0 时返回值错误的问题 ([9fafac6](https://github.com/lzwme/asmd-calc/commit/9fafac6e6b75981808c16220b307d9e99cc71bcd))

### [1.1.1](https://github.com/lzwme/asmd-calc/compare/v1.1.0...v1.1.1) (2021-03-20)

### Bug Fixes

- 修复 toFixed 方法对于 9.99 存在进位后无小数位的情况会报错的问题 ([98c1197](https://github.com/lzwme/asmd-calc/commit/98c11972daf0b03f5f133975d35a5be04b5af61c))

## 1.1.0 (2021-03-15)

### Features

- 新增 toFixed 方法，取代 Number.toFixed 在不同浏览器表现不一致的问题 ([0267ff9](https://github.com/lzwme/asmd-calc/commit/0267ff9d58fbd9cb0eacfbfea37f2fe87fb72a70))

### Bug Fixes

- 修正 div 方法的 bug(修正 Math.pow(-5) 导致的精度错误问题) ([942bcfe](https://github.com/lzwme/asmd-calc/commit/942bcfe10a64636bd028e67c611638e7ae29d5e5))

### 1.0.6 (2020-11-28)

### Bug Fixes

- 修正 div 方法的 bug(修正 Math.pow(-5) 导致的精度错误问题) ([8c168d8](https://github.com/lzwme/asmd-calc/commit/8c168d8c096502cfce5576c344e35a401f012711))

### 1.0.4 (2019-12-31)

### Features

- 增加AsmdCalc.value的get属性，可以通过读取value值得到当前的计算结果
