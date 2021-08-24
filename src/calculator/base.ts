/**
 * 计算器基类
 * 
 * @Author: centerm.gaohan 
 * @Date: 2021-08-08 19:12:37 
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-24 21:02:59
 */
import invariant from 'invariant';
import chalk from 'chalk';
import { DpsCore, Skill, formatNumber } from '../core'
import { Support, Target } from '../support';
import { SupportContext, CalculatorResult, CalculatorResultSkillItem } from '../types';
import { SkillInfo } from '../core/skill';
import numeral from 'numeral';

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
   * 技能列表库
   *
   * @type {{
   *     [name: string]: SkillInfo;
   *   }}
   * @memberof CalculatorBase
   */
  public skillTimesLib: {
    [name: string]: SkillInfo;
  }

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
   * 使用增益
   *
   * @memberof CalculatorBase
   */
  public use(gainName: string | string[]) {
    if (Array.isArray(gainName)) {
      for (let i = 0; i < gainName.length; i++) {
        this.support.use(gainName[i] as any);
      }
    } else {
      this.support.use(gainName as any);
    }
  }

  /**
   * 传入技能名称返回技能基本信息
   *
   * @param {string} skillName
   * @memberof CalculatorBase
   */
  public getSkillInfo(skillName: string): SkillInfo {
    return this.skillTimesLib[skillName];
  }

  /**
   * 获得core类
   *
   * @return {*}  {Core}
   * @memberof CalculatorBase
   */
  public getCore(): DpsCore {
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
    const initCore = new DpsCore({
      ...this.options.core,
    });
    const supportContext = await this.support.getSupportAttribute();
    this.supportContext = supportContext;

    const core = this.generateUltimateCore(initCore, supportContext);
    this.core = core;

    const target = this.generateUltimateTarget(supportContext);
    this.target = target;
  }

  /**
   * 基类 method 计算所有技能伤害
   *
   * @memberof CalculatorBase
   */
  public executeCalculator(): CalculatorResult {
    let skillsArray: Skill[] = [];
    for (let i = 0; i < this.skills.length; i++) {
      skillsArray.push(
        this.skills[i].calculator()
      );
    }

    /**
     * 计算总输出
     */
    let total = 0;
    skillsArray.forEach((skill) => {
      total += skill.subTotal;
    });
    this.totalExpectation = total;
    /**
     * 计算dps
     */
    this.dps = total / this.seconds;

    /**
     * 总输出计算完成之后才能计算percent
     */
    const percentArray: CalculatorResultSkillItem[] = [];

    skillsArray.forEach((skill) => {
      /**
       * 修改成4位小数
       */
      const currentPercent = numeral(numeral(skill.subTotal / this.totalExpectation).format('0.0000')).value()

      skill.percent = currentPercent;

      percentArray.push({
        subTotal: skill.subTotal,
        percent: skill.percent,
        ...this.getSkillInfo(skill.skillName)
      });
    });

    /**
     * 计算完成之后覆盖掉当前的skills
     */
    this.skills = skillsArray;

    return {
      totalExpectation: this.totalExpectation,
      seconds: this.seconds,
      dps: this.dps,
      skills: percentArray,
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
  public generateUltimateCore(core: DpsCore, ctx: SupportContext): DpsCore {
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

    const ultimate = new DpsCore({
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

  /**
   * 生成最终目标类
   *
   * @param {Target} target
   * @param {SupportContext} ctx
   * @return {*}  {Target}
   * @memberof CalculatorBase
   */
  public generateUltimateTarget(ctx: SupportContext): Target {

    /**
     * 初始化目标参数
     * @param targetOptions
     */
    const initTarget = this.support.target;

    /**
     * 无视内防等级
     * @param ignoreDefense
     */
    const { ignoreDefense } = ctx;
    // console.log('ctx', ctx);

    /**
     * 实际内防计算公式
     * (内防 - 无视内防等级) * (1 - 无视内防系数)
     * 
     * @param currentTargetNeiFang
     */
    const currentTargetNeiFang = (initTarget.neiFang - 0) * (1 - ignoreDefense);

    const _target = new Target({
      name: initTarget.name,
      level: initTarget.level,
      defenseCoefficient: initTarget.defenseCoefficient,
      neiFang: currentTargetNeiFang
    });
    console.log('_target', _target)
    return _target;
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