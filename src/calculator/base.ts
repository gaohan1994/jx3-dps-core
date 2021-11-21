/**
 * 计算器基类
 *
 * @Author: centerm.gaohan
 * @Date: 2021-08-08 19:12:37
 * @Last Modified by: Harper.Gao
 * @Last Modified time: 2021-11-21 18:00:29
 */
import invariant from 'invariant';
import numeral from 'numeral';
import DpsCore from '@/packages/core/unstableOldCore';
import Skill, { SkillInfo } from '@/packages/core/unstablOldSkill';
import { Support, Target } from '@/packages/support';
import {
  SupportContext,
  CalculatorResult,
  CalculatorResultSkillItem,
  Gain,
  GainOptions,
} from '@/types';
import { floortNumberPlaces } from '@/componet';

class CalculatorBase {
  // 计算器版本
  public CalculatorVersion: any;

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
  };

  constructor(options: any = {}) {
    this.options = options;

    invariant(!!options.support, '辅助类不能为空');
    this.support = new Support(options.support);

    this.seconds = options.seconds || 5 * 60;
  }

  /**
   * 使用增益
   *
   * @memberof CalculatorBase
   */
  public use(gain: string | Gain, rest: GainOptions) {
    this.support.use(gain as any, rest);
  }

  /**
   * 删除增益
   *
   * @param {string} gain
   * @memberof CalculatorBase
   */
  public remove(gain: string) {
    this.support.remove(gain);
  }

  /**
   * 覆盖增益
   *
   * @param {Gain[]} gains
   * @memberof CalculatorBase
   */
  public setGain(gains: Gain[]) {
    this.support.setGain(gains);
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
    this.skills = skills;
  }

  /**
   * 生成最终核心类
   *
   * @memberof CalculatorBase
   */
  public async initUltimate() {
    /**
     * 设置全局增益列表
     */
    const supportContext = await this.support.getSupportAttribute();
    this.supportContext = supportContext;

    /**
     * 如果没有核心类则生成核心类
     */
    const initCore = new DpsCore({
      ...this.options.core,
    });
    const core = this.generateUltimateCore(initCore, supportContext);
    this.core = core;

    const target = this.generateUltimateTarget(supportContext);
    this.target = target;
    this.support.target = target;
  }

  /**
   * 基类 method 计算所有技能伤害
   *
   * @memberof CalculatorBase
   */
  public executeCalculator(): CalculatorResult {
    // console.log('this.supportContext', this.supportContext);
    let skillsArray: Skill[] = [];
    for (let i = 0; i < this.skills.length; i++) {
      skillsArray.push(this.skills[i].calculator());
    }

    /**
     * 计算总输出
     */
    let total = 0;
    skillsArray.forEach(skill => {
      total += skill.subTotal;
    });
    this.totalExpectation = total;
    /**
     * 计算dps
     */
    this.dps = floortNumberPlaces(total / this.seconds);

    /**
     * 总输出计算完成之后才能计算percent
     */
    const percentArray: CalculatorResultSkillItem[] = [];

    skillsArray.forEach(skill => {
      /**
       * 修改成4位小数
       */
      const currentPercent = numeral(
        numeral(skill.subTotal / this.totalExpectation).format('0.0000')
      ).value();

      skill.percent = currentPercent;

      /**
       *
       * @time 08-29
       * 修改加入加速，skilltimes返回值为skill.skillTimes
       * 否则返回的skilltimes 可能为function类型
       */
      percentArray.push({
        subTotal: skill.subTotal,
        percent: skill.percent,
        ...this.getSkillInfo(skill.skillName),
        skillTimes: skill.skillTimes,
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
     * 增加的主属性
     * @param gainMainAttribute
     */
    const gainMainAttribute = ctx[core.type];
    /**
     * 最终主属性
     *
     * @parma mainAttribute
     */
    const mainAttribute = core[core.type] + gainMainAttribute;

    /**
     * 计算基础攻击
     *
     * @param JiChuGongJi
     */
    const JiChuGongJi =
      core.JiChuGongJi +
      ctx.JiChuGongJi +
      (core.mainCoeffiecient(gainMainAttribute).JiChuGongJi || 0);

    /**
     * @time 08-24
     * 新增主属性增加的会心等级
     * 计算最终会心、会心效果
     *
     * @param HuiXin
     */

    const HuiXin =
      core.HuiXin +
      ctx.HuiXin * 100 +
      ctx.HuiXinLevel / 357.375 +
      core.mainCoeffiecient(gainMainAttribute).HuiXinLevel / 357.375;
    const HuiXiao = core.HuiXiao + ctx.HuiXiao * 100 + ctx.HuiXiaoLevel / 125.0625;

    /**
     * @time 08-24
     * 新增主属性增加的破防等级
     * 计算最终破防
     *
     * @param PoFang
     */
    const PoFang =
      (core.PoFang +
        ctx.PoFangLevel / 357.375 +
        core.mainCoeffiecient(gainMainAttribute).PoFangLevel / 357.375) *
      (1.15 + ctx.PoFangPercent);

    /**
     * 计算最终无双
     *
     * @param WuShuang
     */
    const WuShuang = core.WuShuang + ctx.WuShuang + ctx.WuShuangLevel / 344.5875;

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
     * 全局无视内防系数
     * @oaram globalIgnoreDefense
     *
     * 无视内防等级
     * @param ignoreDefense
     */
    const { globalIgnoreDefense, ignoreDefense } = ctx;

    /**
     * @time 09-01
     * 修改内防计算公式
     * 游戏里有两种类型的无视防御机制，称为A类和B类，其中同类无视防御相加，不同类无视防御相乘。
     * https://www.jx3box.com/bps/7609
     * 实际内防 = 内防 *（1 - 全局无视内防等级）* （1 - 无视内防等级）
     * @param currentTargetNeiFang
     */
    const currentTargetNeiFang =
      (initTarget.neiFang - 0) * (1 - globalIgnoreDefense) * (1 - ignoreDefense);

    const _target = new Target({
      name: initTarget.name,
      level: initTarget.level,
      defenseCoefficient: initTarget.defenseCoefficient,
      neiFang: currentTargetNeiFang,
    });
    return _target;
  }
}
export default CalculatorBase;
