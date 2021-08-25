
import {
  FormationsGains,
  TeamSkillGains,
  GroupSkillGains,
  SetBonuseGains,
  WeaponGains,
  EnChantGains,
  EffectSpineGains,
  BanquetGains,
  FoodGains,
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
  ...EffectSpineGains,
  ...BanquetGains,

  ...FoodGains.DrugEnhance,
  ...FoodGains.DrugSupport,
  ...FoodGains.FoodEnhance,
  ...FoodGains.FoodSupport,
}

export {
  AllGainList,

  FormationsGains,
  TeamSkillGains,
  GroupSkillGains,
  SetBonuseGains,
  WeaponGains,
  EnChantGains,
  EffectSpineGains,
  BanquetGains,
  FoodGains,
}