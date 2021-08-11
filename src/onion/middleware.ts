
import { compose } from './index';

/**
 * 中间件类
 *
 * @class CoreMiddleware
 */
class CoreMiddleware {

  public middlewares: any[];

  /**
   * @method constructor
   * 构造函数
   *
   * @param {Array[middlewares]} defaultMiddlewares
   * 默认中间件数组
   */
  constructor(defaultMiddlewares: any[]) {
    if (!Array.isArray(defaultMiddlewares)) {
      throw new Error('middlewares must be an array!');
    }

    /**
     * @param {Array<middlewares>} middlewares
     */
    this.middlewares = [...defaultMiddlewares];
  }

  /**
   * @method use
   * 使用中间件
   *
   * @param {*} newMiddleware
   * @param {*} [options={}]
   * @memberof CoreMiddleware
   */
  use(newMiddleware: any) {
    if (typeof newMiddleware !== 'function') {
      throw new Error('middleware must be a function!');
    }

    /**
     * 插入中间件中
     */
    this.middlewares.push(newMiddleware);
  }

  /**
   * 执行函数
   * 传入请求参数，并传入参数遍历并执行所有中间件函数
   *
   * @param {params} [params=null]
   * 请求参数
   *
   * @return {Function}
   * @memberof CoreMiddleware
   */
  execute(params: any = null) {
    const composeMiddlewares = compose([
      ...this.middlewares
    ]);

    return composeMiddlewares(params);
  }
}

export default CoreMiddleware;
