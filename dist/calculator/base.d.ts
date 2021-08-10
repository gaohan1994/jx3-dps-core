import Core from '../core/core';
import Support from '../support/support';
import Target from '../support/target';
import { SupportContext } from '../types';
import Skill from '../core/skill';
declare class CalculatorBase {
    options: any;
    /**
     * 技能列表
     *
     * @type {Array<Skill>}
     * @memberof CalculatorBase
     */
    skills: Array<Skill>;
    /**
     * 核心类
     *
     * @type {Core}
     * @memberof CalculatorBase
     */
    core: Core;
    /**
     * 辅助类
     *
     * @type {Support}
     * @memberof CalculatorBase
     */
    support: Support;
    /**
     * 目标类
     *
     * @type {Target}
     * @memberof CalculatorBase
     */
    target: Target;
    supportContext: SupportContext;
    /**
     * 职业
     *
     * @type {string}
     * @memberof CalculatorBase
     */
    professtion: string;
    /**
     * 心法
     *
     * @type {string}
     * @memberof CalculatorBase
     */
    className: string;
    /**
     * 技能套装系数
     */
    skillSetBonuseCoefficient: number;
    /**
     * 战斗时间 单位：秒
     * 默认 5分钟 300秒
     *
     * @type {number}
     * @memberof CalculatorBase
     */
    seconds: number;
    /**
     * 总期望
     *
     * @type {number}
     * @memberof CalculatorBase
     */
    totalExpectation: number;
    /**
     * dps
     *
     * @type {number}
     * @memberof CalculatorBase
     */
    dps: number;
    /**
     * 技能次数库，由子类填充
     *
     * @type {{
     *     [name: string]: number;
     *   }}
     * @memberof CalculatorBase
     */
    skillTimesLib: {
        [name: string]: number;
    };
    constructor(options?: any);
    /**
     * 传入技能名称返回战斗时间内该技能次数
     *
     * @param {string} skillName
     * @memberof CalculatorBase
     */
    getSkillTimes(skillName: string): number;
    /**
     * 获得core类
     *
     * @return {*}  {Core}
     * @memberof CalculatorBase
     */
    getCore(): Core;
    /**
     * 获得辅助类
     *
     * @return {*}  {SupportContext}
     * @memberof CalculatorBase
     */
    getSupportContext(): SupportContext;
    getSupport(): Support;
    /**
     * 获得目标类
     *
     * @return {*}  {Target}
     * @memberof CalculatorBase
     */
    getTarget(): Target;
    /**
     * 添加技能
     *
     * @param {Skill[]} [skills=[]]
     * @memberof CalculatorBase
     */
    addSkills(skills?: Skill[]): void;
    /**
     * 生成最终核心类
     *
     * @memberof CalculatorBase
     */
    initUltimate(): Promise<void>;
    /**
     * 基类 method 计算所有技能伤害
     *
     * @memberof CalculatorBase
     */
    executeCalculator(): Promise<{
        totalExpectation: number;
        seconds: number;
        dps: number;
        skills: Skill[];
    }>;
    /**
     * 计算
     *
     * @memberof CalculatorBase
     */
    total(): Promise<{
        totalExpectation: number;
        seconds: number;
        dps: number;
        skills: Skill[];
    }>;
    /**
     * 生成最终属性
     *
     * @memberof DpsCore
     */
    generateUltimate(core: Core, ctx: SupportContext): Core;
    showCalculatorValue(): void;
    showSkills(): void;
    showCoreValue(): void;
    showSupportValue(): void;
}
export default CalculatorBase;
