/**
 * 新的计算器文件
 * @Author: centerm.gaohan
 * @Date: 2021-10-01 00:33:41
 * @Last Modified by: Harper.Gao
 * @Last Modified time: 2021-11-21 17:53:36
 */

import Skill from '@packages/core/skill';
import Support from '@packages/support/support';
import DpsCore from '@packages/core/core';
import {
  deepClone,
  getSpunkAttribute,
  increaseCriticalDamagePower,
  increaseSolarAttackPowerBase,
  increaseSpunk,
  increaseSolarOvercomePercent,
  increaseSurplusValue,
  increaseStrainPercent,
  makeSolarAttackPower,
  increaseSolarCriticalStrike,
} from '@componet/utils';
import { pipe } from '@componet/compose';
import { YiJinJingQiXueVersion, YiJinJingSkillEnchant } from '@types';
import { createSkillTimesChain, SkillTimes } from './skillTimesChain';
import { createSkillChains } from './skillChain';

export interface SkillChainPayload {
  core: DpsCore;
  support: Support;
  options: CreateCalculatorOptions;
  skillTimes: SkillTimes;
  skills: Array<Skill>;
}

export type CalculatorResult = {
  dps: number;
  total: number;
  seconds: number;
  skills: Skill[];
};

export const CALCULATOR_TIMES = 60 * 5;

export const calculateSkillsTotal = (skills: Skill[]): number => {
  let totalDamage = 0;

  skills.forEach(skill => {
    totalDamage += skill.subTotal;
  });
  return totalDamage;
};

export const calculateSkillsPercent = (totalDamage: number, skills: Skill[]) => {
  const length = skills.length;
  for (let i = 0; i < length; i++) {
    const currentSkill = skills[i];
    currentSkill.percent = currentSkill.subTotal / totalDamage;
  }
};

export type CreateCalculatorOptions = {
  qiXueVersion: YiJinJingQiXueVersion;
  skillEnchant?: YiJinJingSkillEnchant;
};

const initCreateCalculatorOptions: CreateCalculatorOptions = {
  qiXueVersion: YiJinJingQiXueVersion.XinZheng,
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
  options: CreateCalculatorOptions = initCreateCalculatorOptions
): CalculatorResult => {
  const calculatorResult: CalculatorResult = {
    dps: 0,
    total: 0,
    seconds: 0,
    skills: [],
  };

  const supportContext = support.getSupportAttributeSync();
  // 计算目标伤害系数
  support.target.calculateDamageCoefficient(supportContext);

  const coreClone = deepClone(core);
  const increasedSpunkFromSupportContext = getSpunkAttribute(supportContext);

  // 生成核心计算类 baseCore
  const getBaseCore = pipe(
    (pipeCore: DpsCore) => increaseSpunk(pipeCore, increasedSpunkFromSupportContext),
    (pipeCore: DpsCore) => increaseSolarCriticalStrike(pipeCore, supportContext),
    (pipeCore: DpsCore) => increaseCriticalDamagePower(pipeCore, supportContext),
    (pipeCore: DpsCore) => increaseSolarOvercomePercent(pipeCore, supportContext),
    (pipeCore: DpsCore) => increaseStrainPercent(pipeCore, supportContext),
    (pipeCore: DpsCore) => increaseSurplusValue(pipeCore, supportContext),
    (pipeCore: DpsCore) => increaseSolarAttackPowerBase(pipeCore, supportContext),
    (pipeCore: DpsCore) => makeSolarAttackPower(pipeCore)
  );
  const baseCore = getBaseCore(coreClone);
  // 生成计算器技能配置文件

  const payload: SkillChainPayload = {
    core: baseCore,
    support,
    options,
    skillTimes: {} as any,
    skills: [],
  };
  const skillTimes = createSkillTimesChain(payload);
  payload.skillTimes = skillTimes;
  createSkillChains(payload);

  const { skills } = payload;

  const totalDamage = calculateSkillsTotal(skills);
  calculateSkillsPercent(totalDamage, skills);

  const dps = totalDamage / CALCULATOR_TIMES;

  calculatorResult.dps = dps;
  calculatorResult.total = totalDamage;
  calculatorResult.skills = skills;
  calculatorResult.seconds = CALCULATOR_TIMES;
  return calculatorResult;
};
