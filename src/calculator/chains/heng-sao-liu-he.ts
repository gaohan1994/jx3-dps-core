import { SkillChainPayload } from '@calculator/main-calculator';
import {
  getDamageCoefficientParams,
  increasedSansheng,
  increasedSongYan,
  insertPayloadSkills,
  makeSkillBaseInformation,
} from '@calculator/skill-chains';
import ChainComponent from '@componet/chain';
import { pipe } from '@componet/compose';
import { createSkillFactory } from '@packages/core/skill';
import { SkillNames } from '@types';

/**
 * 技能描述伤害，很小的那个基本没啥用聊胜于无
 * @param SKILL_BASIC_NUMBER
 *
 * 技能系数[重要]
 * @param BASIC_DAMAGE_COEFFICIENT
 */
const SKILL_BASIC_NUMBER = 75;
const BASIC_DAMAGE_COEFFICIENT = 0.58;

export const createSkillChain = (payload: SkillChainPayload) => {
  /**
   * @method createIncreasedPayloadPipeline
   * 创建当前技能加成后的payload
   */
  const createIncreasedPayloadPipeline = pipe(increasedSongYan, (payload: SkillChainPayload) =>
    increasedSansheng(payload, 1.5)
  );
  const { core, support } = createIncreasedPayloadPipeline(payload);
  const { BaseCoefficient, ErYeYiYuanCoefficient, FoGuoCoefficient, MingFaCoefficient } =
    getDamageCoefficientParams(payload);

  const key = SkillNames.HengSaoLiuHe;
  const skill = createSkillFactory(core, support, {
    ...makeSkillBaseInformation(payload, key),
    skillBasicNumber: SKILL_BASIC_NUMBER,
    basicDamageCoefficient: BASIC_DAMAGE_COEFFICIENT,
    damageBonuesCoefficient:
      (BaseCoefficient + ErYeYiYuanCoefficient + FoGuoCoefficient + 0.5) * MingFaCoefficient,
  });
  insertPayloadSkills(payload, skill);
  return ChainComponent.NEXT_CHAIN_SUCCESSOR;
};
