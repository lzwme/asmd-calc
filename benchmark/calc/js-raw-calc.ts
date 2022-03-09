type ArgsMutiItem = number | string;
type ArgsMuti = ArgsMutiItem[];

/** 加法 */
export function add(...args: ArgsMuti) {
  let total = 0;
  args.forEach((value) => {
    if (value != null) total += Number(value);
  });
  return total;
}
/** 减法 */
export function sub(...args: ArgsMuti) {
  let total = Number(args[0]) || 0;
  args.slice(1).forEach((value) => {
    if (value != null) total -= Number(value);
  });
  return total;
}
/** 乘法 */
export function mul(...args: ArgsMuti) {
  if (!args.length) return 0;
  let total = 1;
  args.forEach((value) => {
    if (value != null) total *= Number(value);
  });
  return total;
}
/** 除法 */
export function div(...args: ArgsMuti) {
  let total = Number(args[0]) || 0;
  if (!total) return 0;

  args.slice(1).forEach((value) => {
    if (value != null) total /= Number(value);
  });
  return total;
}
