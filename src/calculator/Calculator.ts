/**
 * 新的计算器文件
 * @Author: centerm.gaohan
 * @Date: 2021-10-01 00:33:41
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-11-19 10:12:18
 */

import invariant from 'invariant';
import Skill from '../packages/core/skill_new';
import { Support, Target } from '../packages/support';
import { Gain, GainOptions, YiJinJingValues } from '../types';
import DpsCore from '../packages/core/core_new';
import { createConfig } from './CalculatorWoker';
import {
  deepClone,
  getYuanQiAttribute,
  increaseHuiXiao,
  increaseHuiXin,
  increaseJiChuGongJi,
  increaseMainAttribute,
  increasePoFang,
  increasePoZhao,
  increaseWuShuang,
  makeZongGongJi,
} from '../componet/utils';
import { pipe } from '../componet';

export default class CalculatorBase {
  public CalculatorVersion: any;
  public options: any;

  public skills: Array<Skill> = [];

  public core: DpsCore;

  public support: Support;

  public target: Target;

  public professtion: string;

  public className: string;
  /**
   * 战斗时间 单位：秒
   * 默认 5分钟 300秒
   *
   * @type {number}
   * @memberof CalculatorBase
   */
  public seconds: number;

  public totalExpectation: number;

  public dps: number;

  constructor(options: any = {}) {
    this.options = options;

    invariant(!!options.support, '辅助类不能为空');
    this.support = new Support(options.support);
    this.seconds = options.seconds || 5 * 60;
  }

  public use(gain: string | Gain, rest: GainOptions) {
    this.support.use(gain as any, rest);
  }

  public remove(gain: string) {
    this.support.remove(gain);
  }

  public setGain(gains: Gain[]) {
    this.support.setGain(gains);
  }

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
};

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
  const calculatorResult: CalculatorResult = {
    dps: 0,
    total: 0,
    seconds: 0,
    skills: [],
  };

  const supportContext = support.getSupportAttributeSync();
  const coreClone = deepClone(core);
  const increasedMainAttributesFromSupportContext = getYuanQiAttribute(supportContext);

  // 生成核心计算类 baseCore
  const getBaseCore = pipe(
    () => increaseMainAttribute(coreClone, increasedMainAttributesFromSupportContext),
    (core: DpsCore) => increaseHuiXin(core, supportContext),
    (core: DpsCore) => increaseHuiXiao(core, supportContext),
    (core: DpsCore) => increasePoFang(core, supportContext),
    (core: DpsCore) => increaseWuShuang(core, supportContext),
    (core: DpsCore) => increasePoZhao(core, supportContext),
    (core: DpsCore) => increaseJiChuGongJi(core, supportContext),
    (core: DpsCore) => makeZongGongJi(core)
  );
  const baseCore = getBaseCore();

  // 生成计算器技能配置文件
  const calculatorConfig = createConfig(baseCore, support, version);
  const { skills } = calculatorConfig;

  let totalDamage = 0;

  skills.forEach(skill => {
    totalDamage += skill.subTotal;
  });

  const dps = totalDamage / 300;

  calculatorResult.dps = dps;
  calculatorResult.total = totalDamage;
  calculatorResult.skills = skills;
  calculatorResult.seconds = 300;
  return calculatorResult;
};
