import DpsCore from '@packages/core/core';
import Skill, { createSkillFactory } from '@packages/core/skill';
import { createMiJi, IgnoreDefenceMiJi } from '@packages/core/miji';
import ChainComponent from '@componet/chain';
import {
  deepClone,
  increaseSolarAttackPowerBase,
  isJinGangRiLunEnchat,
  isXinZhengVersion,
  makeZongGongJi,
} from '@componet/utils';
import {
  SONGYAN_INCREASED_SOLARCRITICALSTRIKERATE,
  SONGYAN_INCREATED_SOLARATTACKPOWERBASE,
  SANSHENG_QIDIAN_INCREASED_SOLARATTACKPOWERBASE_PERCENT,
} from '@config/constants';
import { YiJinJingSkillEnchant, YiJinJingQiXueVersion, SkillNames, SkillTitles } from '@types';
import { SkillChainPayload } from './calculator';

const createSanShengSkillCore = (prevCore: DpsCore, qiDian: number): DpsCore => {
  // 创建三生buff下的人物属性 每豆提升8%基础
  const nextCore = makeZongGongJi(
    increaseSolarAttackPowerBase(prevCore, {
      SolarAttackPowerBasePercent: qiDian * SANSHENG_QIDIAN_INCREASED_SOLARATTACKPOWERBASE_PERCENT,
    })
  );
  return nextCore;
};

const shenYiBuff = (currentCore: DpsCore) => {
  return (
    (currentCore.SolarCriticalStrikeRate / 100 + 0.05) *
      (currentCore.SolarCriticalDamagePowerPercent / 100 + 0.05) +
    1 -
    (currentCore.SolarCriticalStrikeRate / 100 + 0.05)
  );
};

/**
 * 颂言buff
 * 每层3%会心，400内功（描述有误不是4%而是400不吃buff但是吃三生） 最多6层（单目标）
 * 心诤丶扫击，金刚日轮，横扫+横扫DOT可以吃到buff
 *
 * @param {DpsCore} currentCore
 * @param {number} [coverage=1]
 * @param {number} qiDian
 * @return {*}
 */
const songYanBuff = (payload: SkillChainPayload, coverage = 1): SkillChainPayload => {
  const totalTouchs = 6;
  // 每层 3% 会心，一共挥击6次，共18%会心
  const increasedSolarCriticalStrikeRate =
    SONGYAN_INCREASED_SOLARCRITICALSTRIKERATE * totalTouchs * coverage;

  // 每层 400 面板攻击，一共挥击6次，共2400面板攻击
  const solarAttackPowerBaseIncreated =
    SONGYAN_INCREATED_SOLARATTACKPOWERBASE * totalTouchs * coverage;

  const nextCore = deepClone(payload.core);
  nextCore.SolarCriticalStrikeRate += increasedSolarCriticalStrikeRate;
  nextCore.SolarAttackPowerBase += solarAttackPowerBaseIncreated;

  payload.core = nextCore;
  return payload;
};

