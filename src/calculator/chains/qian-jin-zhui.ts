import { SkillChainPayload } from '@calculator/main-calculator';
import {
  increasedSansheng,
  insertPayloadSkills,
  makeSkillBaseInformation,
} from '@calculator/skillChain';
import ChainComponent from '@componet/chain';
import { pipe } from '@componet/compose';
import { isJinGangRiLunEnchat } from '@componet/utils';
import { createSkillFactory } from '@packages/core/skill';
import { SkillNames } from '@types';

const key = SkillNames.QianJinZhui;

export const createSkillChain = (payload: SkillChainPayload) => {
  if (!isJinGangRiLunEnchat(payload.options)) {
    return ChainComponent.NEXT_CHAIN_SUCCESSOR;
  }
  /**
   * @method createIncreasedPayloadPipeline
   * 创建当前技能加成后的payload
   */
  const createIncreasedPayloadPipeline = pipe((payload: SkillChainPayload) =>
    increasedSansheng(payload, 1.5)
  );
  const { core, support } = createIncreasedPayloadPipeline(payload);

  const skill = createSkillFactory(core, support, {
    ...makeSkillBaseInformation(payload, key),
    strainCoefficient: 1,
    solarOvercomeCoefficient: 1,
    criticalCoefficient: 1,
    targetDamageCoefficient: 1,
  });
  insertPayloadSkills(payload, skill);
  return ChainComponent.NEXT_CHAIN_SUCCESSOR;
};
