import { SkillChainPayload } from '@calculator/main-calculator';
import {
  getDamageCoefficientParams,
  ignoreMiJi,
  increasedSansheng,
  insertPayloadSkills,
  makeSkillBaseInformation,
} from '@calculator/skill-chains';
import ChainComponent from '@componet/chain';
import { pipe } from '@componet/compose';
import { increaseCriticalDamagePower, increaseSolarCriticalStrike } from '@componet/utils';
import DpsCore from '@packages/core/core';
import { createSkillFactory } from '@packages/core/skill';
import { SkillNames } from '@types';

/**
 * 技能描述伤害，很小的那个基本没啥用聊胜于无
 * @param SKILL_BASIC_NUMBER
 *
 * 技能系数[重要]
 * @param BASIC_DAMAGE_COEFFICIENT
 */
const SKILL_BASIC_NUMBER = 144.5;
const BASIC_DAMAGE_COEFFICIENT = 1.36;

const SHOUQUESHI_CRITICAL_STRIKE_INCREASED = 0.1 + 0.04;
const SHOUQUESHI_CRITICAL_DAMAGE_PWOSER_INCREASED = 0.1;

const increasedSkill = (payload: SkillChainPayload): SkillChainPayload => {
  const getNextCore = pipe(
    (core: DpsCore) =>
      increaseSolarCriticalStrike(core, {
        SolarCriticalStrikeRate: SHOUQUESHI_CRITICAL_STRIKE_INCREASED,
      }),
    (core: DpsCore) =>
      increaseCriticalDamagePower(core, {
        SolarCriticalDamagePowerPercent: SHOUQUESHI_CRITICAL_DAMAGE_PWOSER_INCREASED,
      })
  );
  return {
    ...payload,
    core: getNextCore(payload.core),
  };
};

export const createSkillChain = (payload: SkillChainPayload) => {
  /**
   * @method createIncreasedPayloadPipeline
   * 创建当前技能加成后的payload
   */
  const createIncreasedPayloadPipeline = pipe(increasedSkill, (payload: SkillChainPayload) =>
    increasedSansheng(payload, 2)
  );
  const { core, support } = createIncreasedPayloadPipeline(payload);
  const {
    BaseCoefficient,
    ErYeYiYuanCoefficient,
    FoGuoCoefficient,
    ZhongChenCoefficient,
    MingFaCoefficient,
    CwBuffCoefficient,
  } = getDamageCoefficientParams(payload);

  const key = SkillNames.ShouQueShi;
  const skill = createSkillFactory(core, support, {
    ...makeSkillBaseInformation(payload, key),
    skillBasicNumber: SKILL_BASIC_NUMBER,
    basicDamageCoefficient: BASIC_DAMAGE_COEFFICIENT,
    damageBonuesCoefficient:
      (BaseCoefficient + 0.12 + ErYeYiYuanCoefficient + CwBuffCoefficient + FoGuoCoefficient) *
      ZhongChenCoefficient *
      MingFaCoefficient,
    miJi: ignoreMiJi,
  });
  insertPayloadSkills(payload, skill);
  return ChainComponent.NEXT_CHAIN_SUCCESSOR;
};