export const createSkillChains = (payload: SkillChainPayload) => {
  // 基本组件
  const { support, skillTimes } = payload;
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
  const MingFaCoefficient = 1.12;
  const MiJiCoefficient = 0.12;
  const FoGuoCoefficient = 0.35 * 0.3;
  const ignoreMiJi = [createMiJi('', 0.6, IgnoreDefenceMiJi)];
  const cwBuff = hasCw ? 0.0996 / 2 : 0;

  const poZhaoChain = new ChainComponent((payload: SkillChainPayload) => {
    const { core } = payload;
    const key = SkillNames.PoZhao;
    const skill = createSkillFactory(core, support, {
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
    const skill = createSkillFactory(core, support, {
      skillName: key,
      skillTitle: SkillTitles[key],
      skillTimes: skillTimes[key],
      basicDamage: 0,
      skillBasicNumber: core.WuQiShangHai,
      basicDamageCoefficient: 0,
      solarOvercomeCoefficient: 1,
    });
    skills.push(skill);
    return ChainComponent.NEXT_CHAIN_SUCCESSOR;
  });
  const weiTuoXianChuChain = new ChainComponent((payload: SkillChainPayload) => {
    const { core } = payload;
    const key = SkillNames.WeiTuoXianChu;
    const skill = createSkillFactory(createSanShengSkillCore(core, 3), support, {
      skillName: key,
      skillTitle: SkillTitles[key],
      skillTimes: skillTimes[key],
      skillBasicNumber: 179,
      basicDamageCoefficient: 1.66,
      criticalCoefficient: shenYiBuff(core),
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

  const naYunShiChain = new ChainComponent((payload: SkillChainPayload) => {
    const { core } = payload;
    const key = SkillNames.NaYunShi;
    const skill = createSkillFactory(createSanShengSkillCore(core, 3), support, {
      skillName: key,
      skillTitle: SkillTitles[key],
      skillTimes: skillTimes[key],
      skillBasicNumber: 258.5,
      basicDamageCoefficient: 2,
      criticalCoefficient: shenYiBuff(core),
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
    const HengSaoLiuHeQiDian = 1.5;
    const currentPayload = isXinZhengVersion(payload.options)
      ? songYanBuff(deepClone(payload))
      : payload;
    const { core } = currentPayload;
    const key = SkillNames.HengSaoLiuHe;
    const skill = createSkillFactory(createSanShengSkillCore(core, HengSaoLiuHeQiDian), support, {
      skillName: key,
      skillTitle: SkillTitles[key],
      skillTimes: skillTimes[key],
      skillBasicNumber: 75,
      basicDamageCoefficient: 0.58,
      damageBonuesCoefficient:
        (BaseCoefficient + ErYeYiYuanCoefficient + FoGuoCoefficient + 0.5) * MingFaCoefficient,
    });
    skills.push(skill);
    return ChainComponent.NEXT_CHAIN_SUCCESSOR;
  });
  const hengSaoLiuHeDotChain = new ChainComponent((payload: SkillChainPayload) => {
    const HengSaoLiuHeQiDian = 1.5;
    const currentPayload = isXinZhengVersion(payload.options)
      ? songYanBuff(deepClone(payload))
      : payload;
    const { core } = currentPayload;
    const key = SkillNames.HengSaoLiuHeDot;
    const skill = createSkillFactory(createSanShengSkillCore(core, HengSaoLiuHeQiDian), support, {
      skillName: key,
      skillTitle: SkillTitles[key],
      skillTimes: skillTimes[key],
      skillBasicNumber: 45,
      basicDamageCoefficient: 0.083,
      damageBonuesCoefficient:
        ((BaseCoefficient + FoGuoCoefficient + ErYeYiYuanCoefficient) * 2 * 3 * MingFaCoefficient) /
        3,
    });
    skills.push(skill);
    return ChainComponent.NEXT_CHAIN_SUCCESSOR;
  });
  const shouQueShiChain = new ChainComponent((payload: SkillChainPayload) => {
    const { core } = payload;
    const key = SkillNames.ShouQueShi;
    const skill = createSkillFactory(createSanShengSkillCore(core, 2), support, {
      skillName: key,
      skillTitle: SkillTitles[key],
      skillTimes: skillTimes[key],
      skillBasicNumber: 144.5,
      basicDamageCoefficient: 1.36,
      damageBonuesCoefficient:
        (BaseCoefficient + 0.12 + ErYeYiYuanCoefficient + cwBuff + FoGuoCoefficient) *
        ZhongChenCoefficient *
        MingFaCoefficient,
      criticalCoefficient:
        (core.SolarCriticalStrikeRate / 100 + 0.04 + 0.1) *
          (core.SolarCriticalDamagePowerPercent / 100 + 0.1) +
        1 -
        (core.SolarCriticalStrikeRate / 100 + 0.04 + 0.1),
      miJi: ignoreMiJi,
    });
    skills.push(skill);
    return ChainComponent.NEXT_CHAIN_SUCCESSOR;
  });
  const puDuSiFangChain = new ChainComponent((payload: SkillChainPayload) => {
    const { core } = payload;
    const key = SkillNames.PuDuSiFang;
    const skill = createSkillFactory(createSanShengSkillCore(core, 1), support, {
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
  const suoDiChain = new ChainComponent((payload: SkillChainPayload) => {
    const { core } = payload;
    const key = SkillNames.SuoDi;
    const skill = createSkillFactory(createSanShengSkillCore(core, 2), support, {
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
    const { core } = payload;
    const { qiXueVersion } = payload.options;
    if (qiXueVersion !== YiJinJingQiXueVersion.TiHuGuanDing) {
      return ChainComponent.NEXT_CHAIN_SUCCESSOR;
    }
    const key = SkillNames.TiHuGuanDing;
    const skill = createSkillFactory(createSanShengSkillCore(core, 3), support, {
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
    const XinZhengQiDian = 3;
    if (!isXinZhengVersion(payload.options)) {
      return ChainComponent.NEXT_CHAIN_SUCCESSOR;
    }
    const { core } = songYanBuff(deepClone(payload));
    const key = SkillNames.XinZheng;
    const skill = createSkillFactory(createSanShengSkillCore(core, XinZhengQiDian), support, {
      skillName: key,
      skillTitle: SkillTitles[key],
      skillTimes: skillTimes[key],
      // 少林削弱心诤减少 15%
      basicDamageCoefficient: 3.53 * 0.85,
      damageBonuesCoefficient: BaseCoefficient + ErYeYiYuanCoefficient,
    });
    skills.push(skill);
    return ChainComponent.NEXT_CHAIN_SUCCESSOR;
  });
  const xinZhengGunWuChain = new ChainComponent((payload: SkillChainPayload) => {
    if (!isXinZhengVersion(payload.options)) {
      return ChainComponent.NEXT_CHAIN_SUCCESSOR;
    }
    const { core } = songYanBuff(deepClone(payload), 0.5);
    const key = SkillNames.XinZhengGunWu;
    const skill = createSkillFactory(createSanShengSkillCore(core, 3), support, {
      skillName: key,
      skillTitle: SkillTitles[key],
      skillTimes: skillTimes[key],
      skillBasicNumber: 0,
      // 少林削弱棍舞增加 30%
      basicDamageCoefficient: 0.2 * 1.3,
      damageBonuesCoefficient: BaseCoefficient + ErYeYiYuanCoefficient,
    });
    skills.push(skill);
    return ChainComponent.NEXT_CHAIN_SUCCESSOR;
  });
  const foGuoChain = new ChainComponent((payload: SkillChainPayload) => {
    const { core } = payload;
    const key = SkillNames.FoGuo;
    const skill = createSkillFactory(createSanShengSkillCore(core, 1.5), support, {
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
  const enChantHandChain = new ChainComponent((payload: SkillChainPayload) => {
    const { core } = payload;
    const key = SkillNames.EnChantHand;
    const skill = createSkillFactory(createSanShengSkillCore(core, 1.5), support, {
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
    const { core } = payload;
    const key = SkillNames.EnChantShoe;
    const skill = createSkillFactory(createSanShengSkillCore(core, 1.5), support, {
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

  const xiangMoChain = new ChainComponent((payload: SkillChainPayload) => {
    const { core } = payload;
    const weituo = skills.find(sk => sk.skillName === SkillNames.WeiTuoXianChu);
    const nayun = skills.find(sk => sk.skillName === SkillNames.NaYunShi);

    const key = SkillNames.XiangMo;
    const skill = createSkillFactory(core, support, {
      skillName: key,
      skillTitle: SkillTitles[key],
      skillTimes: skillTimes[key],
      skillBasicNumber: 0,
      basicDamage: (weituo.subTotal + nayun.subTotal) / 4 / 1.2 / skillTimes[SkillNames.XiangMo],
      solarOvercomeCoefficient: 1,
      strainCoefficient: 1,
      criticalCoefficient: 1,
      targetDamageCoefficient: 1,
    });
    skills.push(skill);
    return ChainComponent.NEXT_CHAIN_SUCCESSOR;
  });

  const qianJinZhuiChain = new ChainComponent((payload: SkillChainPayload) => {
    const { core } = payload;
    const { skillEnchant } = payload.options;
    if (!skillEnchant && skillEnchant !== YiJinJingSkillEnchant.JinGangRiLun) {
      return ChainComponent.NEXT_CHAIN_SUCCESSOR;
    }
    const key = SkillNames.QianJinZhui;
    const skill = createSkillFactory(core, support, {
      skillName: key,
      skillTitle: SkillTitles[key],
      skillTimes: skillTimes[key],
      strainCoefficient: 1,
      solarOvercomeCoefficient: 1,
      criticalCoefficient: 1,
      targetDamageCoefficient: 1,
    });
    skills.push(skill);
    return ChainComponent.NEXT_CHAIN_SUCCESSOR;
  });

  const jinGangRiLunChain = new ChainComponent((payload: SkillChainPayload) => {
    const JinGangRiLunQiDian = 3;
    if (!isJinGangRiLunEnchat(payload.options)) {
      return ChainComponent.NEXT_CHAIN_SUCCESSOR;
    }
    const { core } = songYanBuff(deepClone(payload));
    const key = SkillNames.JinGangRiLun;
    const skill = createSkillFactory(createSanShengSkillCore(core, JinGangRiLunQiDian), support, {
      skillName: key,
      skillTitle: SkillTitles[key],
      skillTimes: skillTimes[key],
      basicDamageCoefficient: 4.4,
      damageBonuesCoefficient:
        (BaseCoefficient + ErYeYiYuanCoefficient + FoGuoCoefficient) *
        ZhongChenCoefficient *
        MingFaCoefficient,
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
    .setNextSuccessor(enChantShoeChain)
    .setNextSuccessor(qianJinZhuiChain)
    .setNextSuccessor(jinGangRiLunChain);

  poZhaoChain.passRequest(payload);
  return skills;
};
