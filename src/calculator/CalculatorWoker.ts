/**
 * @Author: centerm.gaohan
 * @Date: 2021-10-01 00:37:06
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-11-19 10:12:23
 */
import Skill from '@packages/core/skill';
import DpsCore from '@packages/core/core';
import Support from '@packages/support/support';
import { createEnum } from '@types';
import { CreateCalculatorOptions } from './calculator';
import { createSkillTimesChain, SkillNames, SkillTimes } from './skillTimesChain';
import { createSkillChains } from './skillChain';

export const YiJinJingQiXueVersion = createEnum([SkillNames.XinZheng, SkillNames.TiHuGuanDing]);
export type YiJinJingQiXueVersion = keyof typeof YiJinJingQiXueVersion;

export const YiJinJingSkillEnchant = createEnum(['YunShanJingCanJuan', 'YunShanJingYuJian']);
export type YiJinJingSkillEnchant = keyof typeof YiJinJingSkillEnchant;

export interface SkillChainPayload {
  core: DpsCore;
  support: Support;
  options: CreateCalculatorOptions;
  skillTimes: SkillTimes;
  skills: Array<Skill>;
}

/**
 * 根据传入的 version 生成对应的 config
 *
 * @param {YiJinJingValues} version
 */
export const createConfig = (core: DpsCore, support: Support, options: CreateCalculatorOptions) => {
  try {
    // 计算器配置文件
    const payload: SkillChainPayload = {
      core,
      support,
      options,
      skillTimes: {} as any,
      skills: [],
    };
    const skillTimes = createSkillTimesChain(payload);
    payload.skillTimes = skillTimes;
    payload.skills = createSkillChains(payload);
    return payload;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('初始化技能配置时出错', error);
  }
};
