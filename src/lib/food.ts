import { Banquet, BanquetList, DrugEnhanceList, DrugSupportList, Food, FoodEnhanceList, FoodSupportList, HomeFoodList, SupportContextKeys } from "../types";

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
  },
  HomeFood: {
    [HomeFoodList.DunDouFu]: {
      name: HomeFoodList.DunDouFu,
      data: [
        { gainTarget: SupportContextKeys.WuShuangLevel, value: 277, coverage: 1 }
      ]
    },
    [HomeFoodList.JianDouFu]: {
      name: HomeFoodList.JianDouFu,
      data: [
        { gainTarget: SupportContextKeys.PoZhao, value: 277, coverage: 1 }
      ]
    },
    [HomeFoodList.QingZhengLuYu]: {
      name: HomeFoodList.QingZhengLuYu,
      data: [
        { gainTarget: SupportContextKeys.PoFangLevel, value: 277, coverage: 1 }
      ]
    },
    [HomeFoodList.XiaoChaoQingCai]: {
      name: HomeFoodList.XiaoChaoQingCai,
      data: [
        { gainTarget: SupportContextKeys.JiChuGongJi, value: 147, coverage: 1 }
      ]
    },
    [HomeFoodList.ZhaXiaoYu]: {
      name: HomeFoodList.ZhaXiaoYu,
      data: [
        { gainTarget: SupportContextKeys.HuiXinLevel, value: 277, coverage: 1 }
      ]
    },
  }
}