/**
 * 增益列表库
 * 
 * @Author: centerm.gaohan 
 * @Date: 2021-08-31 17:38:11 
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-09-08 00:26:45
 */

import {
  TeamSkillGains,
  GroupSkillGains,
} from './skill';
import { FormationsGains } from './formation';
import {
  WeaponGains,
  EnChantGains,
  EffectSpineGains,
  SetBonuseGains,
} from './item';
import {
  BanquetGains,
  FoodGains,
} from './food'

/**
 * 全部增益列表
 */
const AllGainList = {
  // 阵法增益
  ...FormationsGains,

  // 小队技能增益
  ...TeamSkillGains,
  // 团队技能增益
  ...GroupSkillGains,

  // 装备增益
  ...SetBonuseGains,
  ...WeaponGains,
  ...EnChantGains,
  ...EffectSpineGains,

  // 小吃、宴席增益
  ...BanquetGains,
  ...FoodGains.DrugEnhance,
  ...FoodGains.DrugSupport,
  ...FoodGains.FoodEnhance,
  ...FoodGains.FoodSupport,
  ...FoodGains.HomeFood,
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
};