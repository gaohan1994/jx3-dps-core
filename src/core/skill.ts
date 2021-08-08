/**
 * 技能类
 * @Author: centerm.gaohan 
 * @Date: 2021-08-08 19:45:42 
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-08 21:41:37
 */
import invariant = require('invariant');
import numeral = require('numeral');
import chalk = require('chalk');
import Middleware from '../onion/middleware';
import { SkillContext, SkillMiddleware, SkillMiddleSteps } from '../types';


class Skill {
  public options: any;

  /**
   * 洋葱模型中间件
   *
   * @type {Middleware}
   * @memberof Skill
   */
  public middleware: Middleware;

  public skillName: string;

  /**
   * 技能次数
   *
   * @type {number}
   * @memberof Skill
   */
  public skillTimes: number;

  /**
    * 基础伤害
    *
    * @type {number}
    * @memberof Skill
    */
  public basicDamage: number;
  /**
   * 技能系数
   *
   * @type {number}
   * @memberof Skill
   */
  public coefficient: number;

  /**
   * 计算step2的系数
   *
   * @type {number}
   * @memberof Skill
   */
  public step2Coefficient: number;

  /**
   * 中间件
   *
   * @memberof Skill
   */
  public middlewares: {
    [name: string]: SkillMiddleware
  } = {
      step1: undefined,
      step2: undefined,
      step3: undefined,
      step4: undefined
    }

  constructor(options: any) {
    this.options = options;

    this.middleware = new Middleware([]);

    invariant(!!options.skillName, '技能名称不能为空')
    this.skillName = options.skillName;

    invariant(typeof options.basicDamage === 'number', '基础伤害不能为空');
    this.basicDamage = options.basicDamage;

    invariant(typeof options.coefficient === 'number', '伤害系数不能为空');
    this.coefficient = options.coefficient;

    invariant(typeof options.skillTimes === 'number', '技能次数不能为空');
    this.skillTimes = options.skillTimes;

    this.step2Coefficient = options.step2Coefficient;

    if (!!options.middlewares) {
      this.middlewares = options.middlewares;
    }
  }

  /**
   * 计算技能伤害
   * 
   * step1SkillDamage = basicDamage + (ZongGongJi * coefficient)
   *
   * @param {number} ZongGongJi
   * @return {*}  {number}
   * @memberof Skill
   */
  public step1(ctx: SkillContext, next: any): any {
    if (!ctx) {
      return next();
    }
    ctx.step1SkillDamage = formatNumber(ctx.basicDamage + (ctx.core.ZongGongji * ctx.coefficient));
    return next();
  }
  /**
   * 计算奇穴、秘籍、加成之后的伤害
   * 
   * step2SkillDamage = step1SkillDamage * QiXueAndMiJiCoefficient
   *
   * @return {*}  {number}
   * @memberof Skill
   */
  public step2(ctx: SkillContext, next: any): any {
    if (!ctx) {
      return next();
    }
    ctx.step2SkillDamage = formatNumber(ctx.step1SkillDamage * ctx.step2Coefficient);
    return next();
  }

  /**
   * 计算经过破防无双加成之后的值
   * 
   * step3SkillDamage = this.step2SkillDamage * (1 + PoFang) * (1 + WuShuang)
   *
   * @param {number} PoFang
   * @param {number} WuShuang
   * @return {*}  {this}
   * @memberof Skill
   */
  public step3(ctx: SkillContext, next: any): this {
    if (!ctx) {
      return next();
    }
    ctx.step3SkillDamage = formatNumber(ctx.step2SkillDamage * (1 + ctx.core.PoFang / 100) * (1 + ctx.core.WuShuang / 100));
    return next();
  }

  /**
   * 计算双会加成之后的技能伤害
   * 
   * 
   *
   * @param {number} HuiXin
   * @param {number} HuiXiao
   * @param {Step4Config} [config={}]
   * @return {*}  {this}
   * @memberof Skill
   */
  public step4(ctx: SkillContext, next: any): any {
    if (!ctx) {
      return next();
    }
    ctx.step4SkillDamage = formatNumber(
      ctx.step3SkillDamage * (
        (ctx.core.HuiXin / 100) * (ctx.core.HuiXiao / 100) + 1 - (ctx.core.HuiXin / 100)
      )
    );
    return this;
  }

  public checkMiddleware(middleware: any): boolean {
    return middleware !== undefined && typeof middleware === 'function';
  }

  public calculator(ctx: SkillContext) {

    /**
     * 补充完整 SkillContext
     * 
     * @param ctx
     */
    ctx = {
      ...ctx,
      skillName: this.skillName,
      basicDamage: this.basicDamage,
      coefficient: this.coefficient,
      skillTimes: this.skillTimes,
      step2Coefficient: this.step2Coefficient,
    }

    this.middleware.use(this.step1);
    if (this.checkMiddleware(this.middlewares.step1)) {
      this.middleware.use(this.middlewares.step1);
    }
    this.middleware.use(this.step2);
    if (this.checkMiddleware(this.middlewares.step2)) {
      this.middleware.use(this.middlewares.step2);
    }
    this.middleware.use(this.step3);
    if (this.checkMiddleware(this.middlewares.step3)) {
      this.middleware.use(this.middlewares.step3);
    }
    this.middleware.use(this.step4);
    if (this.checkMiddleware(this.middlewares.step4)) {
      this.middleware.use(this.middlewares.step4);
    }

    return new Promise((resolve, reject) => {
      this.middleware
        .execute(ctx)
        .then(() => {
          resolve(ctx);
        })
        .catch((error) => {
          reject(error);
        })
    })
  }
}

export default Skill;


function formatNumber(value: number): number {
  return numeral(numeral(value).format('0.00')).value();
}