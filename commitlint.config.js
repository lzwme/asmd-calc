/*
 * @Author: gflizhiwen
 * @Date: 2019-06-28 08:13:41
 * @LastEditors: gflizhiwen
 * @LastEditTime: 2019-10-21 16:42:50
 * @Description: Git 提交规范 commitlint 校验配置
 * {@link http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html | 提交规范说明参考}
 */

'use strict';
const message = process.env['HUSKY_GIT_PARAMS'];
const fs = require('fs');

const types = [
  'build', // 构建执行
  'chore', // 琐碎的/乏味无聊的/构建工具相关的
  'ci', // CI 相关
  'docs', // 文档更新
  'feat', // 新功能
  'fix', // bug 修复
  'perf', // 性能优化
  'refactor', // 功能重构
  'release',
  'revert', // 回滚操作
  'style', // 样式变动
  'test', // 单元测试
];

const scopes = ['showcase', 'packaging', 'changelog', 'schematics', 'module:*'];

function parseMessage(message) {
  const PATTERN = /^(\w+)(?:\(([^)]+)\))?\: (.+)$/;
  const match = PATTERN.exec(message);
  if (!match) {
    return null;
  }
  return {
    type: match[1] || null,
    scope: match[2] || null,
  };
}

function getScopesRule() {
  const messages = fs.readFileSync(message, { encoding: 'utf-8' });
  const parsed = parseMessage(messages.split('\n')[0]);
  if (!parsed) {
    return [2, 'always', scopes];
  }
  const { scope, type } = parsed;
  if (scope && !scopes.includes(scope) && type !== 'release' && !/module:.+/.test(scope)) {
    return [2, 'always', scopes];
  } else {
    return [2, 'always', []];
  }
}

module.exports = {
  extends: ['@commitlint/config-angular'],
  rules: {
    'type-enum': [2, 'always', types],
    'scope-enum': getScopesRule,
  },
};
