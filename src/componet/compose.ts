export function compose(middlewares: any[]) {
  /**
   * 校验 middlewares 格式
   */
  if (!Array.isArray(middlewares)) {
    throw new Error('middlewares must be an Array!');
  }

  /**
   * 校验 middleware 格式
   */
  for (let i = 0; i < middlewares.length; i++) {
    if (typeof middlewares[i] !== 'function') {
      throw new Error('middleware must be a function!');
    }
  }

  /**
   * @function wrapMiddleware
   *
   * @param {any} params
   * 请求参数传递给每一个middleware
   *
   * @param {function} next
   * 下一个中间件
   */
  return function wrapMiddleware(params: any, next?: any) {
    let index = -1;

    function dispatch(i: number) {
      if (index > i) {
        return Promise.reject(new Error('called multiple error!'));
      }

      index = i;

      /**
       * @param {function} currentFunction
       *
       * 当前中间件
       */
      const currentFunction = middlewares[i] || next;

      /**
       * 遍历结束
       */
      if (!currentFunction) {
        return Promise.resolve();
      }

      try {
        /**
         * 执行当前中间件并插入下一个中间件
         */
        return Promise.resolve(currentFunction(params, () => dispatch(i + 1)));
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return dispatch(0);
  };
}
/**
 * 同步 compose
 *
 * @param {...Function[]} functions
 */
export function composeSync(...functions: any[]) {
  if (functions.length === 0) {
    return (args: any) => args;
  }

  if (functions.length === 1) {
    return functions[0];
  }

  return functions.reduce(
    (a, b) =>
      (...args: any[]) =>
        a(b(...args))
  );
}

export function pipe(...functions: any[]) {
  if (functions.length === 0) {
    return (args: any) => args;
  }

  if (functions.length === 1) {
    return functions[0];
  }

  return functions.reduce(
    (a, b) =>
      (...args: any[]) =>
        b(a(...args))
  );
}
export default compose;
