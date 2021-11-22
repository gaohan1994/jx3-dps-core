/* eslint-disable no-console */
/**
 * 技能类
 * @Author: centerm.gaohan
 * @Date: 2021-08-08 19:45:42
 * @Last Modified by: Harper.Gao
 * @Last Modified time: 2021-11-21 17:29:49
 */
import invariant from 'invariant';
import DpsCore from './core';
import { Support } from '../support';
import { combination, MiJi } from './miji';
import { createEnum } from '@/types';
import { pipe } from '@/componet/compose';

const SkillMultiplicationInterfaceEnum = createEnum([
  'poFangCoefficient',
  'wuShuangCoefficient',
  'huiXinHuiXiaoCoefficient',
  'targetDamageCoefficient',
  'damageBonuesCoefficient',
  'skillTimes',
]);
type SkillMultiplicationInterfaceEnum = keyof typeof SkillMultiplicationInterfaceEnum;

interface ISkill {
  [key: string]: any;
}

const calculateBasicNumber = (skill: Skill) => {
  skill.subTotal = skill.skillBasicNumber + skill.basicDamage * skill.basicDamageCoefficient;
  return skill;
};
const createMultiplicationSkillEquation =
  (calculateKey: SkillMultiplicationInterfaceEnum) =>
  (skill: Skill): Skill => {
    invariant(
      typeof skill.subTotal === 'number',
      `[Skill-Subtotal-Error][Skill-Name: ${skill.skillName}]技能subtotal缺失`
    );
    const { debug } = skill;
    debug &&
      console.log(
        `[Skill-Subtotal-Debug][Skill-Name: ${skill.skillName}]Skill before calculate ${calculateKey}:`,
        skill.subTotal
      );
    skill.subTotal *= (skill as ISkill)[calculateKey];
    debug &&
      console.log(
        `[Skill-Subtotal-Debug][Skill-Name: ${skill.skillName}]Skill after calculate ${calculateKey}:`,
        skill.subTotal
      );
    return skill;
  };

const calculatePoFang = createMultiplicationSkillEquation(
  SkillMultiplicationInterfaceEnum.poFangCoefficient
);
const calculateWuShuang = createMultiplicationSkillEquation(
  SkillMultiplicationInterfaceEnum.wuShuangCoefficient
);
const calculateHuiXinHuiXiao = createMultiplicationSkillEquation(
  SkillMultiplicationInterfaceEnum.huiXinHuiXiaoCoefficient
);
const calculateTargetDamage = createMultiplicationSkillEquation(
  SkillMultiplicationInterfaceEnum.targetDamageCoefficient
);
const calculateDamageBonues = createMultiplicationSkillEquation(
  SkillMultiplicationInterfaceEnum.damageBonuesCoefficient
);
const calculateSkillTimes = createMultiplicationSkillEquation(
  SkillMultiplicationInterfaceEnum.skillTimes
);
const calculateSkillExtra = (skill: Skill): Skill => {
  skill.subTotal += skill.extra || 0;
  return skill;
};

export default class Skill {
  public debug: boolean;
  public skillName: string; // 技能名称
  public skillTitle: string; // 技能中文名称
  public skillTimes: number;
  public skillBasicNumber: number; // 技能基础数值很小的那个
  public basicDamage: number; // 基础伤害
  public basicDamageCoefficient: number; // 基础攻击系数
  public poFangCoefficient: number; // 破防系数
  public wuShuangCoefficient: number; // 无双系数
  public huiXinHuiXiaoCoefficient: number; // 会心会笑计算系数
  public targetDamageCoefficient: number; // 目标伤害系数
  public damageBonuesCoefficient: number; // 易伤系数
  public miJi?: MiJi[]; // 技能秘籍 unstable
  public extra?: number; // 额外伤害
  public subTotal?: number; // 本技能小计
  public percent?: number; // 占总输出百分比

  constructor(options: any) {
    this.debug = options.debug;
    this.skillName = options.skillName;
    this.skillTitle = options.skillTitle;
    this.skillBasicNumber = options.skillBasicNumber || 0;
    this.skillTimes = options.skillTimes;
    this.basicDamage = options.basicDamage;
    this.basicDamageCoefficient = options.basicDamageCoefficient;
    this.poFangCoefficient = options.poFangCoefficient;
    this.wuShuangCoefficient = options.wuShuangCoefficient;
    this.huiXinHuiXiaoCoefficient = options.huiXinHuiXiaoCoefficient;
    this.targetDamageCoefficient = options.targetDamageCoefficient;
    this.miJi = options.miJi || [];
    /**
     * 易伤系数
     * 新增增伤系数，辅助类提供的全局增伤系数
     * @time 08-24
     */
    this.damageBonuesCoefficient = options.damageBonuesCoefficient;
    // 附加伤害
    this.extra = options.extra;
    try {
      calculatorSkill(this);
    } catch (error) {
      console.log('error', error);
    }
  }

