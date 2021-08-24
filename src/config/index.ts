
import {
  FormationsGains,
  TeamSkillGains,
  GroupSkillGains,
  SetBonuseGains,
  WeaponGains,
  EnChantGains
} from './config'

/**
 * 全部增益列表
 */
const AllGainList = {
  ...FormationsGains,
  ...TeamSkillGains,
  ...GroupSkillGains,
  ...SetBonuseGains,
  ...WeaponGains,
  ...EnChantGains,
}

export {
  AllGainList,

  FormationsGains,
  TeamSkillGains,
  GroupSkillGains,
  SetBonuseGains,
  WeaponGains,
  EnChantGains,
}