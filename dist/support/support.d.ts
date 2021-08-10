import { SupportMode, SupportContext } from "../types";
import Target from './target';
import SupportBase from './base';
declare class Support extends SupportBase {
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
    constructor(options?: any);
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
