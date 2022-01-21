import Skill, { createSkillFactory } from '@packages/core/skill';
import { createMiJi, IgnoreDefenceMiJi } from '@packages/core/miji';
import ChainComponent from '@componet/chain';
import { SkillChainPayload, YiJinJingQiXueVersion } from './calculatorWoker';
import { SkillNames, SkillTitles } from './skillTimesChain';

export const createSkillChains = (payload: SkillChainPayload) => {
  // 基本组件
  const { core: baseCore, support, skillTimes } = payload;
  const skills: Skill[] = [];

  const hasSkillSetBonuese = support.hasSkillSetBonuese();
  /**
   * @param BaseCoefficient 基础系数
   * @param ErYeYiYuanCoefficient 二业依缘系数
   * @param skillSetBonuseCoefficient 套装
   * @param ZhongChenCoefficient 众嗔系数（乘法）
   * @param MingFaCoefficient 明发
   * @param FoGuoCoefficient 佛果
   */
  // 是否含有橙武
  const hasCw = support.hasCw();
  const BaseCoefficient = 1;
  const ErYeYiYuanCoefficient = 0.0996;
  const skillSetBonuseCoefficient = hasSkillSetBonuese ? 0.0996 : 0;
  const ZhongChenCoefficient = 1.2;
  const MingFaCoefficient = 1.11;
  const MiJiCoefficient = 0.12;
  const FoGuoCoefficient = 0.3 * 0.3;
  const ignoreMiJi = [createMiJi('', 0.6, IgnoreDefenceMiJi)];
  const cwBuff = hasCw ? 0.0996 / 2 : 0;

  const baseCoreSkillFactory = createSkillFactory(baseCore, support);

  const poZhaoChain = new ChainComponent((payload: SkillChainPayload) => {
    const { core } = payload;
    const key = SkillNames.PoZhao;
    const skill = baseCoreSkillFactory({
      skillName: key,
      skillTitle: SkillTitles[key],
      skillTimes: skillTimes[key],
      basicDamage: core.PoZhao,
      basicDamageCoefficient: 15.2288,
      damageBonuesCoefficient: BaseCoefficient + ErYeYiYuanCoefficient,
    });
    skills.push(skill);
    return ChainComponent.NEXT_CHAIN_SUCCESSOR;
  });

  const liuHeGunChain = new ChainComponent((payload: SkillChainPayload) => {
    const { core } = payload;
    const key = SkillNames.LiuHeGun;
    const skill = baseCoreSkillFactory({
      skillName: key,
      skillTitle: SkillTitles[key],
      skillTimes: skillTimes[key],
      basicDamage: 0,
      skillBasicNumber: core.WuQiShangHai,
      basicDamageCoefficient: 0,
      poFangCoefficient: 1,
    });
    skills.push(skill);
    return ChainComponent.NEXT_CHAIN_SUCCESSOR;
  });

  const weiTuoXianChuChain = new ChainComponent(() => {
    const key = SkillNames.WeiTuoXianChu;
    const skill = baseCoreSkillFactory({
      skillName: key,
      skillTitle: SkillTitles[key],
      skillTimes: skillTimes[key],
      skillBasicNumber: 179,
      basicDamageCoefficient: 1.66,
      damageBonuesCoefficient:
        (BaseCoefficient +
          MiJiCoefficient +
          ErYeYiYuanCoefficient +
          skillSetBonuseCoefficient +
          FoGuoCoefficient) *
        ZhongChenCoefficient *
        MingFaCoefficient,
      miJi: ignoreMiJi,
    });
    skills.push(skill);
    return ChainComponent.NEXT_CHAIN_SUCCESSOR;
  });
  const naYunShiChain = new ChainComponent(() => {
    const key = SkillNames.NaYunShi;
    const skill = baseCoreSkillFactory({
      skillName: key,
      skillTitle: SkillTitles[key],
      skillTimes: skillTimes[key],
      skillBasicNumber: 258.5,
      basicDamageCoefficient: 2,
      damageBonuesCoefficient:
        (BaseCoefficient +
          MiJiCoefficient +
          ErYeYiYuanCoefficient +
          skillSetBonuseCoefficient +
          FoGuoCoefficient) *
        ZhongChenCoefficient *
        MingFaCoefficient,
      miJi: ignoreMiJi,
    });
    skills.push(skill);
    return ChainComponent.NEXT_CHAIN_SUCCESSOR;
  });
  const hengSaoLiuHeChain = new ChainComponent((payload: SkillChainPayload) => {
    const { core } = payload;
    const key = SkillNames.HengSaoLiuHeDot;
    const skill = baseCoreSkillFactory({
      skillName: key,
      skillTitle: SkillTitles[key],
      skillTimes: skillTimes[key],
      skillBasicNumber: 45,
      basicDamageCoefficient: 0.083,
      damageBonuesCoefficient:
        (BaseCoefficient + FoGuoCoefficient + ErYeYiYuanCoefficient) * 2 * 3 * MingFaCoefficient,
      huiXinHuiXiaoCoefficient:
        (core.HuiXin / 100 + 0.1) * (core.HuiXiao / 100 + 0.1) + 1 - (core.HuiXin / 100 + 0.1),
    });
    skills.push(skill);
    return ChainComponent.NEXT_CHAIN_SUCCESSOR;
  });
  const hengSaoLiuHeDotChain = new ChainComponent((payload: SkillChainPayload) => {
    const { core } = payload;
    const key = SkillNames.HengSaoLiuHe;
    const skill = baseCoreSkillFactory({
      skillName: key,
      skillTitle: SkillTitles[key],
      skillTimes: skillTimes[key],
      skillBasicNumber: 75,
      basicDamageCoefficient: 0.58,
      damageBonuesCoefficient:
        (BaseCoefficient + ErYeYiYuanCoefficient + FoGuoCoefficient + 0.5) * 2 * MingFaCoefficient,
      huiXinHuiXiaoCoefficient:
        (core.HuiXin / 100 + 0.1) * (core.HuiXiao / 100 + 0.1) + 1 - (core.HuiXin / 100 + 0.1),
    });
    skills.push(skill);
    return ChainComponent.NEXT_CHAIN_SUCCESSOR;
  });
  const shouQueShiChain = new ChainComponent((payload: SkillChainPayload) => {
    const { core } = payload;
    const key = SkillNames.ShouQueShi;
    const skill = baseCoreSkillFactory({
      skillName: key,
      skillTitle: SkillTitles[key],
      skillTimes: skillTimes[key],
      skillBasicNumber: 144.5,
      basicDamageCoefficient: 1.36,
      damageBonuesCoefficient:
        (BaseCoefficient + 0.12 + ErYeYiYuanCoefficient + cwBuff + FoGuoCoefficient) *
        ZhongChenCoefficient *
        MingFaCoefficient,
      huiXinHuiXiaoCoefficient:
        (core.HuiXin / 100 + 0.04 + 0.1) * (core.HuiXiao / 100 + 0.1) +
        1 -
        (core.HuiXin / 100 + 0.04 + 0.1),
      miJi: ignoreMiJi,
    });
    skills.push(skill);
    return ChainComponent.NEXT_CHAIN_SUCCESSOR;
  });
  const puDuSiFangChain = new ChainComponent(() => {
    const key = SkillNames.PuDuSiFang;
    const skill = baseCoreSkillFactory({
      skillName: key,
      skillTitle: SkillTitles[key],
      skillTimes: skillTimes[key],
      skillBasicNumber: 163.5,
      basicDamageCoefficient: 0.92,
      damageBonuesCoefficient:
        (BaseCoefficient + 0.0996 + FoGuoCoefficient + ErYeYiYuanCoefficient + cwBuff) *
        MingFaCoefficient,
    });
    skills.push(skill);
    return ChainComponent.NEXT_CHAIN_SUCCESSOR;
  });
  const suoDiChain = new ChainComponent(() => {
    const key = SkillNames.SuoDi;
    const skill = baseCoreSkillFactory({
      skillName: key,
      skillTitle: SkillTitles[key],
      skillTimes: skillTimes[key],
      skillBasicNumber: 407.5,
      basicDamageCoefficient: 1.25,
      damageBonuesCoefficient: (BaseCoefficient + ErYeYiYuanCoefficient) * MingFaCoefficient,
    });
    skills.push(skill);
    return ChainComponent.NEXT_CHAIN_SUCCESSOR;
  });
  const tiHuGuanDingChain = new ChainComponent((payload: SkillChainPayload) => {
    const { qiXueVersion } = payload.options;
    if (qiXueVersion !== YiJinJingQiXueVersion.TiHuGuanDing) {
      return ChainComponent.NEXT_CHAIN_SUCCESSOR;
    }
    const key = SkillNames.TiHuGuanDing;
    const skill = baseCoreSkillFactory({
      skillName: key,
      skillTitle: SkillTitles[key],
      skillTimes: skillTimes[key],
      skillBasicNumber: 407.5,
      basicDamageCoefficient: 1.92185,
      damageBonuesCoefficient: BaseCoefficient + ErYeYiYuanCoefficient,
    });
    skills.push(skill);
    return ChainComponent.NEXT_CHAIN_SUCCESSOR;
  });
  const xinZhengChain = new ChainComponent((payload: SkillChainPayload) => {
    const { qiXueVersion } = payload.options;
    if (qiXueVersion !== YiJinJingQiXueVersion.XinZheng) {
      return ChainComponent.NEXT_CHAIN_SUCCESSOR;
    }
    const key = SkillNames.XinZheng;
    const skill = baseCoreSkillFactory({
      skillName: key,
      skillTitle: SkillTitles[key],
      skillTimes: skillTimes[key],
      basicDamageCoefficient: 3.53,
      damageBonuesCoefficient: BaseCoefficient + ErYeYiYuanCoefficient,
    });
    skills.push(skill);
    return ChainComponent.NEXT_CHAIN_SUCCESSOR;
  });
  const xinZhengGunWuChain = new ChainComponent((payload: SkillChainPayload) => {
    const { qiXueVersion } = payload.options;
    if (qiXueVersion !== YiJinJingQiXueVersion.XinZheng) {
      return ChainComponent.NEXT_CHAIN_SUCCESSOR;
    }
    const key = SkillNames.XinZhengGunWu;
    const skill = baseCoreSkillFactory({
      skillName: key,
      skillTitle: SkillTitles[key],
      skillTimes: skillTimes[key],
      skillBasicNumber: 0,
      basicDamageCoefficient: 0.2,
      damageBonuesCoefficient: BaseCoefficient + ErYeYiYuanCoefficient,
    });
    skills.push(skill);
    return ChainComponent.NEXT_CHAIN_SUCCESSOR;
  });
  const foGuoChain = new ChainComponent((payload: SkillChainPayload) => {
    const key = SkillNames.FoGuo;
    const skill = baseCoreSkillFactory({
      skillName: key,
      skillTitle: SkillTitles[key],
      skillTimes: skillTimes[key],
      skillBasicNumber: 127.5,
      basicDamageCoefficient: 0.697922,
      damageBonuesCoefficient: BaseCoefficient + 0.3 + ErYeYiYuanCoefficient,
    });
    skills.push(skill);
    return ChainComponent.NEXT_CHAIN_SUCCESSOR;
  });
  const enChantHandChain = new ChainComponent(() => {
    const key = SkillNames.EnChantHand;
    const skill = baseCoreSkillFactory({
      skillName: key,
      skillTitle: SkillTitles[key],
      skillTimes: skillTimes[key],
      skillBasicNumber: 0,
      basicDamageCoefficient: 0.95,
      damageBonuesCoefficient: (BaseCoefficient + ErYeYiYuanCoefficient) * 0.4,
    });
    skills.push(skill);
    return ChainComponent.NEXT_CHAIN_SUCCESSOR;
  });
  const enChantShoeChain = new ChainComponent((payload: SkillChainPayload) => {
    const key = SkillNames.EnChantShoe;
    const skill = baseCoreSkillFactory({
      skillName: key,
      skillTitle: SkillTitles[key],
      skillTimes: skillTimes[key],
      skillBasicNumber: 0,
      basicDamageCoefficient: 0.38125,
      damageBonuesCoefficient: BaseCoefficient + ErYeYiYuanCoefficient,
    });
    skills.push(skill);
    return ChainComponent.NEXT_CHAIN_SUCCESSOR;
  });

  const xiangMoChain = new ChainComponent(() => {
    const weituo = skills.find(sk => sk.skillName === SkillNames.WeiTuoXianChu);
    const nayun = skills.find(sk => sk.skillName === SkillNames.NaYunShi);

    const key = SkillNames.XiangMo;
    const skill = baseCoreSkillFactory({
      skillName: key,
      skillTitle: SkillTitles[key],
      skillTimes: skillTimes[key],
      skillBasicNumber: 0,
      basicDamage: (weituo.subTotal + nayun.subTotal) / 4 / 1.2 / skillTimes[SkillNames.XiangMo],
      poFangCoefficient: 1,
      wuShuangCoefficient: 1,
      huiXinHuiXiaoCoefficient: 1,
      targetDamageCoefficient: 1,
    });
    skills.push(skill);
    return ChainComponent.NEXT_CHAIN_SUCCESSOR;
  });

  poZhaoChain
    .setNextSuccessor(liuHeGunChain)
    .setNextSuccessor(weiTuoXianChuChain)
    .setNextSuccessor(naYunShiChain)
    .setNextSuccessor(hengSaoLiuHeChain)
    .setNextSuccessor(hengSaoLiuHeDotChain)
    .setNextSuccessor(tiHuGuanDingChain)
    .setNextSuccessor(xinZhengChain)
    .setNextSuccessor(xinZhengGunWuChain)
    .setNextSuccessor(shouQueShiChain)
    .setNextSuccessor(puDuSiFangChain)
    .setNextSuccessor(suoDiChain)
    .setNextSuccessor(foGuoChain)
    .setNextSuccessor(xiangMoChain)
    .setNextSuccessor(enChantHandChain)
    .setNextSuccessor(enChantShoeChain);

  poZhaoChain.passRequest(payload);
  return skills;
};
