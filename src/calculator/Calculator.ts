/**
 * 新的计算器文件
 * @Author: centerm.gaohan
 * @Date: 2021-10-01 00:33:41
 * @Last Modified by: Harper.Gao
 * @Last Modified time: 2021-11-21 17:53:36
 */

import Skill from '@packages/core/skill';
import Support from '@packages/support/support';
import { createEnum } from '@types';
import DpsCore from '@packages/core/core';
import { createConfig } from './calculatorWoker';
import {
  calculateSkillsPercent,
  calculateSkillsTotal,
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
} from '@componet/utils';
import { pipe } from '@componet/compose';

export const YiJinJingVersions = createEnum(['Normal', 'Immortal']);
export type YiJinJingVersions = keyof typeof YiJinJingVersions;

export type CalculatorResult = {
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
export const createCalculator = (
  core: DpsCore,
  support: Support,
  version: YiJinJingVersions
): CalculatorResult => {
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

  const totalDamage = calculateSkillsTotal(skills);
  calculateSkillsPercent(totalDamage, skills);

  const dps = totalDamage / 300;

  calculatorResult.dps = dps;
  calculatorResult.total = totalDamage;
  calculatorResult.skills = skills;
  calculatorResult.seconds = 300;
  return calculatorResult;
};
