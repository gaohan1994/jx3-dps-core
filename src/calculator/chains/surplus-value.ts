import { SkillChainPayload } from '@calculator/calculator';
import {
  getDamageCoefficientParams,
  insertPayloadSkills,
  makeSkillBaseInformation,
} from '@calculator/skillChain';
import ChainComponent from '@componet/chain';
import { createSkillFactory } from '@packages/core/skill';
import { SkillNames } from '@types';

/**
 * 技能系数[重要]
 * @param BASIC_DAMAGE_COEFFICIENT
 */
const BASIC_DAMAGE_COEFFICIENT = 15.2288;

export const createSkillChain = (payload: SkillChainPayload) => {
  const { core, support } = payload;
  const key = SkillNames.SurplusValue;
  const { BaseCoefficient, ErYeYiYuanCoefficient } = getDamageCoefficientParams(payload);

  const skill = createSkillFactory(core, support, {
    ...makeSkillBaseInformation(payload, key),
    basicDamage: core.SurplusValue,
    basicDamageCoefficient: BASIC_DAMAGE_COEFFICIENT,
    damageBonuesCoefficient: BaseCoefficient + ErYeYiYuanCoefficient,
  });
  insertPayloadSkills(payload, skill);
  return ChainComponent.NEXT_CHAIN_SUCCESSOR;
};
