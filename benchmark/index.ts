import * as asmdCalc from '../src/lib/calculation';
import * as jsRawCalc from './calc/js-raw-calc';
import * as mathjsCalc from './calc/mathjs-calc';
import * as decimalCalc from './calc/decimal-calc';
import { benchmarkStart } from './benchmark';

function doBenchmark() {
  const jsResult = benchmarkStart(jsRawCalc, 'jsRawCalc');
  console.log('----------------------------------------');
  const asmdResult = benchmarkStart(asmdCalc, 'asmdCalc');
  console.log('----------------------------------------');
  const mathjsResult = benchmarkStart(mathjsCalc, 'mathjs');
  console.log('----------------------------------------');
  const decimalResult = benchmarkStart(decimalCalc, 'decimal');

  const result = { jsRaw: jsResult, asmd: asmdResult, decimal: decimalResult, mathjs: mathjsResult };
  console.log(result);
  // print for markdown table
  const testTypes = Object.keys(result.jsRaw).filter((k) => k !== 'times');

  testTypes.forEach((type) => {
    console.log(`\n\`${type}-${result.jsRaw.times}times\`:\n`);
    console.log('| type/timeConst |', Object.keys(result).join(' | '), ' |');
    console.log(`| --- |    ---    |    ---    |    ---    |    ---    |`);
    ['add', 'sub', 'mul', 'div'].forEach((key) => {
      console.log(
        `| ${key} |`,
        Object.values(result)
          .map((d) => d[type][key] + 'ms')
          .join(' | '),
        ' | '
      );
    });
  });
}

doBenchmark();
