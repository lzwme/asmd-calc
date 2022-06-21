import * as asmdCalc from '../src/lib/calculation';
import * as jsRawCalc from './calc/js-raw-calc';
import * as mathjsCalc from './calc/mathjs-calc';
import * as decimalCalc from './calc/decimal-calc';
import { benchmarkStart } from './benchmark';

benchmarkStart(jsRawCalc, 'jsRawCalc');
console.log('----------------------------------------');
benchmarkStart(asmdCalc, 'asmdCalc');
console.log('----------------------------------------');
benchmarkStart(mathjsCalc, 'mathjs');
console.log('----------------------------------------');
benchmarkStart(decimalCalc, 'decimal');
