/**
 * 技能类
 * @Author: centerm.gaohan 
 * @Date: 2021-08-08 19:45:42 
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-09-05 15:46:56
 */
import invariant from 'invariant';
import chalk from 'chalk';
import numeral from 'numeral';
import { JiaSuValue, SkillContext, SupportContext } from '../../types';
import DpsCore from './core';
import { Support, Target } from '../support';
import { floortNumberPlaces } from '../../componet';

export interface SkillParamFunction {
  (ctx: SkillContext): number;
}

export type SkillParam = number | SkillParamFunction;

export type SkillInfo = {
  /**
   * 技能名称
   *
   * @type {string}
   */
  skillName: string;
  /**
   * 技能中文名称
   *
   * @type {string}
   */
  skillTitle: string;

  /**
   * @time 08-31
   * 修改技能次数计算方式
   */
  skillTimesLib: SkillTimeLib;
  /**
   * @time 08-31
   * @todo 橙武是否影响当前技能次数
   * @memberof Options
   */
  cwSkillTimesImpact?: (time: number) => number;
}

export type SkillTimeLib = number | {
  [key in JiaSuValue]: number;
};

export interface Options extends SkillInfo {
  core: DpsCore;
  target: Target;
  support: Support;
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

class Skill {
  public options: Options;

  /**
   * 技能名称 
   *
   * @type {string}
   * @memberof Skill
   */
  public skillName: string;
  /**
   * 技能中文名称
   *
   * @type {string}
   * @memberof Skill
   */
  public skillTitle: string;

  /**
   * 技能次数
   *
   * @type {number}
   * @memberof Skill
   */
  public skillTimes: number;

  /**
   * @todo 技能次数库
   *
   * @type {(number | {
   *     [key in JiaSuValue]: number;
   *   })}
   * @memberof Skill
   */
  public skillTimesLib: number | {
    [key in JiaSuValue]: number;
  };

  private cwSkillTimesImpact?: (time: number) => number;

  /**
   * 核心类 core
   * @type {DpsCore}
   * 
   * 辅助类 support
   * @type {Support}
   * 
   * 增益列表 supportContext
   * @type {Target}
   * 
   * 目标 target
   * @type {SupportContext}
   * @memberof Skill2
   */
  public core: DpsCore;
  public support: Support;
  public target: Target;
  public supportContext: SupportContext;

  /**
   * 技能基础数值很小的那个
   *
   * @type {number}
   * @memberof Skill2
   */
  public skillBasicNumber: number;
  /**
    * 基础伤害
    *
    * @type {number}
    * @memberof Skill
    */
  public basicDamage: number;
  /**
   * 基础攻击系数
   *
   * @type {SkillParam}
   * @memberof Skill2
   */
  public basicDamageCoefficient: number;

  /**
   * 破防系数
   *
   * @type {SkillParam}
   * @memberof Skill2
   */
  public poFangCoefficient: number;

  /**
   * 无双系数
   *
   * @type {SkillParam}
   * @memberof Skill2
   */
  public wuShuangCoefficient: number;

  /**
   * 会心会笑计算系数
   *
   * @type {SkillParam}
   * @memberof Skill2
   */
  public huiXinHuiXiaoCoefficient: number;

  /**
   * 目标伤害系数
   *
   * @type {SkillParam}
   * @memberof Skill2
   */
  public targetDamageCoefficient: number;

  /**
   * 易伤系数
   *
   * @type {SkillParam}
   * @memberof Skill2
   */
  public damageBonuesCoefficient: number;

  /**
   * 额外伤害
   *
   * @type {number}
   * @memberof Skill2
   */
  public extra: number;

  /**
   * 本技能小计
   *
   * @type {number}
   * @memberof Skill2
   */
  public subTotal: number;

  /**
   * 占总输出百分比
   *
   * @type {number}
   * @memberof Skill
   */
  public percent: number;

