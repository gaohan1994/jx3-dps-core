/**
 * 计算器基类
 * 
 * @Author: centerm.gaohan 
 * @Date: 2021-08-08 19:12:37 
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-09 18:25:28
 */
import invariant = require('invariant');
import chalk = require('chalk');
import Core from '../core/core';
import Support from '../support/support';
import Skill from '../core/skill';
import { SupportContext, SkillContext } from '../types';


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
   * 是否有技能套装
   *
   * @type {boolean}
   * @memberof CalculatorBase
   */
  public skillSetBonueseToken: boolean;
  /**
   * 技能套装系数
   *
   * @type {number}
   * @memberof CalculatorBase
   */
  public skillCoefficient: number;

  /**
   * 战斗时间 单位：秒 
   * 默认 5分钟 300秒
   *
   * @type {number}
   * @memberof CalculatorBase
   */
  public seconds: number;

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
  }

  // addSkills(): void;

  constructor(options: any = {}) {
    this.options = options;

    // invariant(!!options.core, '核心类不能为空');
    // this.core = new Core(options.core);

    invariant(!!options.support, '辅助类不能为空');
    this.support = new Support(options.support);

    /**
     * 首先得到辅助类的所有增益
     */
    // const supportAttribute = this.support.getSupportAttribute();
    // console.log('supportAttribute', supportAttribute);

    /**
     * 是否有技能套装特效
     * 
     * @param hasSkillSetBonuese
     */
    this.skillSetBonueseToken = this.support.hasSkillSetBonuese();
    this.skillCoefficient = options.skillCoefficient || 0.0996;

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

  public async initContructor(initCore: Core) {
    const supportContext = await this.support.getSupportAttribute();
    this.supportContext = supportContext;

    const core = this.generateUltimate(initCore, supportContext);
    this.core = core;
  }

  /**
   * 基类 method 计算所有技能伤害
   *
   * @memberof CalculatorBase
   */
  public async executeCalculator() {

    let promises: any[] = [];
    for (let i = 0; i < this.skills.length; i++) {

      promises.push(
        this.skills[i].calculator({
          core: this.core,
          support: this.support,
          target: this.support.target,
          supportContext: this.supportContext,
        })
      );
    }

    const responses = await Promise.all(promises);
    console.log('responses', responses);
  }

  public addSkills(skills: Skill[] = []) {
    this.skills.push(...skills);
  }

  public async total() {
    /**
     * 生成最终面板
     */
    const initCore = new Core({
      ...this.options.core,
      mainCoeffiecient: (YuanQi: number) => {
        return {
          JiChuGongJi: YuanQi * 0.18,
          ZongGongJi: YuanQi * 1.85,
        };
      },
    });

    await this.initContructor(initCore);

    await this.addSkills();

    this.executeCalculator();
  }

  /**
   * 执行单个技能任务
   *
   * @param {Skill} skill
   * @memberof CalculatorBase
   */
  public async execute(skill: Skill): Promise<SkillContext> {
    const result = await skill.calculator({
      core: this.core,
      support: this.support,
      target: this.support.target,
      supportContext: this.supportContext
    });
    return result;
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