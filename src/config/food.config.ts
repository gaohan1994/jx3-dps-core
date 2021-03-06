import { BuffKeys } from '@types';

export enum BanquetList {
  'ShuiZhuYu' = '水煮鱼',
  'ErShiSiQiaoMingYueYe' = '二十四桥明月夜',
  'TongZeYan' = '同泽宴',
  'ZhengYuCaiPan' = '蒸鱼菜盘',
}
export const BanquetConfig = [
  {
    name: BanquetList.ShuiZhuYu,
    data: [{ gainTarget: BuffKeys.Strain, value: 100, coverage: 1 }],
  },
  {
    name: BanquetList.ErShiSiQiaoMingYueYe,
    data: [
      { gainTarget: BuffKeys.SolarAttackPowerBase, value: 214, coverage: 1 },
      { gainTarget: BuffKeys.SolarCriticalStrike, value: 397, coverage: 1 },
      { gainTarget: BuffKeys.SurplusValue, value: 397, coverage: 1 },
    ],
  },
  {
    name: BanquetList.TongZeYan,
    data: [{ gainTarget: BuffKeys.Strain, value: 130, coverage: 1 }],
  },
  {
    name: BanquetList.ZhengYuCaiPan,
    data: [{ gainTarget: BuffKeys.Strain, value: 517, coverage: 1 }],
  },
];

// 增强食品
export enum FoodEnhanceList {
  'SuanCaiYu' = '奉天·酸菜鱼',
  'HongShaoPaiGu' = '奉天·红烧排骨',
  'BaiRouXueChang' = '奉天·白肉血肠',
  'GuanTangBao' = '奉天·灌汤包',
}

export const FoodEnchanceConfig = [
  {
    name: FoodEnhanceList.BaiRouXueChang,
    data: [{ gainTarget: BuffKeys.SurplusValue, value: 771, coverage: 1 }],
  },
  {
    name: FoodEnhanceList.GuanTangBao,
    data: [{ gainTarget: BuffKeys.SolarAttackPowerBase, value: 415, coverage: 1 }],
  },
  {
    name: FoodEnhanceList.HongShaoPaiGu,
    data: [{ gainTarget: BuffKeys.SolarOvercome, value: 771, coverage: 1 }],
  },
  {
    name: FoodEnhanceList.SuanCaiYu,
    data: [{ gainTarget: BuffKeys.SolarCriticalStrike, value: 771, coverage: 1 }],
  },
];

export enum FoodSupportList {
  'YuPianShaGuoZhou' = '奉天·鱼片砂锅粥',
}
export const FoodSupportConfig = [
  {
    name: FoodSupportList.YuPianShaGuoZhou,
    data: [{ gainTarget: BuffKeys.Spunk, value: 173, coverage: 1 }],
  },
];

export enum DrugEnhanceList {
  'ShangPinNingShenSan' = '奉天·上品凝神散',
  'ShangPinPoHuiSan' = '奉天·上品破会散',
  'ShangPinYuLiSan' = '奉天·上品玉离散',
  'ShangPinZhanFengDan' = '奉天·上品斩凤丹',
}
export const DrugEnhanceConfig = [
  {
    name: DrugEnhanceList.ShangPinNingShenSan,
    data: [{ gainTarget: BuffKeys.SurplusValue, value: 991, coverage: 1 }],
  },
  {
    name: DrugEnhanceList.ShangPinPoHuiSan,
    data: [{ gainTarget: BuffKeys.SolarOvercome, value: 991, coverage: 1 }],
  },
  {
    name: DrugEnhanceList.ShangPinYuLiSan,
    data: [{ gainTarget: BuffKeys.SolarCriticalStrike, value: 991, coverage: 1 }],
  },
  {
    name: DrugEnhanceList.ShangPinZhanFengDan,
    data: [{ gainTarget: BuffKeys.SolarAttackPowerBase, value: 533, coverage: 1 }],
  },
];

export enum DrugSupportList {
  'ShangPinJuHunWan' = '奉天·上品聚魂丸',
}
export const DrugSupportConfig = [
  {
    name: DrugSupportList.ShangPinJuHunWan,
    data: [{ gainTarget: BuffKeys.Spunk, value: 222, coverage: 1 }],
  },
];

// 家园小吃
export enum HomeFoodList {
  JianDouFu = '煎豆腐',
  XiaoChaoQingCai = '小炒青菜',
  ZhaYuGan = '炸鱼干',
  DunDouFu = '炖豆腐',
  QingZhengLuYu = '清蒸鲈鱼',
}
export const HomeFoodConfig = [
  {
    name: HomeFoodList.XiaoChaoQingCai,
    data: [{ gainTarget: BuffKeys.SolarAttackPowerBase, value: 149, coverage: 1 }],
  },
  {
    name: HomeFoodList.ZhaYuGan,
    data: [{ gainTarget: BuffKeys.SolarCriticalStrike, value: 277, coverage: 1 }],
  },
  {
    name: HomeFoodList.QingZhengLuYu,
    data: [{ gainTarget: BuffKeys.SolarOvercome, value: 277, coverage: 1 }],
  },
  {
    name: HomeFoodList.JianDouFu,
    data: [{ gainTarget: BuffKeys.SurplusValue, value: 277, coverage: 1 }],
  },
  {
    name: HomeFoodList.DunDouFu,
    data: [{ gainTarget: BuffKeys.Strain, value: 277, coverage: 1 }],
  },
];

export enum WeaponEnchantList {
  ZhuiXiaoRongDing = '奉天·坠霄熔锭',
  BingZhu = '奉天·兵·铸',
}
export const WeaponEnchantConfig = [
  {
    name: WeaponEnchantList.ZhuiXiaoRongDing,
    data: [{ gainTarget: BuffKeys.SolarAttackPowerBase, value: 355, coverage: 1 }],
  },
  {
    name: WeaponEnchantList.BingZhu,
    data: [{ gainTarget: BuffKeys.SolarAttackPowerBase, value: 237, coverage: 1 }],
  },
];

export enum HomeDrinkList {
  // NvErHongJinZhaoZui = '女儿红-今朝醉',
  // NvErHongLiuRiZui = '女儿红-六日醉',
  // NvErHongXunYouSan = '女儿红-旬又三',
  ZhuangYuanHongJinZhaoZui = '状元红-今朝醉',
  ZhuangYuanHongLiuRiZui = '状元红-六日醉',
  ZhuangYuanHongXunYouSan = '状元红-旬又三',
}

export const HomeDrinkConfig = [
  {
    name: HomeDrinkList.ZhuangYuanHongJinZhaoZui,
    data: [{ gainTarget: BuffKeys.Spunk, value: 22, coverage: 1 }],
  },
  {
    name: HomeDrinkList.ZhuangYuanHongLiuRiZui,
    data: [{ gainTarget: BuffKeys.Spunk, value: 48, coverage: 1 }],
  },
  {
    name: HomeDrinkList.ZhuangYuanHongXunYouSan,
    data: [{ gainTarget: BuffKeys.Spunk, value: 96, coverage: 1 }],
  },
];

export enum FestivalFoodList {
  XiHuaGao = '细花糕',
  JinQianHuaGao = '金钱花糕',
}

export const FestivalFoodConfig = [
  {
    name: FestivalFoodList.XiHuaGao,
    data: [{ gainTarget: BuffKeys.SolarCriticalStrike, value: 1073, coverage: 1 }],
  },
  {
    name: FestivalFoodList.JinQianHuaGao,
    data: [{ gainTarget: BuffKeys.SolarAttackPowerBase, value: 577, coverage: 1 }],
  },
];
