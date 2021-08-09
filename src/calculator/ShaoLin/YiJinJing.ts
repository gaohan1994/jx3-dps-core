/**
 * 易筋经计算器
 * 
 * 加法计算：二业加成0.0996秘籍加成3+4+5%,30%佛果触发30% 4件套10% CW特效5%
 * 
 * 乘法计算: 幻身100% 众嗔20%
 * 
 * @Author: centerm.gaohan 
 * @Date: 2021-08-08 18:35:26 
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-09 18:23:25
 */
import CalculatorBase from "../base";
import Skill from "../../core/skill";
import { TeamSkills, SetBonusesGain } from '../../config/config';
import Core from "../../core/core";
import { SkillContext } from "../../types";
import { shaoLinSkills, SkillNames } from './config'

class YiJinJing extends CalculatorBase {

  constructor(options: any) {
    super(options);

    this.professtion = '少林';

    this.className = '易筋经';

    this.skillTimesLib = {
      [SkillNames.WeiTuoXianChu]: 25,
    }

    /**
     * 技能增益列表
     */
    this.support.use(shaoLinSkills.JinGangNuMu);
    this.support.use(shaoLinSkills.QinLongJue);

    this.support.use(TeamSkills.FenLan);
    this.support.use(TeamSkills.PoCangQiong);
    this.support.use(TeamSkills.XiuQi);

    /**
     * 套装
     */
    this.support.use(SetBonusesGain.ValueSetBonuse);
    this.support.use(SetBonusesGain.SkillSetBonuse);

    this.support.showGain();
  }

  public async addSkills() {

    const BaseCoefficient = 1;

    /**
     * 二业依缘系数
     * 
     * @param ErYeYiYuanCoefficient
     */
    const ErYeYiYuanCoefficient = 0.0996;

    /**
     * 众嗔系数（乘法）
     * 
     * @param ZhongChenCoefficient
     */
    const ZhongChenCoefficient = 1.2;

    /**
     * 佛果系数
     * 
     * @param FoGuoCoefficient
     */
    const FoGuoCoefficient = 0.3 * 0.3;

    /**
     * 秘籍易伤 buff
     * 
     * @param MiJiCoefficient
     */
    const MiJiCoefficient = 0.12;

    const skills = [];

    const liuHeGunWeiTuo = new Skill({
      skillName: '韦陀触发六合棍',
      basicDamage: this.options.core.WuQiShangHai,
      coefficient: 0,
      skillTimes: this.getSkillTimes(SkillNames.WeiTuoXianChu) * 2,
      step2Coefficient: 1.0996,
      step4Coefficient: 0.05 * 1.75 + 1 - 0.05
    });

    liuHeGunWeiTuo.use('step2', (ctx: SkillContext, next: any) => {
      // 六合棍只计算无双
      const coefficient = 1 + (ctx.core.WuShuang / 100);
      ctx.step3Coefficient = coefficient;
      return next();
    });

    const liuHeGunWeiTuoResult = await this.execute(liuHeGunWeiTuo);

    const weiTuoXianChu = new Skill({
      skillName: '韦陀献杵',
      basicDamage: 179,
      coefficient: 1.66,
      skillTimes: this.getSkillTimes(SkillNames.WeiTuoXianChu),
      step2Coefficient: (BaseCoefficient + MiJiCoefficient + ErYeYiYuanCoefficient + (this.support.hasSkillSetBonuese() ? this.skillCoefficient : 0) + FoGuoCoefficient) * ZhongChenCoefficient,
      step6Coefficient: 1.11, // 明发 1.11
    });

    weiTuoXianChu.use('step4', (ctx: SkillContext, next: any) => {
      // 韦陀拿云减少目标60%内防等级;
      const ingoreDefense = 0.4 * ctx.target.neiFang;
      const coefficient = ctx.target.defenseCoefficient / (ctx.target.defenseCoefficient + ingoreDefense);
      ctx.step5Coefficient = coefficient;
      return next();
    });

    weiTuoXianChu.use('step6', (ctx: SkillContext, next: any) => {
      // 添加韦陀触发的六合棍
      ctx.subTotal = ctx.subTotal + liuHeGunWeiTuoResult.subTotal;
      return next();
    });

    skills.push(weiTuoXianChu);

    super.addSkills(skills);
  }

}

export default YiJinJing;