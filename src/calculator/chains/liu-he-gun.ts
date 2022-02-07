import { SkillChainPayload } from '@calculator/main-calculator';
import { insertPayloadSkills, makeSkillBaseInformation } from '@calculator/skillChain';
import ChainComponent from '@componet/chain';
import { createSkillFactory } from '@packages/core/skill';
import { SkillNames } from '@types';

/**
 * 技能基本伤害六合棍为0
 * @param BASIC_DAMAGE
 *
 * 技能系数[重要]
 * @param BASIC_DAMAGE_COEFFICIENT
 */
const BASIC_DAMAGE = 0;
const BASIC_DAMAGE_COEFFICIENT = 0;
const SOLAR_OVERCOME_COEFFICIENT = 1;

export const createSkillChain = (payload: SkillChainPayload) => {
  const { core, support } = payload;
  const key = SkillNames.LiuHeGun;

  const skill = createSkillFactory(core, support, {
    ...makeSkillBaseInformation(payload, key),
    basicDamage: BASIC_DAMAGE,
    skillBasicNumber: core.MeleeWeaponDamage,
    basicDamageCoefficient: BASIC_DAMAGE_COEFFICIENT,
    solarOvercomeCoefficient: SOLAR_OVERCOME_COEFFICIENT,
  });
  insertPayloadSkills(payload, skill);
  return ChainComponent.NEXT_CHAIN_SUCCESSOR;
};
