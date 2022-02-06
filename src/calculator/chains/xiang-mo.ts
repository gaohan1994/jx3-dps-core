import { SkillChainPayload } from '@calculator/calculator';
import { insertPayloadSkills, makeSkillBaseInformation } from '@calculator/skillChain';
import ChainComponent from '@componet/chain';
import { createSkillFactory } from '@packages/core/skill';
import { SkillNames } from '@types';

/**
 * 技能描述伤害，很小的那个基本没啥用聊胜于无
 * @param SKILL_BASIC_NUMBER
 *
 */
const SKILL_BASIC_NUMBER = 0;

const key = SkillNames.XiangMo;

export const createSkillChain = (payload: SkillChainPayload) => {
  const { skills, skillTimes, core, support } = payload;
  const weituo = skills.find(sk => sk.skillName === SkillNames.WeiTuoXianChu);
  const nayun = skills.find(sk => sk.skillName === SkillNames.NaYunShi);

  const skill = createSkillFactory(core, support, {
    ...makeSkillBaseInformation(payload, key),
    skillBasicNumber: SKILL_BASIC_NUMBER,
    basicDamage: (weituo.subTotal + nayun.subTotal) / 4 / 1.2 / skillTimes[key],
    solarOvercomeCoefficient: 1,
    strainCoefficient: 1,
    criticalCoefficient: 1,
    targetDamageCoefficient: 1,
  });
  insertPayloadSkills(payload, skill);
  return ChainComponent.NEXT_CHAIN_SUCCESSOR;
};
