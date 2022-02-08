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
import { isXinZhengVersion } from '@componet/utils';
import { createSkillFactory } from '@packages/core/skill';
import { SkillNames } from '@types';

const key = SkillNames.XinZhengGunWu;

/**
 * 技能系数[重要] 少林削弱棍舞增加 30%
 * @param BASIC_DAMAGE_COEFFICIENT
 */
const SKILL_BASIC_NUMBER = 0;
const BASIC_DAMAGE_COEFFICIENT = 0.2 * 1.3;

export const createSkillChain = (payload: SkillChainPayload) => {
  if (!isXinZhengVersion(payload.options)) {
    return ChainComponent.NEXT_CHAIN_SUCCESSOR;
  }
  /**
   * @method createIncreasedPayloadPipeline
   * 创建当前技能加成后的payload
   */
  const createIncreasedPayloadPipeline = pipe(
    (payload: SkillChainPayload) => increasedSongYan(payload, 0.5),
    (payload: SkillChainPayload) => increasedSansheng(payload, 3)
  );
  const { core, support } = createIncreasedPayloadPipeline(payload);
  const { BaseCoefficient, ErYeYiYuanCoefficient } = getDamageCoefficientParams(payload);

  const skill = createSkillFactory(core, support, {
    ...makeSkillBaseInformation(payload, key),
    skillBasicNumber: SKILL_BASIC_NUMBER,
    basicDamageCoefficient: BASIC_DAMAGE_COEFFICIENT,
    damageBonuesCoefficient: BaseCoefficient + ErYeYiYuanCoefficient,
  });
  insertPayloadSkills(payload, skill);
  return ChainComponent.NEXT_CHAIN_SUCCESSOR;
};
