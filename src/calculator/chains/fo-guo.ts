import { SkillChainPayload } from '@calculator/calculator';
import {
  getDamageCoefficientParams,
  increasedSansheng,
  insertPayloadSkills,
  makeSkillBaseInformation,
} from '@calculator/skillChain';
import ChainComponent from '@componet/chain';
import { pipe } from '@componet/compose';
import { createSkillFactory } from '@packages/core/skill';
import { SkillNames } from '@types';

const key = SkillNames.FoGuo;

/**
 * 技能描述伤害，很小的那个基本没啥用聊胜于无
 * @param SKILL_BASIC_NUMBER
 *
 * 技能系数[重要]
 * @param BASIC_DAMAGE_COEFFICIENT
 */
const SKILL_BASIC_NUMBER = 127.5;
const BASIC_DAMAGE_COEFFICIENT = 0.697922;

export const createSkillChain = (payload: SkillChainPayload) => {
  /**
   * @method createIncreasedPayloadPipeline
   * 创建当前技能加成后的payload
   */
  const createIncreasedPayloadPipeline = pipe((payload: SkillChainPayload) =>
    increasedSansheng(payload, 1.5)
  );
  const { core, support } = createIncreasedPayloadPipeline(payload);
  const { BaseCoefficient, ErYeYiYuanCoefficient } = getDamageCoefficientParams(payload);

  const skill = createSkillFactory(core, support, {
    ...makeSkillBaseInformation(payload, key),
    skillBasicNumber: SKILL_BASIC_NUMBER,
    basicDamageCoefficient: BASIC_DAMAGE_COEFFICIENT,
    damageBonuesCoefficient: BaseCoefficient + 0.3 + ErYeYiYuanCoefficient,
  });
  insertPayloadSkills(payload, skill);
  return ChainComponent.NEXT_CHAIN_SUCCESSOR;
};