  constructor(options: Options) {
    this.options = options;

    invariant(!!options.skillName, '技能名称不能为空')
    this.skillName = options.skillName;

    this.skillTitle = options.skillTitle;

    invariant(!!options.core, '请设置核心类');
    this.core = options.core;

    invariant(!!options.support, '请设置辅助类');
    this.support = options.support;

    invariant(!!options.target, '请设置目标类');
    this.target = options.target;

    invariant(!!options.supportContext, '请设置辅助类');
    this.supportContext = options.supportContext;

    invariant(options.skillTimesLib !== undefined, '请设置技能次数');
    this.skillTimesLib = options.skillTimesLib;

    this.skillBasicNumber = options.skillBasicNumber || 0;

    this.cwSkillTimesImpact = options.cwSkillTimesImpact;

    /**
     * @todo 设置技能次数
     */
    if (skillTimesIsNumber(this.skillTimesLib)) {
      this.skillTimes = Math.floor(this.skillTimesLib);
    } else {

      // 拿到加速段位
      const JiaSu = this.core.JiaSu;
      this.skillTimes = Math.floor(this.skillTimesLib[JiaSu]);

      // 如果当前橙武对当前技能有影响
      // 计算橙武对该技能的影响
      const hasCw = this.support.hasCw();
      if (hasCw && this.cwSkillTimesImpact) {
        const cwTimes = this.support.CWTimes;
        this.skillTimes += Math.floor(this.cwSkillTimesImpact(cwTimes));
      }
    }
    this.basicDamage = currySkill(getCurrentCoefficient(options.basicDamage, this.core.ZongGongJi), { ...options, skillTimes: this.skillTimes })();

    this.basicDamageCoefficient = currySkill(getCurrentCoefficient(options.basicDamageCoefficient, 1))();

    this.poFangCoefficient = currySkill(getCurrentCoefficient(options.poFangCoefficient, 1 + this.core.PoFang / 100))();

    this.wuShuangCoefficient = currySkill(getCurrentCoefficient(options.wuShuangCoefficient, 1 + this.core.WuShuang / 100))();

    this.huiXinHuiXiaoCoefficient = currySkill(getCurrentCoefficient(options.huiXinHuiXiaoCoefficient, (this.core.HuiXin / 100) * (this.core.HuiXiao / 100) + 1 - (this.core.HuiXin / 100)))();

    this.targetDamageCoefficient = currySkill(getCurrentCoefficient(options.targetDamageCoefficient, this.target.damageCoefficient))();

    /**
     * 新增增伤系数，辅助类提供的全局增伤系数
     * 
     * @time 08-24
     */
    this.damageBonuesCoefficient =
      currySkill(getCurrentCoefficient(options.damageBonuesCoefficient, 1))()
      * (1 + this.supportContext.damageBonus);

    this.extra = currySkill(getCurrentCoefficient(options.extra, 0))();
  }

  /**
   * 计算技能小计
   *
   * @return {*}  {number}
   * @memberof Skill2
   */
  public calculator(): this {

    if (this.skillName === 'SuoDi') {
      // console.log('技能伤害', (this.skillBasicNumber + (this.basicDamage * this.basicDamageCoefficient)));
      // console.log(`乘破防系数 ${this.poFangCoefficient}`)
      // console.log(`乘无双系数 ${this.wuShuangCoefficient}`)
      // console.log(`乘会心会笑系数 ${this.huiXinHuiXiaoCoefficient}`)
      // console.log(`乘目标伤害系数 ${this.targetDamageCoefficient}`)
      // console.log(`乘目标易伤系数 ${this.damageBonuesCoefficient}`)
      // console.log(`乘技能次数 ${this.skillTimes}`)

      // console.log('baseNumber', floortNumberPlaces(this.skillBasicNumber + (this.basicDamage * this.basicDamageCoefficient), 4));
      // console.log(`乘破防系数 ${floortNumberPlaces(this.poFangCoefficient, 4)}`)
      // console.log(`乘无双系数 ${floortNumberPlaces(this.wuShuangCoefficient, 4)}`)
      // console.log(`乘会心会笑系数 ${floortNumberPlaces(this.huiXinHuiXiaoCoefficient, 4)}`)
      // console.log(`乘目标伤害系数 ${floortNumberPlaces(this.targetDamageCoefficient, 4)}`)
      // console.log(`乘目标易伤系数 ${floortNumberPlaces(this.damageBonuesCoefficient, 4)}`)
      // console.log(`乘技能次数 ${floortNumberPlaces(this.skillTimes)}`)
    }
    /**
     * 当前技能小计
     */
    const subTotal =
      /**
       * 计算技能伤害 整个公式的基础系数
       */
      floortNumberPlaces(this.skillBasicNumber + (this.basicDamage * this.basicDamageCoefficient), 4)
      /**
       * 乘破防系数
       */
      * floortNumberPlaces(this.poFangCoefficient, 4)
      /**
       * 乘无双系数
       */
      * floortNumberPlaces(this.wuShuangCoefficient, 4)
      /**
       * 乘会心会笑系数
       */
      * floortNumberPlaces(this.huiXinHuiXiaoCoefficient, 4)
      /**
       * 乘目标伤害系数
       */
      * floortNumberPlaces(this.targetDamageCoefficient, 4)
      /**
       * 乘目标易伤系数
       */
      * floortNumberPlaces(this.damageBonuesCoefficient, 4)
      /**
       * 乘技能次数
       */
      * this.skillTimes
      /**
       * 是否有额外伤害有则添加
       */
      + this.extra;

    this.subTotal = formatNumber(subTotal);

    return this;
  }

  /**
   * 打印技能日志
   *
   * @memberof Skill
   */
  public showSkillInfo() {
    console.log(chalk.cyan(`
      技能名称：${this.skillName}
      技能次数:${this.skillTimes}
      小计:${this.subTotal} 
    `));
  }
}

export default Skill;


export function formatNumber(value: number): number {
  return numeral(numeral(value).format('0.00')).value();
}

function getCurrentCoefficient(coefficient1?: SkillParam, coefficient2?: SkillParam): SkillParam {
  return coefficient1 !== undefined
    ? coefficient1
    : coefficient2 !== undefined
      ? coefficient2
      : 0;
}

function currySkill(callback: SkillParam, params: any = {}) {
  return function (): number {
    if (typeof callback !== 'function') {
      return callback;
    }

    return callback(params);
  }
}

export function skillTimesIsNumber(value: SkillTimeLib): value is number {
  return typeof value === 'number';
}