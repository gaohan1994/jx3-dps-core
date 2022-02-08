import DpsCore from '@packages/core/core';
import Skill from '@packages/core/skill';
import { createMiJi, IgnoreDefenceMiJi } from '@packages/core/miji';
import ChainComponent from '@componet/chain';
import {
  increaseCriticalDamagePower,
  increaseSolarAttackPowerBase,
  increaseSolarCriticalStrike,
  isSanShengVersion,
  isXinZhengVersion,
  makeSolarAttackPower,
} from '@componet/utils';
import {
  SONGYAN_INCREASED_SOLARCRITICALSTRIKERATE,
  SONGYAN_INCREATED_SOLARATTACKPOWERBASE,
  SANSHENG_QIDIAN_INCREASED_SOLARATTACKPOWERBASE_PERCENT,
} from '@config/constants';
import { SkillNames, SkillTitles } from '@types';
import { SkillChainPayload } from './main-calculator';
import { pipe } from '@componet/compose';
import {
  createHengSaoLiuHeChain,
  createHengSaoLiuHeDotChain,
  createPuDuSiFangChain,
  createShouQueShiChain,
  createSuoDiChain,
  createLiuHeGunChain,
  createNaYunShiChain,
  createSurplusValueChain,
  createWeiTuoXianChuChain,
  createTiHuGuanDingChain,
  createXinZhengChain,
  createXinZhengGunWuChain,
  createFoGuoChain,
  createEnChantHandChain,
  createEnChantShoeChain,
  createXiangMoChain,
  createQianJinZhuiChain,
  createJinGangRiLunChain,
} from './chains';

/**
 * @param {number} BaseCoefficient 基础系数1
 * @param {number} ErYeYiYuanCoefficient 二业依缘
 * @param {number} SkillSetBonuseCoefficient 套装系数
 * @param {number} ZhongChenCoefficient 众嗔
 * @param {number} MingFaCoefficient 明法
 * @param {number} FoGuoCoefficient 佛果
 * @param {number} CwBuffCoefficient 橙武特效
 * @param {number} _MiJiCoefficient 终结技私有
 */
type DamageCoefficientParams = {
  BaseCoefficient: number;
  ErYeYiYuanCoefficient: number;
  SkillSetBonuseCoefficient: number;
  ZhongChenCoefficient: number;
  MingFaCoefficient: number;
  FoGuoCoefficient: number;
  CwBuffCoefficient: number;
  _MiJiCoefficient: number;
};

/**
 * 创建影响技能damage伤害系数的相关参数
 * @param _MiJiCoefficient 终结技私有
 * @param payload
 * @returns
 */
export const getDamageCoefficientParams = (payload: SkillChainPayload): DamageCoefficientParams => {
  const { support } = payload;
  const hasCw = support.hasCw();
  const hasSkillSetBonuese = support.hasSkillSetBonuese();
  return {
    BaseCoefficient: 1,
    ErYeYiYuanCoefficient: 0.0996,
    SkillSetBonuseCoefficient: hasSkillSetBonuese ? 0.0996 : 0,
    ZhongChenCoefficient: 1.2,
    MingFaCoefficient: 1.12,
    FoGuoCoefficient: 0.35 * 0.3,
    CwBuffCoefficient: hasCw ? 0.0996 / 2 : 0,
    _MiJiCoefficient: 0.12,
  };
};

export const ignoreMiJi = [createMiJi('', 0.6, IgnoreDefenceMiJi)];

export const makeSkillBaseInformation = (payload: SkillChainPayload, key: SkillNames) => {
  const { skillTimes } = payload;
  return {
    skillName: key,
    skillTitle: SkillTitles[key],
    skillTimes: skillTimes[key],
  };
};

export const insertPayloadSkills = (payload: SkillChainPayload, skill: Skill): void => {
  payload.skills.push(skill);
};

/**
 * 身意buff，增幅双会各5%
 * @param {SkillChainPayload} payload
 * @returns {SkillChainPayload}
 */
export const increasedShenYi = (payload: SkillChainPayload): SkillChainPayload => {
  const getNextCore = pipe(
    (core: DpsCore) => increaseSolarCriticalStrike(core, { SolarCriticalStrikeRate: 0.05 }),
    (core: DpsCore) => increaseCriticalDamagePower(core, { SolarCriticalDamagePowerPercent: 0.05 })
  );
  return {
    ...payload,
    core: getNextCore(payload.core),
  };
};

/**
 * 创建经过三生加成后的core
 * @param payload
 * @param qiDian
 * @returns
 */
export const increasedSansheng = (
  payload: SkillChainPayload,
  qiDian: number
): SkillChainPayload => {
  if (!isSanShengVersion(payload.options)) {
    return payload;
  }
  // 创建三生buff下的人物属性 每豆提升8%基础
  const nextCore = makeSolarAttackPower(
    increaseSolarAttackPowerBase(payload.core, {
      SolarAttackPowerBasePercent: qiDian * SANSHENG_QIDIAN_INCREASED_SOLARATTACKPOWERBASE_PERCENT,
    })
  );
  return {
    ...payload,
    core: nextCore,
  };
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
export const increasedSongYan = (payload: SkillChainPayload, coverage = 1): SkillChainPayload => {
  if (!isXinZhengVersion(payload.options)) {
    return payload;
  }
  const SONG_YAN_TOUCHES = 6;
  const getNextCore = pipe(
    (core: DpsCore) =>
      increaseSolarCriticalStrike(core, {
        SolarCriticalStrikeRate:
          SONGYAN_INCREASED_SOLARCRITICALSTRIKERATE * SONG_YAN_TOUCHES * coverage,
      }),
    (core: DpsCore) =>
      increaseSolarAttackPowerBase(core, {
        SolarAttackPowerBase: SONGYAN_INCREATED_SOLARATTACKPOWERBASE * SONG_YAN_TOUCHES * coverage,
      })
  );
  return {
    ...payload,
    core: getNextCore(payload.core),
  };
};

export const createSkillChains = (payload: SkillChainPayload) => {
  const surplusValueChain = new ChainComponent(createSurplusValueChain);
  const liuHeGunChain = new ChainComponent(createLiuHeGunChain);
  const weiTuoXianChuChain = new ChainComponent(createWeiTuoXianChuChain);
  const naYunShiChain = new ChainComponent(createNaYunShiChain);
  const hengSaoLiuHeChain = new ChainComponent(createHengSaoLiuHeChain);
  const hengSaoLiuHeDotChain = new ChainComponent(createHengSaoLiuHeDotChain);
  const shouQueShiChain = new ChainComponent(createShouQueShiChain);
  const puDuSiFangChain = new ChainComponent(createPuDuSiFangChain);
  const suoDiChain = new ChainComponent(createSuoDiChain);
  const tiHuGuanDingChain = new ChainComponent(createTiHuGuanDingChain);
  const xinZhengChain = new ChainComponent(createXinZhengChain);
  const xinZhengGunWuChain = new ChainComponent(createXinZhengGunWuChain);
  const foGuoChain = new ChainComponent(createFoGuoChain);
  const enChantHandChain = new ChainComponent(createEnChantHandChain);
  const enChantShoeChain = new ChainComponent(createEnChantShoeChain);
  const xiangMoChain = new ChainComponent(createXiangMoChain);
  const qianJinZhuiChain = new ChainComponent(createQianJinZhuiChain);
  const jinGangRiLunChain = new ChainComponent(createJinGangRiLunChain);

  surplusValueChain
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

  surplusValueChain.passRequest(payload);
};
