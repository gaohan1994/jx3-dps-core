import { SkillContext, SupportContext } from '../types';
import DpsCore from './core';
import { Target } from '../support';
interface SkillParamFunction {
    (ctx: SkillContext): number;
}
declare type SkillParam = number | SkillParamFunction;
interface Options {
    skillName: string;
    skillTimes: number;
    core: DpsCore;
    target: Target;
    supportContext: SupportContext;
    skillBasicNumber?: number;
    basicDamage?: SkillParam;
    basicDamageCoefficient?: SkillParam;
    poFangCoefficient?: SkillParam;
    wuShuangCoefficient?: SkillParam;
    huiXinHuiXiaoCoefficient?: SkillParam;
    targetDamageCoefficient?: SkillParam;
    damageBonuesCoefficient?: SkillParam;
    extra?: SkillParam;
}
declare class Skill {
    options: Options;
    skillName: string;
    /**
     * 技能次数
     *
     * @type {number}
     * @memberof Skill
     */
    skillTimes: number;
    /**
     * 核心类 core
     * @type {DpsCore}
     *
     * 辅助类 supportContext
     * @type {Target}
     *
     * 目标 target
     * @type {SupportContext}
     * @memberof Skill2
     */
    core: DpsCore;
    target: Target;
    supportContext: SupportContext;
    /**
     * 技能基础数值很小的那个
     *
     * @type {number}
     * @memberof Skill2
     */
    skillBasicNumber: number;
    /**
      * 基础伤害
      *
      * @type {number}
      * @memberof Skill
      */
    basicDamage: number;
    /**
     * 基础攻击系数
     *
     * @type {SkillParam}
     * @memberof Skill2
     */
    basicDamageCoefficient: number;
    /**
     * 破防系数
     *
     * @type {SkillParam}
     * @memberof Skill2
     */
    poFangCoefficient: number;
    /**
     * 无双系数
     *
     * @type {SkillParam}
     * @memberof Skill2
     */
    wuShuangCoefficient: number;
    /**
     * 会心会笑计算系数
     *
     * @type {SkillParam}
     * @memberof Skill2
     */
    huiXinHuiXiaoCoefficient: number;
    /**
     * 目标伤害系数
     *
     * @type {SkillParam}
     * @memberof Skill2
     */
    targetDamageCoefficient: number;
    /**
     * 易伤系数
     *
     * @type {SkillParam}
     * @memberof Skill2
     */
    damageBonuesCoefficient: number;
    /**
     * 额外伤害
     *
     * @type {number}
     * @memberof Skill2
     */
    extra: number;
    /**
     * 本技能小计
     *
     * @type {number}
     * @memberof Skill2
     */
    subTotal: number;
    /**
     * 占总输出百分比
     *
     * @type {number}
     * @memberof Skill
     */
    percent: number;
    constructor(options: Options);
    /**
     * 计算技能小计
     *
     * @return {*}  {number}
     * @memberof Skill2
     */
    calculator(): this;
    showSkillInfo(): void;
}
export default Skill;
export declare function formatNumber(value: number): number;
