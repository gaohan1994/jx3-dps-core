
import { FormationsGains, TeamSkillGains, GroupSkillGains, SetBonuseGains } from './config'

/**
 * 全部增益列表
 */
const AllGainList = {
  ...FormationsGains,
  ...TeamSkillGains,
  ...GroupSkillGains,
  ...SetBonuseGains,
}

export {
  AllGainList,

  FormationsGains,
  TeamSkillGains,
  GroupSkillGains,
  SetBonuseGains,
}