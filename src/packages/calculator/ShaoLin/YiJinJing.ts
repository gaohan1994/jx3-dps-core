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
 * @Last Modified time: 2021-08-31 11:20:09
 */
import CalculatorBase from "../base";
import Skill from "../../core/skill";
import { EnChants, EnChantsList, SupportContextKeys, TeamSkillValue } from "../../../types";
import { SkillNames, YJJConfig } from './config'

class YiJinJing extends CalculatorBase {

  static mainCoeffiecient = (YuanQi: number) => {
    return {
      JiChuGongJi: YuanQi * 0.18,
      ZongGongJi: YuanQi * 1.85,

      /**
       * @time 08-24
       * 
       * 每点元气增加破防等级 0.3
       * 
       * @param PoFangLevel
       */
      PoFangLevel: YuanQi * 0.3,
      /**
       * @time 08-24
       * 
       * 每点元气增加会心等级
       * 
       * @param HuiXinLevel 0.38
       */
      HuiXinLevel: YuanQi * 0.38
    };
  }

  constructor(options: any) {
    super({
      ...options,
      core: {
        ...options.core,
        mainCoeffiecient: YiJinJing.mainCoeffiecient
      }
    });

    this.professtion = '少林';

    this.className = '易筋经';

    this.skillTimesLib = YJJConfig;

    /**
     * 默认技能增益列表
     * 少林独有
     * 
     * @parma JinGangNuMu
     * @parma QinLongJue
     */
    this.support.use(TeamSkillValue.JinGangNuMu);
    this.support.use(TeamSkillValue.QinLongJue);

    /**
     * @time 08-30
     * 更新 少林新增3%易伤
     */
    this.support.use({
      name: 'UPDATE08-30',
      data: [
        { gainTarget: SupportContextKeys.damageBonus, value: 0.03, coverage: 1 }
      ]
    });
  }

  /**
   * 添加技能
   *
   * @memberof YiJinJing
   */
  public async addSkills() {

    const core = super.getCore();

    const target = super.getTarget();

    const support = super.getSupport();

    const supportContext = super.getSupportContext();

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

    const baseSkillContext = {
      core,
      target,
      support,
      supportContext,
    }

    /**
     * 六合棍
     */
    const liuHe = new Skill({
      ...baseSkillContext,
      ...this.getSkillInfo(SkillNames.LiuHeGun),
      skillBasicNumber: core.WuQiShangHai,
      basicDamage: 0,
      basicDamageCoefficient: 0,
      poFangCoefficient: 1,
    });
    skills.push(liuHe);

    const liuHeWithWeiTuo = new Skill({
      ...baseSkillContext,
      skillName: '韦陀触发六合棍',
      skillTitle: '韦陀触发六合棍',
      skillTimes: this.getSkillInfo(SkillNames.WeiTuoXianChu).skillTimes * 2,
      skillBasicNumber: core.WuQiShangHai,
      basicDamage: 0,
      basicDamageCoefficient: 0,
      poFangCoefficient: 1,
    });
    const liuHeWithWeiTuoSubTotal = liuHeWithWeiTuo.calculator();

    const weiTuo = new Skill({
      ...baseSkillContext,
      ...this.getSkillInfo(SkillNames.WeiTuoXianChu),
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
      ...baseSkillContext,
      ...this.getSkillInfo(SkillNames.PoZhao),
      skillBasicNumber: 0,
      basicDamage: core.PoZhao,
      basicDamageCoefficient: 15.2288,
      damageBonuesCoefficient: BaseCoefficient + ErYeYiYuanCoefficient,
    });
    skills.push(poZhao);

    const naYunShi = new Skill({
      ...baseSkillContext,
      ...this.getSkillInfo(SkillNames.NaYunShi),
      skillBasicNumber: 258.5,
      basicDamageCoefficient: 2,
      targetDamageCoefficient: ingoreTargetDefenceCoefficient,
      damageBonuesCoefficient: () => {
        return (BaseCoefficient + MiJiCoefficient + ErYeYiYuanCoefficient + skillSetBonuseCoefficient + FoGuoCoefficient) * ZhongChenCoefficient * MingFaCoefficient;
      },
    });
    skills.push(naYunShi);

    const hengSaoLiuHe = new Skill({
      ...baseSkillContext,
      ...this.getSkillInfo(SkillNames.HengSaoLiuHe),
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
      ...baseSkillContext,
      ...this.getSkillInfo(SkillNames.ShouQueShi),
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
      ...baseSkillContext,
      ...this.getSkillInfo(SkillNames.HengSaoLiuHeDot),
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
      ...baseSkillContext,
      ...this.getSkillInfo(SkillNames.PuDuSiFang),
      skillBasicNumber: 163.5,
      basicDamageCoefficient: 0.92,
      damageBonuesCoefficient: () => {
        const cwBuff = hasCw ? 0.0996 / 2 : 0;
        return (BaseCoefficient + 0.0996 + FoGuoCoefficient + ErYeYiYuanCoefficient + cwBuff) * MingFaCoefficient;
      }
    });
    skills.push(puDuSiFang);

    const suoDi = new Skill({
      ...baseSkillContext,
      ...this.getSkillInfo(SkillNames.SuoDi),
      skillBasicNumber: 407.5,
      basicDamageCoefficient: 1.25,
      damageBonuesCoefficient: (BaseCoefficient + ErYeYiYuanCoefficient) * MingFaCoefficient,
    });
    skills.push(suoDi);

    const tiHuGuanDing = new Skill({
      ...baseSkillContext,
      ...this.getSkillInfo(SkillNames.TiHuGuanDing),
      skillBasicNumber: 407.5,
      basicDamageCoefficient: 1.92185,
      damageBonuesCoefficient: (BaseCoefficient + ErYeYiYuanCoefficient),
    });
    skills.push(tiHuGuanDing);

    const foGuo = new Skill({
      ...baseSkillContext,
      ...this.getSkillInfo(SkillNames.FoGuo),
      skillBasicNumber: 127.5,
      basicDamageCoefficient: 0.697922,
      damageBonuesCoefficient: BaseCoefficient + 0.3 + ErYeYiYuanCoefficient
    });
    skills.push(foGuo);

    const FMHand = new Skill({
      ...baseSkillContext,
      ...this.getSkillInfo(EnChantsList.EnChantHand),
      skillBasicNumber: 0,
      basicDamageCoefficient: 0.95,
      damageBonuesCoefficient: (BaseCoefficient + ErYeYiYuanCoefficient) * 0.4,
    });
    skills.push(FMHand);

    const FMFeet = new Skill({
      ...baseSkillContext,
      ...this.getSkillInfo(EnChantsList.EnChantShoe),
      skillBasicNumber: 0,
      basicDamageCoefficient: 0.38125,
      damageBonuesCoefficient: (BaseCoefficient + ErYeYiYuanCoefficient)
    });
    skills.push(FMFeet);

    const weituoTotal = await weiTuo.calculator().subTotal;
    const nayunTotal = await naYunShi.calculator().subTotal;

    const xiangMo = new Skill({
      ...baseSkillContext,
      ...this.getSkillInfo(SkillNames.XiangMo),
      skillBasicNumber: 0,
      basicDamage: (ctx) => {
        return (weituoTotal + nayunTotal) / 4 / 1.2 / ctx.skillTimes;
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