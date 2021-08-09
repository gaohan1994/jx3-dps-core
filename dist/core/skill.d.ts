import Middleware from '../onion/middleware';
import { SkillContext, SkillMiddleware } from '../types';
declare class Skill {
    options: any;
    /**
     * 洋葱模型中间件
     *
     * @type {Middleware}
     * @memberof Skill
     */
    middleware: Middleware;
    skillName: string;
    /**
     * 技能次数
     *
     * @type {number}
     * @memberof Skill
     */
    skillTimes: number;
    /**
      * 基础伤害
      *
      * @type {number}
      * @memberof Skill
      */
    basicDamage: number;
    /**
     * 技能系数
     *
     * @type {number}
     * @memberof Skill
     */
    coefficient: number;
    /**
     * 计算step2的系数
     *
     * @type {number}
     * @memberof Skill
     */
    step2Coefficient: number;
    /**
     * 计算step6的基础系数
     *
     * @type {number}
     * @memberof Skill
     */
    step6Coefficient: number;
    step3Coefficient: number;
    step4Coefficient: number;
    step5Coefficient: number;
    /**
     * 中间件
     *
     * @memberof Skill
     */
    middlewares: {
        [name: string]: SkillMiddleware;
    };
    constructor(options: any);
    use(stepName: string, middleware: any): void;
    /**
     * 计算技能伤害
     *
     * step1SkillDamage = basicDamage + (ZongGongJi * coefficient)
     *
     * @param {number} ZongGongJi
     * @return {*}  {number}
     * @memberof Skill
     */
    step1(ctx: SkillContext, next: any): any;
    /**
     * 计算奇穴、秘籍、加成之后的伤害
     *
     * step2SkillDamage = step1SkillDamage * QiXueAndMiJiCoefficient
     *
     * @return {*}  {number}
     * @memberof Skill
     */
    step2(ctx: SkillContext, next: any): any;
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
    step3(ctx: SkillContext, next: any): this;
    /**
     * 计算双会加成之后的技能伤害
     *
     * @param {number} HuiXin
     * @param {number} HuiXiao
     * @param {Step4Config} [config={}]
     * @return {*}  {this}
     * @memberof Skill
     */
    step4(ctx: SkillContext, next: any): any;
    /**
     * 计算目标防御之后的技能伤害
     *
     * @param {SkillContext} ctx
     * @param {*} next
     * @return {*}
     * @memberof Skill
     */
    step5(ctx: SkillContext, next: any): any;
    /**
     * 计算易伤之后的技能伤害
     *
     * @param {SkillContext} ctx
     * @param {*} next
     * @return {*}
     * @memberof Skill
     */
    step6(ctx: SkillContext, next: any): any;
    checkMiddleware(middleware: any): boolean;
    calculator(ctx: SkillContext): Promise<SkillContext>;
}
export default Skill;
