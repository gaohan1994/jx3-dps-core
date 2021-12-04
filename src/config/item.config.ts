/**
 * 装备增益配置文件
 * @Author: centerm.gaohan
 * @Date: 2021-08-31 17:33:54
 * @Last Modified by: Harper.Gao
 * @Last Modified time: 2021-11-19 10:23:40
 */
import { BuffKeys } from '@types';

export enum WeaponList {
  Normal = '普通武器',
  CW = '橙武',
  EffectWather = '水特效武器',
}
export const WeaponConfig = [
  {
    name: WeaponList.EffectWather,
    data: [{ gainTarget: BuffKeys.JiChuGongJi, value: 490, coverage: 1 }],
  },
  {
    name: WeaponList.CW,
    data: [{ gainTarget: BuffKeys.JiChuGongJi, value: 0, coverage: 1 }],
  },
  {
    name: WeaponList.EffectWather,
    data: [{ gainTarget: BuffKeys.JiChuGongJi, value: 0, coverage: 1 }],
  },
];

export enum EnChantsList {
  EnChantHead = '附魔头',
  EnChantBody = '附魔衣服',
  EnChantBelt = '附魔腰带',
  EnChantHand = '附魔护手',
  EnChantShoe = '附魔鞋子',
}
export const EnChantConfig = [
  {
    name: EnChantsList.EnChantBelt,
    data: [{ gainTarget: BuffKeys.damageBonus, value: 0.011, coverage: 1 }],
  },
  {
    name: EnChantsList.EnChantBody,
    data: [{ gainTarget: BuffKeys.JiChuGongJi, value: 357, coverage: 1 }],
  },
  {
    name: EnChantsList.EnChantHand,
    data: [{ gainTarget: BuffKeys.JiChuGongJi, value: 0, coverage: 1 }],
  },
  {
    name: EnChantsList.EnChantHead,
    data: [{ gainTarget: BuffKeys.PoFangLevel, value: 496, coverage: 1 }],
  },
  {
    name: EnChantsList.EnChantShoe,
    data: [{ gainTarget: BuffKeys.JiChuGongJi, value: 0, coverage: 1 }],
  },
];

export enum EffectSpineList {
  XiangMeng = '香梦',
}
export const EffectSpineConfig = [
  {
    name: EffectSpineList.XiangMeng,
    data: [{ gainTarget: BuffKeys.PoFangLevel, value: 3845, coverage: 15 / 180 }],
  },
];

export enum SetBonuseList {
  SkillSetBonuse = '技能套装',
  ValueSetBonuse = '数值套装',
}
export const SetBonuseConfig = [
  {
    name: SetBonuseList.ValueSetBonuse,
    data: [
      // 套装 4%会心 覆盖率 40%
      { gainTarget: BuffKeys.HuiXin, value: 0.04, coverage: 0.4 },
      // 套装会心效果 4% 覆盖率40%
      { gainTarget: BuffKeys.HuiXiao, value: 0.04, coverage: 0.4 },
    ],
  },
  {
    name: SetBonuseList.SkillSetBonuse,
    data: [
      // 套装 4%会心 覆盖率 40%
      { gainTarget: BuffKeys.HuiXin, value: 0, coverage: 1 },
    ],
  },
];
