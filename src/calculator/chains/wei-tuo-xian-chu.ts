import { SkillChainPayload } from '@calculator/main-calculator';
import {
  getDamageCoefficientParams,
  ignoreMiJi,
  increasedSansheng,
  increasedShenYi,
  insertPayloadSkills,
  makeSkillBaseInformation,
} from '@calculator/skillChain';
import ChainComponent from '@componet/chain';
import { pipe } from '@componet/compose';
import { deepClone, increaseSolarCriticalStrike } from '@componet/utils';
import { createSkillFactory } from '@packages/core/skill';
import { SkillNames } from '@types';

/**
 * 技能描述伤害，很小的那个基本没啥用聊胜于无
 * @param SKILL_BASIC_NUMBER
 *
 * 技能系数[重要]
 * @param BASIC_DAMAGE_COEFFICIENT
 */
const SKILL_BASIC_NUMBER = 179;
const BASIC_DAMAGE_COEFFICIENT = 1.66;

/**
 * 小橙武给韦陀加5%的会心率
 *
 * @param {SkillChainPayload} payload
 * @return {*}  {SkillChainPayload}
 */
const increasedSmallCw = (payload: SkillChainPayload): SkillChainPayload => {
  const { support, core } = payload;
  if (!support.hasSmallCw()) {
    return payload;
  }
  return {
    ...payload,
    core: increaseSolarCriticalStrike(deepClone(core), { SolarCriticalStrikeRate: 0.05 }),
  };
};

export const createSkillChain = (payload: SkillChainPayload) => {
  /**
   * @method createIncreasedPayloadPipeline
   * 创建当前技能加成后的payload
   */
  const createIncreasedPayloadPipeline = pipe(
    increasedSmallCw,
    increasedShenYi,
    (payload: SkillChainPayload) => increasedSansheng(payload, 3)
  );
  const { core, support } = createIncreasedPayloadPipeline(payload);
  const {
    BaseCoefficient,
    _MiJiCoefficient,
    ErYeYiYuanCoefficient,
    SkillSetBonuseCoefficient,
    FoGuoCoefficient,
    ZhongChenCoefficient,
    MingFaCoefficient,
  } = getDamageCoefficientParams(payload);

  const key = SkillNames.WeiTuoXianChu;
  const skill = createSkillFactory(core, support, {
    ...makeSkillBaseInformation(payload, key),
    skillBasicNumber: SKILL_BASIC_NUMBER,
    basicDamageCoefficient: BASIC_DAMAGE_COEFFICIENT,
    damageBonuesCoefficient:
      (BaseCoefficient +
        _MiJiCoefficient +
        ErYeYiYuanCoefficient +
        SkillSetBonuseCoefficient +
        FoGuoCoefficient) *
      ZhongChenCoefficient *
      MingFaCoefficient,
    miJi: ignoreMiJi,
  });
  insertPayloadSkills(payload, skill);
  return ChainComponent.NEXT_CHAIN_SUCCESSOR;
};
