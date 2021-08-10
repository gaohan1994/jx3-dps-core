/**
 * 计算器基类
 * 
 * @Author: centerm.gaohan 
 * @Date: 2021-08-08 19:12:37 
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-10 18:04:25
 */
import invariant = require('invariant');
import chalk = require('chalk');
import Core from '../core/core';
import Support from '../support/support';
import Target from '../support/target';
import { SupportContext, SkillContext } from '../types';
import Skill from '../core/skill'


class CalculatorBase {

  public options: any;

  /**
   * 技能列表
   *
   * @type {Array<Skill>}
   * @memberof CalculatorBase
   */
  public skills: Array<Skill> = [];

  /**
   * 核心类
   *
   * @type {Core}
   * @memberof CalculatorBase
   */
  public core: Core;

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

  public supportContext: SupportContext;

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
   * 技能套装系数
   */
  public skillSetBonuseCoefficient: number;

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

  /**
   * 技能次数库，由子类填充
   *
   * @type {{
   *     [name: string]: number;
   *   }}
   * @memberof CalculatorBase
   */
  public skillTimesLib: {
    [name: string]: number;
  } = {}

  constructor(options: any = {}) {
    this.options = options;

    invariant(!!options.support, '辅助类不能为空');
    this.support = new Support(options.support);

    if (this.support.hasSkillSetBonuese()) {
      this.skillSetBonuseCoefficient = 0.0996;
    } else {
      this.skillSetBonuseCoefficient = 0;
    }

    this.seconds = options.seconds || (5 * 60);
  }

  /**
   * 传入技能名称返回战斗时间内该技能次数
   *
   * @param {string} skillName
   * @memberof CalculatorBase
   */
  public getSkillTimes(skillName: string) {
    return this.skillTimesLib[skillName];
  }

  /**
   * 获得core类
   *
   * @return {*}  {Core}
   * @memberof CalculatorBase
   */
  public getCore(): Core {
    return this.core;
  }

  /**
   * 获得辅助类
   *
   * @return {*}  {SupportContext}
   * @memberof CalculatorBase
   */
  public getSupportContext(): SupportContext {
    return this.supportContext;
  }

  public getSupport() {
    return this.support;
  }

  /**
   * 获得目标类
   *
   * @return {*}  {Target}
   * @memberof CalculatorBase
   */
  public getTarget(): Target {
    return this.target;
  }

  /**
   * 添加技能
   *
   * @param {Skill[]} [skills=[]]
   * @memberof CalculatorBase
   */
  public addSkills(skills: Skill[] = []) {
    this.skills.push(...skills);
  }

  /**
   * 生成最终核心类
   *
   * @memberof CalculatorBase
   */
  public async initUltimate() {
    const initCore = new Core({
      ...this.options.core,
      mainCoeffiecient: (YuanQi: number) => {
        return {
          JiChuGongJi: YuanQi * 0.18,
          ZongGongJi: YuanQi * 1.85,
        };
      },
    });
    const supportContext = await this.support.getSupportAttribute();
    this.supportContext = supportContext;

    const core = this.generateUltimate(initCore, supportContext);
    this.core = core;

    this.target = this.support.target;
  }

  /**
   * 基类 method 计算所有技能伤害
   *
   * @memberof CalculatorBase
   */
  public async executeCalculator() {
    let skillsArray: Skill[] = [];
    for (let i = 0; i < this.skills.length; i++) {

      skillsArray.push(
        this.skills[i].calculator()
      );
    }
    // this.core.showAttributes();
    let total = 0;

    skillsArray.forEach((skill) => {
      // skill.showSkillInfo();
      total += skill.subTotal;
    });
    this.totalExpectation = total;
    this.dps = total / this.seconds;

    return {
      totalExpectation: this.totalExpectation,
      seconds: this.seconds,
      dps: this.dps,
      skills: skillsArray
    };
  }

  /**
   * 计算
   *
   * @memberof CalculatorBase
   */
  public async total() {
    /**
     * 生成最终面板
     */
    await this.initUltimate();

    await this.addSkills();

    return this.executeCalculator();
  }

  /**
   * 生成最终属性
   *
   * @memberof DpsCore
   */
  public generateUltimate(core: Core, ctx: SupportContext): Core {
    // console.log('ctx', ctx)
    /**
     * 最终core类
     * 
     * @parma mainAttribute
     */
    const mainAttribute = core[core.type] + ctx.mainAttribute;

    /**
     * 计算基础攻击
     * 
     * @param JiChuGongJi
     */
    const JiChuGongJi = core.JiChuGongJi + ctx.JiChuGongJi + (core.mainCoeffiecient(ctx.mainAttribute).JiChuGongJi || 0);

    /**
     * 计算最终会心、会心效果
     * 
     * @param HuiXin
     */
    const HuiXin = core.HuiXin + ctx.HuiXin + (ctx.HuiXinLevel / 357.375);
    const HuiXiao = core.HuiXiao + ctx.HuiXiao * 100;

    /**
     * 计算最终破防
     * 
     * @param PoFang
     */
    const PoFang = (core.PoFang + (ctx.PoFangLevel / 357.375)) * (1.15 + ctx.PoFangPercent);

    /**
     * 计算最终无双
     * 
     * @param WuShuang
     */
    const WuShuang = core.WuShuang + ctx.WuShuang + (ctx.WuShuangLevel / 344.5875);

    const PoZhao = core.PoZhao + ctx.PoZhao;

    /**
     * 计算基础攻击系数
     */
    const GongJiCoefficient = 1 + ctx.JiChuGongJiPercent;

    const ultimate = new Core({
      mainCoeffiecient: core.mainCoeffiecient,
      /**
       * 设置主属性
       */
      type: core.type,
      [core.type]: mainAttribute,

      /**
       * 设置基础攻击
       * 基础攻击系数
       */
      JiChuGongJi,
      GongJiCoefficient,

      /**
       * 武器伤害不变
       * 
       * @param WuQiShangHai
       */
      WuQiShangHai: core.WuQiShangHai,

      /**
       * 设置会心、会心效果
       */
      HuiXin,
      HuiXiao,

      /**
       * 设置破防 无双 破招 加速
       */
      PoFang,
      WuShuang,
      PoZhao,
      JiaSu: core.JiaSu,
    });

    return ultimate;
  }

  public showCalculatorValue() {
    console.log(chalk.white(`---- calculator start ----`));
    console.log(chalk.white(`计算器：
      职业:${this.professtion}
      心法:${this.className}
    `));
    console.log(chalk.white(`---- calculator end ----`));
  }

  public showSkills() {
    console.log(chalk.white(`---- showSkills start ----`));
    this.skills.forEach((skill) => {
      console.log(chalk.white(skill.skillName));
    })
    console.log(chalk.white(`---- showSkills end ----`));
  }

  public showCoreValue() {
    this.core.showAttributes();
  }

  public showSupportValue() {
    this.support.showSupportValue();
  }

}
export default CalculatorBase;