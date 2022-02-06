import { SkillChainPayload } from '@calculator/calculator';
import {
  getDamageCoefficientParams,
  increasedSansheng,
  increasedSongYan,
  insertPayloadSkills,
  makeSkillBaseInformation,
} from '@calculator/skillChain';
import ChainComponent from '@componet/chain';
import { pipe } from '@componet/compose';
import { isJinGangRiLunEnchat } from '@componet/utils';
import { createSkillFactory } from '@packages/core/skill';
import { SkillNames } from '@types';

const key = SkillNames.JinGangRiLun;

/**
 * 技能描述伤害，很小的那个基本没啥用聊胜于无
 * @param SKILL_BASIC_NUMBER
 *
 * 技能系数[重要]
 * @param BASIC_DAMAGE_COEFFICIENT
 */
const BASIC_DAMAGE_COEFFICIENT = 6.6;

export const createSkillChain = (payload: SkillChainPayload) => {
  if (!isJinGangRiLunEnchat(payload.options)) {
    return ChainComponent.NEXT_CHAIN_SUCCESSOR;
  }
  /**
   * @method createIncreasedPayloadPipeline
   * 创建当前技能加成后的payload
   */
  const createIncreasedPayloadPipeline = pipe(increasedSongYan, (payload: SkillChainPayload) =>
    increasedSansheng(payload, 3)
  );
  const { core, support } = createIncreasedPayloadPipeline(payload);
  const { BaseCoefficient, ErYeYiYuanCoefficient, FoGuoCoefficient, MingFaCoefficient } =
    getDamageCoefficientParams(payload);

  const skill = createSkillFactory(core, support, {
    ...makeSkillBaseInformation(payload, key),
    basicDamageCoefficient: BASIC_DAMAGE_COEFFICIENT,
    damageBonuesCoefficient:
      (BaseCoefficient + ErYeYiYuanCoefficient + FoGuoCoefficient) * MingFaCoefficient,
  });
  insertPayloadSkills(payload, skill);
  return ChainComponent.NEXT_CHAIN_SUCCESSOR;
};
