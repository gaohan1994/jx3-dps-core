/**
 * 技能增益配置文件
 * @Author: centerm.gaohan 
 * @Date: 2021-08-31 17:33:35 
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-31 17:36:01
 */
import { Gain, SupportContextKeys, SetBonuse, GroupSkillType, GroupSkillBuffList, TeamSkillValue, Weapon, WeaponValue, EnChants, EnChantsList, EffectSpine, EffectSpineList, Banquet, BanquetList, Food, FoodEnhanceList, FoodSupportList, DrugEnhanceList, DrugSupportList } from "../types";

export const TeamSkillGains: { [name in TeamSkillValue]?: Gain } = {
  /**
   * 少林技能
   */
  [TeamSkillValue.JinGangNuMu]: {
    name: "JinGangNuMu",
    data: [
      { gainTarget: SupportContextKeys.JiChuGongJiPercent, value: 0.4, coverage: 1 },
    ]
  },
  [TeamSkillValue.QinLongJue]: {
    name: 'QinLongJue',
    data: [
      // 擒龙诀 20%基础 25%覆盖
      { gainTarget: SupportContextKeys.JiChuGongJiPercent, value: 0.2, coverage: 0.25 },
    ]
  },

  [TeamSkillValue.PoCangQiong]: {
    name: 'PoCangQiong',
    data: [
      { gainTarget: SupportContextKeys.HuiXiao, value: 0.1, coverage: 1 }
    ]
  },
  [TeamSkillValue.XiuQi]: {
    name: 'XiuQi',
    data: [
      { gainTarget: SupportContextKeys.YuanQi, value: 111, coverage: 1 },
      { gainTarget: SupportContextKeys.HuiXinLevel, value: 70, coverage: 1 },
    ]
  },
  [TeamSkillValue.FenLan]: {
    name: 'FenLan',
    data: [
      { gainTarget: SupportContextKeys.JiChuGongJiPercent, value: 0.07, coverage: 1 }
    ]
  },
}

export const GroupSkillGains: GroupSkillType = {
  [GroupSkillBuffList.JieHuoZhan]: {
    name: GroupSkillBuffList.JieHuoZhan,
    data: [
      { gainTarget: SupportContextKeys.damageBonus, value: 0.03, coverage: 1 }
    ]
  },
  [GroupSkillBuffList.LieRiZhan]: {
    name: GroupSkillBuffList.LieRiZhan,
    data: [
      { gainTarget: SupportContextKeys.damageBonus, value: 0.05, coverage: 1 }
    ]
  },
  [GroupSkillBuffList.LiDiChengFo]: {
    name: GroupSkillBuffList.LiDiChengFo,
    data: [
      { gainTarget: SupportContextKeys.ignoreDefense, value: 0.12, coverage: 1 }
    ]
  },
  [GroupSkillBuffList.HanXiaoQianJun]: {
    name: GroupSkillBuffList.HanXiaoQianJun,
    data: [
      { gainTarget: SupportContextKeys.PoFangPercent, value: 0.1, coverage: 1 }
    ]
  },
  /**
   * @todo 新增团队技能宏法，默认覆盖率10%
   * @time 08-31
   */
  [GroupSkillBuffList.HongFa]: {
    name: GroupSkillBuffList.HongFa,
    data: [
      { gainTarget: SupportContextKeys.JiChuGongJiPercent, value: 0.3, coverage: 0.1 }
    ]
  },
}