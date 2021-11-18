/**
 * 新的计算器文件
 * @Author: centerm.gaohan
 * @Date: 2021-10-01 00:33:41
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-11-18 18:37:52
 */

import invariant from 'invariant';
import Skill from '../packages/core/skill_new';
import { Support, Target } from '../packages/support';
import { Gain, GainOptions, YiJinJingValues } from '../types';
import DpsCore, { createDpsCoreZongGongJi, } from '../packages/core/core_new';
import { combineAttributeCoefficient, combineMainAttribute, combineStandAttribute } from '../packages/support/support';
import { createConfig } from './CalculatorWoker';
import { deepClone } from '../componet/utils';

export default class CalculatorBase {
  /**
   * 计算器版本
   */
  public CalculatorVersion: any;
  public options: any;
  /**
   * 技能列表
   */
  public skills: Array<Skill> = [];
  /**
   * 核心类
   * @type {Core}
   * @memberof CalculatorBase
   */
  public core: DpsCore;
  /**
   * 辅助类
   *
   * @type {Support}
   * @memberof CalculatorBase
   */
  public support: Support;
  /**
   * 目标类
   *
   * @type {Target}
   * @memberof CalculatorBase
   */
  public target: Target;
  /**
   * 职业
   *
   * @type {string}
   * @memberof CalculatorBase
   */
  public professtion: string;
  /**
   * 心法
   *
   * @type {string}
   * @memberof CalculatorBase
   */
  public className: string;
  /**
   * 战斗时间 单位：秒 
   * 默认 5分钟 300秒
   *
   * @type {number}
   * @memberof CalculatorBase
   */
  public seconds: number;
  /**
   * 总期望
   *
   * @type {number}
   * @memberof CalculatorBase
   */
  public totalExpectation: number;

  /**
   * dps
   *
   * @type {number}
   * @memberof CalculatorBase
   */
  public dps: number;

  constructor(options: any = {}) {
    this.options = options;

    invariant(!!options.support, '辅助类不能为空');
    this.support = new Support(options.support);

    this.seconds = options.seconds || (5 * 60);
  }

  /**
   * 使用增益
   *
   * @memberof CalculatorBase
   */
  public use(gain: string | Gain, rest: GainOptions) {
    this.support.use(gain as any, rest);
  }

  /**
   * 删除增益
   *
   * @param {string} gain
   * @memberof CalculatorBase
   */
  public remove(gain: string) {
    this.support.remove(gain);
  }

  /**
   * 覆盖增益
   *
   * @param {Gain[]} gains
   * @memberof CalculatorBase
   */
  public setGain(gains: Gain[]) {
    this.support.setGain(gains);
  }

  /**
   * 添加技能
   *
   * @param {Skill[]} [skills=[]]
   * @memberof CalculatorBase
   */
  public addSkills(skills: Skill[] = []) {
    this.skills = skills;
  }

  public addSkill(skill: Skill) {
    this.skills.push(skill);
  }
}

type CalculatorResult = {
  dps: number;
  total: number;
  seconds: number;
  skills: Skill[];
}

/**
 * 创建易筋经计算器
 *
 * @param {DpsCore} core 核心类
 * @param {Support} support 辅助类
 * @param {YiJinJingValues} version 计算器版本
 */
export const createCalculator = function createYiJinJingCalculatro(
  core: DpsCore,
  support: Support,
  version: YiJinJingValues
): CalculatorResult {

  /**
   * 计算结果
   */
  let calculatorResult: CalculatorResult = {
    dps: 0,
    total: 0,
    seconds: 0,
    skills: [],
  };

  try {
    // 获得全局辅助对象
    let supportContext = support.getSupportAttributeSync();
    /**
     * 把增益的属性结合core 生成最终计算类
     */
    let baseCore = deepClone(core);

    // 先增加主属性相关
    combineMainAttribute(baseCore, supportContext, baseCore.mainCoeffiecient as any);
    // 增加其他基础属性
    combineStandAttribute(baseCore, supportContext);
    // 增加系数相关 如破防系数、基础攻击系数
    combineAttributeCoefficient(baseCore, supportContext);
    // 生成面板攻击
    createDpsCoreZongGongJi(baseCore);

    // 生成计算器技能配置文件
    const calculatorConfig = createConfig(
      baseCore,
      support,
      version,
    );
    const { skills } = calculatorConfig;

    let totalDamage = 0;

    skills.forEach(skill => {
      totalDamage += skill.subTotal;
    });

    let dps = totalDamage / 300;

    calculatorResult.dps = dps;
    calculatorResult.total = totalDamage;
    calculatorResult.skills = skills;
    calculatorResult.seconds = 300;
  } catch (error) {
    console.log('计算器执行计算时出错！', error);
  } finally {
    return calculatorResult;
  }
}