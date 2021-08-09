import Core from '../core/core';
import Support from '../support/support';
import Skill from '../core/skill';
import { SupportContext, SkillContext } from '../types';
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
     * 是否有技能套装
     *
     * @type {boolean}
     * @memberof CalculatorBase
     */
    skillSetBonueseToken: boolean;
    /**
     * 技能套装系数
     *
     * @type {number}
     * @memberof CalculatorBase
     */
    skillCoefficient: number;
    /**
     * 战斗时间 单位：秒
     * 默认 5分钟 300秒
     *
     * @type {number}
     * @memberof CalculatorBase
     */
    seconds: number;
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
    initContructor(initCore: Core): Promise<void>;
    /**
     * 基类 method 计算所有技能伤害
     *
     * @memberof CalculatorBase
     */
    executeCalculator(): Promise<void>;
    addSkills(skills?: Skill[]): void;
    total(): Promise<void>;
    /**
     * 执行单个技能任务
     *
     * @param {Skill} skill
     * @memberof CalculatorBase
     */
    execute(skill: Skill): Promise<SkillContext>;
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
