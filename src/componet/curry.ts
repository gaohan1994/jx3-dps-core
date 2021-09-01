
function curry<T>(fn: Function) {

  // 存放所有参数
  const args = [].slice.call(arguments, 1);

  return function (...rest: any[]): T {
    const newArgs = args.concat([].slice.call(arguments));
    return fn.apply(null, newArgs);
  }
}
export default curry;