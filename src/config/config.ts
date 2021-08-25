import { Gain, Formation, FormationValue, SupportContextKeys, SetBonuse, GroupSkillType, GroupSkillBuffList, TeamSkillValue, Weapon, WeaponValue, EnChants, EnChantsList, EffectSpine, EffectSpineList, Banquet, BanquetList, Food, FoodEnhanceList, FoodSupportList, DrugEnhanceList, DrugSupportList } from "../types";

export const FormationsGains: Formation = {
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
      { gainTarget: SupportContextKeys.ignoreDefense, value: 0.05 },
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

export const TeamSkillGains: { [name in TeamSkillValue]?: Gain } = {
  /**
   * 少林技能
   */
  [TeamSkillValue.JinGangNuMu]: {
    name: "JinGangNuMu",
    data: [
      { gainTarget: SupportContextKeys.JiChuGongJiPercent, value: 0.4 },
    ]
  },
  [TeamSkillValue.QinLongJue]: {
    name: 'QinLongJue',
    data: [
      // 擒龙诀 20%基础 25%覆盖
      { gainTarget: SupportContextKeys.JiChuGongJiPercent, value: 0.2 * 0.25 },
    ]
  },

  [TeamSkillValue.PoCangQiong]: {
    name: 'PoCangQiong',
    data: [
      { gainTarget: SupportContextKeys.HuiXiao, value: 0.1 }
    ]
  },
  [TeamSkillValue.XiuQi]: {
    name: 'XiuQi',
    data: [
      { gainTarget: SupportContextKeys.YuanQi, value: 111 },
      { gainTarget: SupportContextKeys.HuiXinLevel, value: 70 },
    ]
  },
  [TeamSkillValue.FenLan]: {
    name: 'FenLan',
    data: [
      { gainTarget: SupportContextKeys.JiChuGongJiPercent, value: 0.07 }
    ]
  },
}

export const SetBonuseGains: { [name in SetBonuse]: Gain } = {
  [SetBonuse.ValueSetBonuse]: {
    name: SetBonuse.ValueSetBonuse,
    data: [
      // 套装 4%会心 覆盖率 40%
      { gainTarget: SupportContextKeys.HuiXin, value: 0.04 * 0.4 },
      // 套装会心效果 4% 覆盖率40%
      { gainTarget: SupportContextKeys.HuiXiao, value: 0.04 * 0.4 }
    ]
  },
  [SetBonuse.SkillSetBonuse]: {
    name: SetBonuse.SkillSetBonuse,
    data: [
      // 套装 4%会心 覆盖率 40%
      { gainTarget: SupportContextKeys.HuiXin, value: 0 },
    ]
  }
}

export const GroupSkillGains: GroupSkillType = {
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
  [GroupSkillBuffList.LiDiChengFo]: {
    name: GroupSkillBuffList.LiDiChengFo,
    data: [
      { gainTarget: SupportContextKeys.ignoreDefense, value: 0.12 }
    ]
  },
  [GroupSkillBuffList.HanXiaoQianJun]: {
    name: GroupSkillBuffList.HanXiaoQianJun,
    data: [
      { gainTarget: SupportContextKeys.PoFangPercent, value: 0.1 }
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
      { gainTarget: SupportContextKeys.JiChuGongJi, value: 490 }
    ]
  },
  [WeaponValue.CW]: {
    name: WeaponValue.CW,
    data: [
      { gainTarget: SupportContextKeys.JiChuGongJi, value: 0 }
    ]
  },
  [WeaponValue.Normal]: {
    name: WeaponValue.EffectWather,
    data: [
      { gainTarget: SupportContextKeys.JiChuGongJi, value: 0 }
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
      { gainTarget: SupportContextKeys.damageBonus, value: 0.011 }
    ]
  },
  [EnChantsList.EnChantBody]: {
    name: EnChantsList.EnChantBody,
    data: [
      { gainTarget: SupportContextKeys.JiChuGongJi, value: 357 }
    ]
  },
  [EnChantsList.EnChantHand]: {
    name: EnChantsList.EnChantHand,
    data: [
      { gainTarget: SupportContextKeys.JiChuGongJi, value: 0 }
    ]
  },
  [EnChantsList.EnChantHead]: {
    name: EnChantsList.EnChantHead,
    data: [
      { gainTarget: SupportContextKeys.PoFangLevel, value: 496 }
    ]
  },
  [EnChantsList.EnChantShoe]: {
    name: EnChantsList.EnChantShoe,
    data: [
      { gainTarget: SupportContextKeys.JiChuGongJi, value: 0 }
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
      { gainTarget: SupportContextKeys.PoFangLevel, value: 3845 * 15 / 180 }
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
      { gainTarget: SupportContextKeys.WuShuangLevel, value: 100 }
    ]
  },
  [BanquetList.ErShiSiQiaoMingYueYe]: {
    name: BanquetList.ErShiSiQiaoMingYueYe,
    data: [
      { gainTarget: SupportContextKeys.JiChuGongJi, value: 214 },
      { gainTarget: SupportContextKeys.HuiXinLevel, value: 397 },
      { gainTarget: SupportContextKeys.PoZhao, value: 397 },
    ]
  },
  [BanquetList.TongZeYan]: {
    name: BanquetList.TongZeYan,
    data: [
      { gainTarget: SupportContextKeys.WuShuangLevel, value: 130 }
    ]
  },
  [BanquetList.ZhengYuCaiPan]: {
    name: BanquetList.ZhengYuCaiPan,
    data: [
      { gainTarget: SupportContextKeys.WuShuangLevel, value: 517 }
    ]
  },
}

export const FoodGains: Food = {
  FoodEnhance: {
    [FoodEnhanceList.BaiRouXueChang]: {
      name: FoodEnhanceList.BaiRouXueChang,
      data: [
        { gainTarget: SupportContextKeys.PoZhao, value: 695 }
      ]
    },
    [FoodEnhanceList.GuanTangBao]: {
      name: FoodEnhanceList.GuanTangBao,
      data: [
        { gainTarget: SupportContextKeys.JiChuGongJi, value: 374 }
      ]
    },
    [FoodEnhanceList.HongShaoPaiGu]: {
      name: FoodEnhanceList.HongShaoPaiGu,
      data: [
        { gainTarget: SupportContextKeys.PoFangLevel, value: 695 }
      ]
    },
    [FoodEnhanceList.SuanCaiYu]: {
      name: FoodEnhanceList.SuanCaiYu,
      data: [
        { gainTarget: SupportContextKeys.HuiXinLevel, value: 695 }
      ]
    },
  },
  FoodSupport: {
    [FoodSupportList.YuPianShaGuoZhou]: {
      name: FoodSupportList.YuPianShaGuoZhou,
      data: [
        { gainTarget: SupportContextKeys.YuanQi, value: 156 }
      ]
    },
  },
  DrugEnhance: {
    [DrugEnhanceList.ShangPinNingShenSan]: {
      name: DrugEnhanceList.ShangPinNingShenSan,
      data: [
        { gainTarget: SupportContextKeys.PoZhao, value: 894 }
      ]
    },
    [DrugEnhanceList.ShangPinPoHuiSan]: {
      name: DrugEnhanceList.ShangPinPoHuiSan,
      data: [
        { gainTarget: SupportContextKeys.PoFangLevel, value: 894 }
      ]
    },
    [DrugEnhanceList.ShangPinYuLiSan]: {
      name: DrugEnhanceList.ShangPinYuLiSan,
      data: [
        { gainTarget: SupportContextKeys.HuiXinLevel, value: 894 }
      ]
    },
    [DrugEnhanceList.ShangPinZhanFengDan]: {
      name: DrugEnhanceList.ShangPinZhanFengDan,
      data: [
        { gainTarget: SupportContextKeys.JiChuGongJi, value: 481 }
      ]
    },
  },
  DrugSupport: {
    [DrugSupportList.ShangPinJuHunWan]: {
      name: DrugSupportList.ShangPinJuHunWan,
      data: [
        { gainTarget: SupportContextKeys.YuanQi, value: 200 }
      ]
    },
  }
}