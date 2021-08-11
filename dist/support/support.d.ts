/**
 * 辅助类
 *
 * @Author: centerm.gaohan
 * @Date: 2021-08-08 16:29:54
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-11 15:21:44
 */
import { SupportMode, SupportContext } from "../types";
import { Target, TargetOptions, SupportBase, SupportBaseOptions } from './index';
export interface SupportOptions extends SupportBaseOptions {
    mode: SupportMode;
    target?: TargetOptions;
}
declare class Support extends SupportBase {
    static Mode: any;
    /**
     * 辅助类类型
     *
     * @type {SupportMode}
     * @memberof Support
     */
    mode: SupportMode;
    /**
     * 缓存参数
     *
     * @memberof Target
     */
    options: any;
    /**
     * 个人增益模块
     *
     * @type {PersonBuff}
     * @memberof Support
     */
    /**
     * 团队增益模块
     *
     * @type {TeamBuff}
     * @memberof Support
     */
    /**
     * 目标
     *
     * @type {Target}
     * @memberof Support
     */
    target: Target;
    constructor(options: SupportOptions);
    /**
     * 获得辅助总增益
     *
     * @return {*}  {Promise<SupportContext>}
     * @memberof Support
     */
    getSupportAttribute(): Promise<SupportContext>;
    /**
     * 打印属性
     *
     * @memberof Support
     */
    showSupportValue(): void;
    /**
     * 是否有技能套装
     *
     * @return {*}
     * @memberof PersonBuff
     */
    hasSkillSetBonuese(): boolean;
    hasCw(): boolean;
    /**
     * 是否由属性套装
     *
     * @return {*}
     * @memberof PersonBuff
     */
    hasValueSetBonuese(): boolean;
}
export default Support;
