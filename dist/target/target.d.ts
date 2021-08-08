import { TargetMode } from "../types";
/**
 * 目标类
 *
 * @Author: centerm.gaohan
 * @Date: 2021-08-08 16:16:36
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-08 16:21:29
 */
declare class Target {
    /**
     * 缓存参数
     *
     * @memberof Target
     */
    options: any;
    /**
     * 目标类型
     *
     * @type {TargetMode}
     * @memberof Target
     */
    mode: TargetMode;
    /**
     * 目标等级
     *
     * @type {number}
     * @memberof Target
     */
    level: number;
    constructor(options: any);
}
export default Target;
