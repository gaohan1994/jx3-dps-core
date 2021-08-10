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
 * @Last Modified time: 2021-08-10 18:09:48
 */
import CalculatorBase from "../base";
import Skill from "../../core/skill";
import { TeamSkills, SetBonusesGain } from '../../config/config';
import Core from "../../core/core";
import { SkillContext, EnChants } from "../../types";
import { shaoLinSkills, SkillNames } from './config'
import Skill2 from "../../core/skill";

class YiJinJing extends CalculatorBase {

  constructor(options: any) {
    super(options);

    this.professtion = '少林';

    this.className = '易筋经';

    this.skillTimesLib = {
      [SkillNames.WeiTuoXianChu]: 25,
      [SkillNames.PoZhao]: 30,
      [SkillNames.NaYunShi]: 39,
      [SkillNames.HengSaoLiuHe]: 32,
      [SkillNames.HengSaoLiuHeDot]: 155,
      [SkillNames.ShouQueShi]: 45,
      [SkillNames.PuDuSiFang]: 44,
      [SkillNames.XiangMo]: 64,
      [SkillNames.SuoDi]: 39,
      [SkillNames.TiHuGuanDing]: 22,
      [SkillNames.FoGuo]: 55,
      [SkillNames.LiuHeGun]: 172,
      [SkillNames.FeiJian]: 50,
      [EnChants.EnChantHand]: 30,
      [EnChants.EnChantShoe]: 15,
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

  /**
   * 添加技能
   *
   * @memberof YiJinJing
   */
  public async addSkills() {

    var self = this;

    const core = super.getCore();

    const target = super.getTarget();

    const supportContext = super.getSupportContext();

    const support = super.getSupport();

    const hasCw = support.hasCw();

    const BaseCoefficient = 1;
    /**
     * 二业依缘系数
     * 
     * @param ErYeYiYuanCoefficient
     */
    const ErYeYiYuanCoefficient = 0.0996;

    /**
     * 技能套装系数
     */
    const skillSetBonuseCoefficient = support.hasSkillSetBonuese() ? 0.0996 : 0;

    /**
     * 众嗔系数（乘法）
     * 
     * @param ZhongChenCoefficient
     */
    const ZhongChenCoefficient = 1.2;

    /**
     * 明发系数
     * 
     * @param MingFaCoefficient
     */
    const MingFaCoefficient = 1.11;

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

    /**
     * 易筋经技能输出列表
     */
    const skills = [];

    /**
     * 无视内功防御的系数
     *
     * @return {*} 
     */
    const ingoreTargetDefenceCoefficient = () => {
      const ingoreDefense = 0.4 * target.neiFang;
      const coefficient = target.defenseCoefficient / (target.defenseCoefficient + ingoreDefense);
      return coefficient;
    }

    /**
     * 六合棍
     */
    const liuHe = new Skill2({
      core,
      target,
      supportContext,
      skillName: SkillNames.LiuHeGun,
      skillTimes: this.getSkillTimes(SkillNames.LiuHeGun),
      skillBasicNumber: core.WuQiShangHai,
      basicDamage: 0,
      basicDamageCoefficient: 0,
      poFangCoefficient: 1,
    });
    skills.push(liuHe);

    const liuHeWithWeiTuo = new Skill2({
      core,
      target,
      supportContext,
      skillName: '韦陀触发六合棍',
      skillTimes: this.getSkillTimes(SkillNames.WeiTuoXianChu) * 2,
      skillBasicNumber: core.WuQiShangHai,
      basicDamage: 0,
      basicDamageCoefficient: 0,
      poFangCoefficient: 1,
    });
    const liuHeWithWeiTuoSubTotal = liuHeWithWeiTuo.calculator();

    const weiTuo = new Skill2({
      core,
      target,
      supportContext,
      skillName: SkillNames.WeiTuoXianChu,
      skillTimes: this.getSkillTimes(SkillNames.WeiTuoXianChu),
      skillBasicNumber: 179,
      basicDamageCoefficient: 1.66,
      targetDamageCoefficient: ingoreTargetDefenceCoefficient,
      damageBonuesCoefficient: () => {
        return (BaseCoefficient + MiJiCoefficient + ErYeYiYuanCoefficient + skillSetBonuseCoefficient + FoGuoCoefficient) * ZhongChenCoefficient * MingFaCoefficient;
      },
      extra: liuHeWithWeiTuoSubTotal.subTotal
    });
    skills.push(weiTuo as any);

    const poZhao = new Skill({
      core,
      target,
      supportContext,
      skillName: SkillNames.PoZhao,
      skillTimes: this.getSkillTimes(SkillNames.PoZhao),
      skillBasicNumber: 0,
      basicDamage: core.PoZhao,
      basicDamageCoefficient: 15.2288,
      damageBonuesCoefficient: BaseCoefficient + ErYeYiYuanCoefficient,
    });
    skills.push(poZhao);

    const naYunShi = new Skill({
      core,
      target,
      supportContext,
      skillName: SkillNames.NaYunShi,
      skillTimes: this.getSkillTimes(SkillNames.NaYunShi),
      skillBasicNumber: 258.5,
      basicDamageCoefficient: 2,
      targetDamageCoefficient: ingoreTargetDefenceCoefficient,
      damageBonuesCoefficient: () => {
        return (BaseCoefficient + MiJiCoefficient + ErYeYiYuanCoefficient + skillSetBonuseCoefficient + FoGuoCoefficient) * ZhongChenCoefficient * MingFaCoefficient;
      },
    });
    skills.push(naYunShi);

    const hengSaoLiuHe = new Skill({
      core,
      target,
      supportContext,
      skillName: SkillNames.HengSaoLiuHe,
      skillTimes: this.getSkillTimes(SkillNames.HengSaoLiuHe),
      skillBasicNumber: 75,
      basicDamageCoefficient: 0.58,
      damageBonuesCoefficient: () => {
        return (BaseCoefficient + ErYeYiYuanCoefficient + FoGuoCoefficient + 0.5) * 2 * MingFaCoefficient;
      },
      huiXinHuiXiaoCoefficient: () => {
        return (core.HuiXin / 100 + 0.1) * (core.HuiXiao / 100 + 0.1) + 1 - (core.HuiXin / 100 + 0.1);
      }
    });
    skills.push(hengSaoLiuHe);

    const shouQueShi = new Skill({
      core,
      target,
      supportContext,
      skillName: SkillNames.ShouQueShi,
      skillTimes: this.getSkillTimes(SkillNames.ShouQueShi),
      skillBasicNumber: 144.5,
      basicDamageCoefficient: 1.36,
      damageBonuesCoefficient: () => {
        const cwBuff = hasCw ? 0.0996 / 2 : 0;
        return (BaseCoefficient + 0.12 + ErYeYiYuanCoefficient + cwBuff + FoGuoCoefficient) * ZhongChenCoefficient * MingFaCoefficient;
      },
      huiXinHuiXiaoCoefficient: () => {
        return (core.HuiXin / 100 + 0.04 + 0.1) * (core.HuiXiao / 100 + 0.1) + 1 - (core.HuiXin / 100 + 0.1 + 0.04);
      },
      targetDamageCoefficient: ingoreTargetDefenceCoefficient
    });
    skills.push(shouQueShi);

    const hengSaoLiuHeDot = new Skill({
      core,
      target,
      supportContext,
      skillName: SkillNames.HengSaoLiuHeDot,
      skillTimes: this.getSkillTimes(SkillNames.HengSaoLiuHeDot),
      skillBasicNumber: 45,
      basicDamageCoefficient: 0.083,
      damageBonuesCoefficient: () => {
        return (BaseCoefficient + FoGuoCoefficient + ErYeYiYuanCoefficient) * 2 * 3 * MingFaCoefficient;
      },
      huiXinHuiXiaoCoefficient: () => {
        return (core.HuiXin / 100 + 0.1) * (core.HuiXiao / 100 + 0.1) + 1 - (core.HuiXin / 100 + 0.1);
      }
    });
    skills.push(hengSaoLiuHeDot);

    const puDuSiFang = new Skill({
      core,
      target,
      supportContext,
      skillName: SkillNames.PuDuSiFang,
      skillTimes: this.getSkillTimes(SkillNames.PuDuSiFang),
      skillBasicNumber: 163.5,
      basicDamageCoefficient: 0.92,
      damageBonuesCoefficient: () => {
        const cwBuff = hasCw ? 0.0996 / 2 : 0;
        return (BaseCoefficient + 0.0996 + FoGuoCoefficient + ErYeYiYuanCoefficient + cwBuff) * MingFaCoefficient;
      }
    });
    skills.push(puDuSiFang);

    const suoDi = new Skill({
      core,
      target,
      supportContext,
      skillName: SkillNames.SuoDi,
      skillTimes: this.getSkillTimes(SkillNames.SuoDi),
      skillBasicNumber: 407.5,
      basicDamageCoefficient: 1.25,
      damageBonuesCoefficient: (BaseCoefficient + ErYeYiYuanCoefficient) * MingFaCoefficient,
    });
    skills.push(suoDi);

    const tiHuGuanDing = new Skill({
      core,
      target,
      supportContext,
      skillName: SkillNames.TiHuGuanDing,
      skillTimes: this.getSkillTimes(SkillNames.TiHuGuanDing),
      skillBasicNumber: 407.5,
      basicDamageCoefficient: 1.92185,
      damageBonuesCoefficient: (BaseCoefficient + ErYeYiYuanCoefficient),
    });
    skills.push(tiHuGuanDing);

    const foGuo = new Skill({
      core,
      target,
      supportContext,
      skillName: SkillNames.FoGuo,
      skillTimes: this.getSkillTimes(SkillNames.FoGuo),
      skillBasicNumber: 127.5,
      basicDamageCoefficient: 0.697922,
      damageBonuesCoefficient: BaseCoefficient + 0.3 + ErYeYiYuanCoefficient
    });
    skills.push(foGuo);

    const FMHand = new Skill({
      core,
      target,
      supportContext,
      skillName: EnChants.EnChantHand,
      skillTimes: this.getSkillTimes(EnChants.EnChantHand),
      skillBasicNumber: 0,
      basicDamageCoefficient: 0.95,
      damageBonuesCoefficient: (BaseCoefficient + ErYeYiYuanCoefficient) * 0.4,
    });
    skills.push(FMHand);

    const FMFeet = new Skill({
      core,
      target,
      supportContext,
      skillName: EnChants.EnChantShoe,
      skillTimes: this.getSkillTimes(EnChants.EnChantShoe),
      skillBasicNumber: 0,
      basicDamageCoefficient: 0.38125,
      damageBonuesCoefficient: (BaseCoefficient + ErYeYiYuanCoefficient)
    });
    skills.push(FMFeet);

    const weituoTotal = await weiTuo.calculator().subTotal;
    const nayunTotal = await naYunShi.calculator().subTotal;

    const xiangMo = new Skill({
      core,
      target,
      supportContext,
      skillName: SkillNames.XiangMo,
      skillTimes: 1,
      skillBasicNumber: 0,
      basicDamage: () => {
        return (weituoTotal + nayunTotal) / 4 / 1.2;
      },
      poFangCoefficient: 1,
      wuShuangCoefficient: 1,
      huiXinHuiXiaoCoefficient: 1,
      targetDamageCoefficient: 1,
    });
    skills.push(xiangMo);

    super.addSkills(skills);
  }

}

export default YiJinJing;