/**
 * 装备增益配置文件
 * @Author: centerm.gaohan 
 * @Date: 2021-08-31 17:33:54 
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-31 17:35:18
 */

import { Weapon, WeaponValue, SupportContextKeys, EnChants, EnChantsList, EffectSpine, EffectSpineList, SetBonuse, Gain } from "../types";

/**
 * @time 08-24
 * 
 * 新增 武器增益列表
 */
export const WeaponGains: Weapon = {
  [WeaponValue.EffectWather]: {
    name: WeaponValue.EffectWather,
    data: [
      { gainTarget: SupportContextKeys.JiChuGongJi, value: 490, coverage: 1 }
    ]
  },
  [WeaponValue.CW]: {
    name: WeaponValue.CW,
    data: [
      { gainTarget: SupportContextKeys.JiChuGongJi, value: 0, coverage: 1 }
    ]
  },
  [WeaponValue.Normal]: {
    name: WeaponValue.EffectWather,
    data: [
      { gainTarget: SupportContextKeys.JiChuGongJi, value: 0, coverage: 1 }
    ]
  },
}

/**
 * @time 08-24
 * 
 * 新增 附魔增益列表
 */
export const EnChantGains: EnChants = {
  [EnChantsList.EnChantBelt]: {
    name: EnChantsList.EnChantBelt,
    data: [
      { gainTarget: SupportContextKeys.damageBonus, value: 0.011, coverage: 1 }
    ]
  },
  [EnChantsList.EnChantBody]: {
    name: EnChantsList.EnChantBody,
    data: [
      { gainTarget: SupportContextKeys.JiChuGongJi, value: 357, coverage: 1 }
    ]
  },
  [EnChantsList.EnChantHand]: {
    name: EnChantsList.EnChantHand,
    data: [
      { gainTarget: SupportContextKeys.JiChuGongJi, value: 0, coverage: 1 }
    ]
  },
  [EnChantsList.EnChantHead]: {
    name: EnChantsList.EnChantHead,
    data: [
      { gainTarget: SupportContextKeys.PoFangLevel, value: 496, coverage: 1 }
    ]
  },
  [EnChantsList.EnChantShoe]: {
    name: EnChantsList.EnChantShoe,
    data: [
      { gainTarget: SupportContextKeys.JiChuGongJi, value: 0, coverage: 1 }
    ]
  },
}

/**
 * 特效腰椎增益
 */
export const EffectSpineGains: EffectSpine = {
  [EffectSpineList.XiangMeng]: {
    name: EffectSpineList.XiangMeng,
    data: [
      { gainTarget: SupportContextKeys.PoFangLevel, value: 3845, coverage: 15 / 180 }
    ]
  }
}

/**
 * 套装增益
 */
export const SetBonuseGains: { [name in SetBonuse]: Gain } = {
  [SetBonuse.ValueSetBonuse]: {
    name: SetBonuse.ValueSetBonuse,
    data: [
      // 套装 4%会心 覆盖率 40%
      { gainTarget: SupportContextKeys.HuiXin, value: 0.04, coverage: 0.4 },
      // 套装会心效果 4% 覆盖率40%
      { gainTarget: SupportContextKeys.HuiXiao, value: 0.04, coverage: 0.4 }
    ]
  },
  [SetBonuse.SkillSetBonuse]: {
    name: SetBonuse.SkillSetBonuse,
    data: [
      // 套装 4%会心 覆盖率 40%
      { gainTarget: SupportContextKeys.HuiXin, value: 0, coverage: 1 },
    ]
  }
}