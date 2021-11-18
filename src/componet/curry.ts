// 柯里化
function curry<T>(fn: Function) {

  // 存放所有参数
  const args = [].slice.call(arguments, 1);

  return function (...rest: any[]): T {
    const newArgs = args.concat([].slice.call(arguments));
    return fn.apply(null, newArgs);
  }
}

/**
 * 在curry基础上实现一个设置参数数量的柯里化函数
 *
 * @param {*} fn
 * @param {*} len
 * @return {*} 
 */
function curryHelper(fn: Function, len?: number) {
  const length = len || fn.length;

  return function () {
    let selfArgs = [].slice.call(arguments);

    if (selfArgs.length >= length) {
      return fn.apply(this, selfArgs);
    } else {
      // 在通用currying函数基础上
      return curryHelper(
        curry.apply(null, [fn].concat(selfArgs)),
        length - selfArgs.length
      );
    }
  };
}

export { curry, curryHelper };
export default curry;