/* eslint-disable no-console */
/**
 * 技能类
 * @Author: centerm.gaohan
 * @Date: 2021-08-08 19:45:42
 * @Last Modified by: Harper.Gao
 * @Last Modified time: 2021-11-19 10:26:13
 */
import { addition, multiplication } from '../../componet';
import DpsCore from './core_new';
import { Support } from '../support';
import { combination, MiJi } from './miji';

export default class Skill {
  public debug: boolean;
  /**
   * 技能名称
   */
  public skillName: string;
  /**
   * 技能中文名称
   */
  public skillTitle: string;
  /**
   * 技能次数
   */
  public skillTimes: number;
  /**
   * 技能基础数值很小的那个
   */
  public skillBasicNumber: number;
  /**
   * 基础伤害
   */
  public basicDamage: number;
  /**
   * 基础攻击系数
   */
  public basicDamageCoefficient: number;
  /**
   * 破防系数
   */
  public poFangCoefficient: number;
  /**
   * 无双系数
   */
  public wuShuangCoefficient: number;
  /**
   * 会心会笑计算系数
   */
  public huiXinHuiXiaoCoefficient: number;
  /**
   * 目标伤害系数
   */
  public targetDamageCoefficient: number;
  /**
   * 易伤系数
   */
  public damageBonuesCoefficient: number;
  /**
   * 技能秘籍
   */
  public miJi?: MiJi[];
  /**
   * 额外伤害
   */
  public extra?: number;
  /**
   * 本技能小计
   */
  public subTotal?: number;
  /**
   * 占总输出百分比
   */
  public percent?: number;

  constructor(options: any) {
    this.debug = options.debug;
    // 技能名字
    this.skillName = options.skillName;
    // 技能中文名字
    this.skillTitle = options.skillTitle;
    // 技能基础数值很小的那个
    this.skillBasicNumber = options.skillBasicNumber || 0;
    // 技能次数
    this.skillTimes = options.skillTimes;
    // 技能基础伤害
    this.basicDamage = options.basicDamage;
    // 技能攻击系数
    this.basicDamageCoefficient = options.basicDamageCoefficient;
    // 技能破防系数
    this.poFangCoefficient = options.poFangCoefficient;
    // 技能无双系数
    this.wuShuangCoefficient = options.wuShuangCoefficient;
    // 技能会心会笑系数
    this.huiXinHuiXiaoCoefficient = options.huiXinHuiXiaoCoefficient;
    // 目标承伤系数
    this.targetDamageCoefficient = options.targetDamageCoefficient;
    // 技能秘籍
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

  /**
   * 计算技能小计
   *
   * @return {*}  {number}
   * @memberof Skill2
   */
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
  const debug = skill.debug;
  // 技能的附加伤害
  const extra = skill.extra;

  // 技能基础伤害
  const skillCalculatorBasicNumber =
    skill.skillBasicNumber + skill.basicDamage * skill.basicDamageCoefficient;

  // 根据技能的基础技能
  let subtotal = multiplication(
    skillCalculatorBasicNumber,
    // 乘破防系数
    skill.poFangCoefficient,
    // 无双系数
    skill.wuShuangCoefficient,
    // 双会系数
    skill.huiXinHuiXiaoCoefficient,
    // 承伤系数
    skill.targetDamageCoefficient,
    // 易伤系数
    skill.damageBonuesCoefficient,
    // 技能次数
    skill.skillTimes
  );

  // 如果有附加伤害则加上附加伤害
  if (typeof extra === 'number') {
    subtotal = addition(subtotal, extra);
  }

  if (debug) {
    console.log('DEBUG ', skill.skillTitle);
    console.log('subtotal', subtotal);
    console.log('技能伤害', skillCalculatorBasicNumber);
    console.log(`乘破防系数 ${skill.poFangCoefficient}`);
    console.log(`乘无双系数 ${skill.wuShuangCoefficient}`);
    console.log(`乘会心会笑系数 ${skill.huiXinHuiXiaoCoefficient}`);
    console.log(`乘目标伤害系数 ${skill.targetDamageCoefficient}`);
    console.log(`乘目标易伤系数 ${skill.damageBonuesCoefficient}`);
    console.log(`乘技能次数 ${skill.skillTimes}`);
  }

  // 赋值给技能
  skill.subTotal = subtotal;
  // 返回技能小计
  return subtotal;
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
