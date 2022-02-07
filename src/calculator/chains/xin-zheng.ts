import { SkillChainPayload } from '@calculator/main-calculator';
import {
  getDamageCoefficientParams,
  increasedSansheng,
  increasedSongYan,
  insertPayloadSkills,
  makeSkillBaseInformation,
} from '@calculator/skillChain';
import ChainComponent from '@componet/chain';
import { pipe } from '@componet/compose';
import { isXinZhengVersion } from '@componet/utils';
import { createSkillFactory } from '@packages/core/skill';
import { SkillNames } from '@types';

const key = SkillNames.XinZheng;

/**
 * 技能系数[重要] 少林削弱心诤减少 15%
 * @param BASIC_DAMAGE_COEFFICIENT
 */
const BASIC_DAMAGE_COEFFICIENT = 3.53 * 0.85;

export const createSkillChain = (payload: SkillChainPayload) => {
  if (!isXinZhengVersion(payload.options)) {
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
  const { BaseCoefficient, ErYeYiYuanCoefficient } = getDamageCoefficientParams(payload);

  const skill = createSkillFactory(core, support, {
    ...makeSkillBaseInformation(payload, key),
    basicDamageCoefficient: BASIC_DAMAGE_COEFFICIENT,
    damageBonuesCoefficient: BaseCoefficient + ErYeYiYuanCoefficient,
  });
  insertPayloadSkills(payload, skill);
  return ChainComponent.NEXT_CHAIN_SUCCESSOR;
};