  public calculator(): this {
    calculatorSkill(this);
    return this;
  }
}

/**
 * 计算单个技能的伤害
 *
 * 技能伤害 =
 * @param {Skill} skill
 * @return {*}  {number}
 */
export const calculatorSkill = function calculatorSkillSubtotal(skill: Skill): number {
  const calculateSkillSubtotalEquation = pipe(
    () => calculateBasicNumber(skill),
    () => calculatePoFang(skill),
    () => calculateWuShuang(skill),
    () => calculateHuiXinHuiXiao(skill),
    () => calculateTargetDamage(skill),
    () => calculateDamageBonues(skill),
    () => calculateSkillTimes(skill),
    () => calculateSkillExtra(skill)
  );
  calculateSkillSubtotalEquation();
  return skill.subTotal;
};

interface CreateSkillAttributes {
  skillName: string;
  skillTitle: string;
  skillTimes: number;
  basicDamage?: number;
  skillBasicNumber?: number;
  basicDamageCoefficient?: number;
  poFangCoefficient?: number;
  wuShuangCoefficient?: number;
  huiXinHuiXiaoCoefficient?: number;
  targetDamageCoefficient?: number;
  damageBonuesCoefficient?: number;
  miJi?: MiJi[];
}

/**
 * 创建技能的工厂
 *
 * @param {*} core
 * @param {*} support
 * @return {*}
 */
export function createSkillFactory(core: DpsCore, support: Support) {
  // 获得核心类
  const _core = core;
  // 获得全局辅助数值
  const supportContext = support.getSupportAttributeSync();
  // 辅助类
  const _target = support.target;

  function initAttribute(value?: number, initValue?: number) {
    return value !== undefined ? (typeof value === 'number' ? value : initValue) : initValue;
  }

  function createSkill(
    {
      skillName,
      skillTitle,
      skillTimes,
      basicDamage,
      skillBasicNumber,
      basicDamageCoefficient,
      damageBonuesCoefficient,
      poFangCoefficient,
      wuShuangCoefficient,
      huiXinHuiXiaoCoefficient,
      targetDamageCoefficient,
      miJi,
    }: CreateSkillAttributes,
    debug = false
  ): Skill {
    // 是否开启debug模式
    const _debug = debug === undefined ? false : typeof debug === 'boolean' ? debug : false;

    // 设置属性 如果没有赋值属性则设置默认值
    const skill = new Skill({
      skillName: skillName,
      skillTitle: skillTitle,
      // 技能次数 默认1
      skillTimes: skillTimes,
      // 总攻击 默认为面板攻击
      basicDamage: initAttribute(basicDamage, _core.ZongGongJi),
      skillBasicNumber: initAttribute(skillBasicNumber, 0),
      // 伤害系数 默认1
      basicDamageCoefficient: initAttribute(basicDamageCoefficient, 1),
      // 易伤 buff 基础+全局
      damageBonuesCoefficient:
        initAttribute(damageBonuesCoefficient, 1) * (1 + supportContext.damageBonus),
      // 破防
      poFangCoefficient: initAttribute(poFangCoefficient, 1 + _core.PoFang / 100),
      // 无双
      wuShuangCoefficient: initAttribute(wuShuangCoefficient, 1 + _core.WuShuang / 100),
      // 双会
      huiXinHuiXiaoCoefficient: initAttribute(
        huiXinHuiXiaoCoefficient,
        (_core.HuiXin / 100) * (_core.HuiXiao / 100) + 1 - _core.HuiXin / 100
      ),
      // 承伤
      targetDamageCoefficient: initAttribute(targetDamageCoefficient, _target.damageCoefficient),
      // 秘籍
      miJi: miJi || [],
      // 是否开启debug
      debug: _debug,
    });

    if (Array.isArray(skill.miJi) && skill.miJi.length > 0) {
      // 如果该技能含有秘籍则把秘籍的属性加成进技能中
      combination(skill, _target);
      skill.calculator();
    }

    return skill;
  }

  return createSkill;
}
