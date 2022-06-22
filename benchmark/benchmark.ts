import * as asmdCalc from '../src/lib/calculation';

function benchmark(desc: string, fn: () => unknown, times = 10_000) {
  // 预执行 N 次
  let preTimes = 100_000;
  while (preTimes--) fn();

  const startTime = process.hrtime.bigint();
  const label = `benchmark-${desc}-${times}`;

  console.time(label);
  while (times--) fn();
  console.timeEnd(label);

  const timeCost = Number(process.hrtime.bigint() - startTime) / 1_000_000;
  // console.log(label, ':', timeCost, 'ms');

  return timeCost;
}

export function benchmarkStart(calc: Partial<typeof asmdCalc> = asmdCalc, desc: string, times = 10_000) {
  let fns = {
    add: () => {
      const list = [
        { param: [0.1, 0.2], value: 0.3 },
        { param: [1, 2, 0.1, 0.2, 0.3], value: 3.6 },
        { param: [null, 1.1, 2.2, 3, 4], value: 10.3 },
        { param: [void 0, 1, 1, 1.2, 1.1], value: 4.3 },
        { param: [1.11111, 2.999], value: 4.11011 },
        { param: [111111, 299900, 0.1, 0.2], value: 411011.3 },
        { param: [1e-10, 2e-10], value: 3e-10 },
      ];

      list.forEach((item) => {
        calc.add(...item.param);
      });
    },
    sub: () => {
      const list = [
        [3, 2, 1],
        [null, 3, -3],
        [1, null, 1],
        [void 0, 3, -3],
        [3, void 0, 3],
        [4.11011, 1.11111, 2.999],
        [411011, 111111, 299900],
      ];

      list.forEach((item) => {
        calc.sub(item[0], item[1]);
      });
    },
    mul: () => {
      const list = [
        [3, 2, 6],
        [null, 3, 0],
        [1, null, 0],
        [void 0, 3, 0],
        [3, void 0, 0],
        [1.11, 1.11, 1.2321],
        [111, 111, 12321],
        ['10.00', '10.1', 101],
        [4.11011, 100000, 411011],
      ];

      list.forEach((item) => {
        calc.mul(item[0], item[1]);
      });
    },
    div: () => {
      const list = [
        [0, 0, NaN],
        [6, 3, 2],
        [6, 0, Infinity],
        [null, 3, 0],
        [1, null, Infinity],
        [void 0, 3, 0],
        [3, void 0, Infinity],
        [1.2321, 1.11, 1.11],
        [12321, 111, 111],
        [101, '10.00', 10.1],
        [4.86111, 100, 0.0486111],
      ] as const;

      list.forEach((item) => {
        calc.div(item[0], item[1]);
      });
    },
  };
  const result = {
    random: {} as Record<string, number>,
    decimal: {} as Record<string, number>,
    integer: {} as Record<string, number>,
    times,
  };

  console.log(`[${desc}]benchmark:`);
  for (const type in fns) result.random[type] = benchmark(`${desc}-${type}`, fns[type], times);
  console.log();

  fns = {
    add: () => {
      calc.add(0.1, 0.2, 0.3);
    },
    sub: () => {
      calc.sub(0.3, 0.2, 0.1);
    },
    mul: () => {
      calc.mul(0.1, 0.2, 0.3);
    },
    div: () => {
      calc.div(0.6, 0.1, 0.2);
    },
  };
  console.log(`[${desc}]benchmark-decimal:`);
  for (const type in fns) result.decimal[type] = benchmark(`${desc}-${type}`, fns[type], times);
  console.log();

  fns = {
    add: () => {
      calc.add(100, 200, 300);
    },
    sub: () => {
      calc.sub(300, 200, 100);
    },
    mul: () => {
      calc.mul(100, 200, 300);
    },
    div: () => {
      calc.div(600, 100, 200);
    },
  };

  console.log(`[${desc}]benchmark-integer:`);
  for (const type in fns) result.integer[type] = benchmark(`${desc}-${type}`, fns[type], times);
  console.log();

  return result;
}
