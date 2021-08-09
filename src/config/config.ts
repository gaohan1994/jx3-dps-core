import { Gain, Formation, FormationValue, SupportContextKeys, SetBonuse, GroupSkillType, GroupSkillBuffList } from "../types";


export const Formations: Formation = {
  [FormationValue.TianGuLeiYinZhen]: {
    name: FormationValue.TianGuLeiYinZhen,
    data: [
      { gainTarget: SupportContextKeys.JiChuGongJiPercent, value: 0.15 },
      { gainTarget: SupportContextKeys.PoFangPercent, value: 0.1 },
      { gainTarget: SupportContextKeys.WuShuang, value: 0.15 },
    ]
  },
  [FormationValue.DuJingZhen]: {
    name: FormationValue.DuJingZhen,
    data: [
      { gainTarget: SupportContextKeys.JiChuGongJiPercent, value: 0.05 },
      { gainTarget: SupportContextKeys.HuiXin, value: 0.03 },
      { gainTarget: SupportContextKeys.HuiXiao, value: 0.1 },
      { gainTarget: SupportContextKeys.PoFangLevel, value: 0.05 },
    ],
  },
  [FormationValue.TianLuoZhen]: {
    name: FormationValue.TianLuoZhen,
    data: [
      { gainTarget: SupportContextKeys.JiChuGongJiPercent, value: 0.05 },
      { gainTarget: SupportContextKeys.HuiXin, value: 0.05 },
      { gainTarget: SupportContextKeys.HuiXiao, value: 0.15 },
    ],
  },
  [FormationValue.QiChunZhen]: {
    name: FormationValue.QiChunZhen,
    data: [
      { gainTarget: SupportContextKeys.HuiXin, value: 0.08 },
      { gainTarget: SupportContextKeys.HuiXiao, value: 0.15 },
      { gainTarget: SupportContextKeys.WuShuang, value: 0.0195 },
    ],
  },
}

export const TeamSkillBuffNeiGong: { [name: string]: Gain } = {
  PoCangQiong: {
    name: 'PoCangQiong',
    data: [
      { gainTarget: SupportContextKeys.HuiXiao, value: 0.1 }
    ]
  },
  XiuQi: {
    name: 'XiuQi',
    data: [
      { gainTarget: SupportContextKeys.mainAttribute, value: 111 },
      { gainTarget: SupportContextKeys.HuiXinLevel, value: 70 },
    ]
  }
}

export const TeamSkillBuffWaiGong: { [name: string]: Gain } = {

}


export const TeamSkills: { [name: string]: Gain } = {
  ...TeamSkillBuffNeiGong,
  ...TeamSkillBuffWaiGong,
  FenLan: {
    name: 'FenLan',
    data: [
      { gainTarget: SupportContextKeys.JiChuGongJiPercent, value: 0.07 }
    ]
  },
}

export const SetBonusesGain: { [name: string]: Gain } = {
  ValueSetBonuse: {
    name: SetBonuse.ValueSetBonuse,
    data: [
      // 套装 4%会心 覆盖率 40%
      { gainTarget: SupportContextKeys.HuiXin, value: 0.04 * 0.4 },
      // 套装会心效果 4% 覆盖率40%
      { gainTarget: SupportContextKeys.HuiXiao, value: 0.04 * 0.4 }
    ]
  },
  SkillSetBonuse: {
    name: SetBonuse.SkillSetBonuse,
    data: [
      // 套装 4%会心 覆盖率 40%
      { gainTarget: SupportContextKeys.HuiXin, value: 0 },
    ]
  }
}

export const GroupSkills: GroupSkillType = {
  [GroupSkillBuffList.JieHuoZhan]: {
    name: GroupSkillBuffList.JieHuoZhan,
    data: [
      { gainTarget: SupportContextKeys.damageBonus, value: 0.03 }
    ]
  },
  [GroupSkillBuffList.LieRiZhan]: {
    name: GroupSkillBuffList.LieRiZhan,
    data: [
      { gainTarget: SupportContextKeys.damageBonus, value: 0.05 }
    ]
  },
}