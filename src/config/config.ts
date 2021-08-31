import { Gain, Formation, FormationValue, SupportContextKeys, SetBonuse, GroupSkillType, GroupSkillBuffList, TeamSkillValue, Weapon, WeaponValue, EnChants, EnChantsList, EffectSpine, EffectSpineList, Banquet, BanquetList, Food, FoodEnhanceList, FoodSupportList, DrugEnhanceList, DrugSupportList } from "../types";

export const FormationsGains: Formation = {
  [FormationValue.TianGuLeiYinZhen]: {
    name: FormationValue.TianGuLeiYinZhen,
    data: [
      { gainTarget: SupportContextKeys.JiChuGongJiPercent, value: 0.15, coverage: 1 },
      { gainTarget: SupportContextKeys.PoFangPercent, value: 0.1, coverage: 1 },
      { gainTarget: SupportContextKeys.WuShuang, value: 0.15, coverage: 1 },
    ]
  },
  [FormationValue.DuJingZhen]: {
    name: FormationValue.DuJingZhen,
    data: [
      { gainTarget: SupportContextKeys.JiChuGongJiPercent, value: 0.05, coverage: 1 },
      { gainTarget: SupportContextKeys.HuiXin, value: 0.03, coverage: 1 },
      { gainTarget: SupportContextKeys.HuiXiao, value: 0.1, coverage: 1 },
      { gainTarget: SupportContextKeys.PoFangLevel, value: 0.05, coverage: 1 },
    ],
  },
  [FormationValue.TianLuoZhen]: {
    name: FormationValue.TianLuoZhen,
    data: [
      { gainTarget: SupportContextKeys.JiChuGongJiPercent, value: 0.05, coverage: 1 },
      { gainTarget: SupportContextKeys.HuiXin, value: 0.05, coverage: 1 },
      { gainTarget: SupportContextKeys.HuiXiao, value: 0.15, coverage: 1 },
      { gainTarget: SupportContextKeys.ignoreDefense, value: 0.05, coverage: 1 },
    ],
  },
  [FormationValue.QiChunZhen]: {
    name: FormationValue.QiChunZhen,
    data: [
      { gainTarget: SupportContextKeys.HuiXin, value: 0.08, coverage: 1 },
      { gainTarget: SupportContextKeys.HuiXiao, value: 0.15, coverage: 1 },
      { gainTarget: SupportContextKeys.WuShuang, value: 0.0195, coverage: 1 },
    ],
  },
}

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
 * 宴席增益
 */
export const BanquetGains: Banquet = {
  [BanquetList.ShuiZhuYu]: {
    name: BanquetList.ShuiZhuYu,
    data: [
      { gainTarget: SupportContextKeys.WuShuangLevel, value: 100, coverage: 1 }
    ]
  },
  [BanquetList.ErShiSiQiaoMingYueYe]: {
    name: BanquetList.ErShiSiQiaoMingYueYe,
    data: [
      { gainTarget: SupportContextKeys.JiChuGongJi, value: 214, coverage: 1 },
      { gainTarget: SupportContextKeys.HuiXinLevel, value: 397, coverage: 1 },
      { gainTarget: SupportContextKeys.PoZhao, value: 397, coverage: 1 },
    ]
  },
  [BanquetList.TongZeYan]: {
    name: BanquetList.TongZeYan,
    data: [
      { gainTarget: SupportContextKeys.WuShuangLevel, value: 130, coverage: 1 }
    ]
  },
  [BanquetList.ZhengYuCaiPan]: {
    name: BanquetList.ZhengYuCaiPan,
    data: [
      { gainTarget: SupportContextKeys.WuShuangLevel, value: 517, coverage: 1 }
    ]
  },
}

export const FoodGains: Food = {
  FoodEnhance: {
    [FoodEnhanceList.BaiRouXueChang]: {
      name: FoodEnhanceList.BaiRouXueChang,
      data: [
        { gainTarget: SupportContextKeys.PoZhao, value: 695, coverage: 1 }
      ]
    },
    [FoodEnhanceList.GuanTangBao]: {
      name: FoodEnhanceList.GuanTangBao,
      data: [
        { gainTarget: SupportContextKeys.JiChuGongJi, value: 374, coverage: 1 }
      ]
    },
    [FoodEnhanceList.HongShaoPaiGu]: {
      name: FoodEnhanceList.HongShaoPaiGu,
      data: [
        { gainTarget: SupportContextKeys.PoFangLevel, value: 695, coverage: 1 }
      ]
    },
    [FoodEnhanceList.SuanCaiYu]: {
      name: FoodEnhanceList.SuanCaiYu,
      data: [
        { gainTarget: SupportContextKeys.HuiXinLevel, value: 695, coverage: 1 }
      ]
    },
  },
  FoodSupport: {
    [FoodSupportList.YuPianShaGuoZhou]: {
      name: FoodSupportList.YuPianShaGuoZhou,
      data: [
        { gainTarget: SupportContextKeys.YuanQi, value: 156, coverage: 1 }
      ]
    },
  },
  DrugEnhance: {
    [DrugEnhanceList.ShangPinNingShenSan]: {
      name: DrugEnhanceList.ShangPinNingShenSan,
      data: [
        { gainTarget: SupportContextKeys.PoZhao, value: 894, coverage: 1 }
      ]
    },
    [DrugEnhanceList.ShangPinPoHuiSan]: {
      name: DrugEnhanceList.ShangPinPoHuiSan,
      data: [
        { gainTarget: SupportContextKeys.PoFangLevel, value: 894, coverage: 1 }
      ]
    },
    [DrugEnhanceList.ShangPinYuLiSan]: {
      name: DrugEnhanceList.ShangPinYuLiSan,
      data: [
        { gainTarget: SupportContextKeys.HuiXinLevel, value: 894, coverage: 1 }
      ]
    },
    [DrugEnhanceList.ShangPinZhanFengDan]: {
      name: DrugEnhanceList.ShangPinZhanFengDan,
      data: [
        { gainTarget: SupportContextKeys.JiChuGongJi, value: 481, coverage: 1 }
      ]
    },
  },
  DrugSupport: {
    [DrugSupportList.ShangPinJuHunWan]: {
      name: DrugSupportList.ShangPinJuHunWan,
      data: [
        { gainTarget: SupportContextKeys.YuanQi, value: 200, coverage: 1 }
      ]
    },
  }
}