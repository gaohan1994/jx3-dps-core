/**
 * 装备增益配置文件
 * @Author: centerm.gaohan
 * @Date: 2021-08-31 17:33:54
 * @Last Modified by: Harper.Gao
 * @Last Modified time: 2021-11-19 10:23:40
 */

import { WeaponValue, BuffKeys, EnChantsList, SetBonuse, EffectSpineList } from '@/types';

/**
 * @time 08-24
 *
 * 新增 武器增益列表
 */
export const WeaponGains = {
  [WeaponValue.EffectWather]: {
    name: WeaponValue.EffectWather,
    data: [{ gainTarget: BuffKeys.JiChuGongJi, value: 490, coverage: 1 }],
  },
  [WeaponValue.CW]: {
    name: WeaponValue.CW,
    data: [{ gainTarget: BuffKeys.JiChuGongJi, value: 0, coverage: 1 }],
  },
  [WeaponValue.Normal]: {
    name: WeaponValue.EffectWather,
    data: [{ gainTarget: BuffKeys.JiChuGongJi, value: 0, coverage: 1 }],
  },
};

/**
 * @time 08-24
 *
 * 新增 附魔增益列表
 */
export const EnChantGains = {
  [EnChantsList.EnChantBelt]: {
    name: EnChantsList.EnChantBelt,
    data: [{ gainTarget: BuffKeys.damageBonus, value: 0.011, coverage: 1 }],
  },
  [EnChantsList.EnChantBody]: {
    name: EnChantsList.EnChantBody,
    data: [{ gainTarget: BuffKeys.JiChuGongJi, value: 357, coverage: 1 }],
  },
  [EnChantsList.EnChantHand]: {
    name: EnChantsList.EnChantHand,
    data: [{ gainTarget: BuffKeys.JiChuGongJi, value: 0, coverage: 1 }],
  },
  [EnChantsList.EnChantHead]: {
    name: EnChantsList.EnChantHead,
    data: [{ gainTarget: BuffKeys.PoFangLevel, value: 496, coverage: 1 }],
  },
  [EnChantsList.EnChantShoe]: {
    name: EnChantsList.EnChantShoe,
    data: [{ gainTarget: BuffKeys.JiChuGongJi, value: 0, coverage: 1 }],
  },
};

/**
 * 特效腰椎增益
 */
export const EffectSpineGains = {
  [EffectSpineList.XiangMeng]: {
    name: EffectSpineList.XiangMeng,
    data: [{ gainTarget: BuffKeys.PoFangLevel, value: 3845, coverage: 15 / 180 }],
  },
};

/**
 * 套装增益
 */
export const SetBonuseGains: { [name in SetBonuse]: any } = {
  [SetBonuse.ValueSetBonuse]: {
    name: SetBonuse.ValueSetBonuse,
    data: [
      // 套装 4%会心 覆盖率 40%
      { gainTarget: BuffKeys.HuiXin, value: 0.04, coverage: 0.4 },
      // 套装会心效果 4% 覆盖率40%
      { gainTarget: BuffKeys.HuiXiao, value: 0.04, coverage: 0.4 },
    ],
  },
  [SetBonuse.SkillSetBonuse]: {
    name: SetBonuse.SkillSetBonuse,
    data: [
      // 套装 4%会心 覆盖率 40%
      { gainTarget: BuffKeys.HuiXin, value: 0, coverage: 1 },
    ],
  },
};
