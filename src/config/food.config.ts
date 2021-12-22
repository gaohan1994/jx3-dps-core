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
    data: [{ gainTarget: BuffKeys.WuShuangLevel, value: 100, coverage: 1 }],
  },
  {
    name: BanquetList.ErShiSiQiaoMingYueYe,
    data: [
      { gainTarget: BuffKeys.JiChuGongJi, value: 214, coverage: 1 },
      { gainTarget: BuffKeys.HuiXinLevel, value: 397, coverage: 1 },
      { gainTarget: BuffKeys.PoZhao, value: 397, coverage: 1 },
    ],
  },
  {
    name: BanquetList.TongZeYan,
    data: [{ gainTarget: BuffKeys.WuShuangLevel, value: 130, coverage: 1 }],
  },
  {
    name: BanquetList.ZhengYuCaiPan,
    data: [{ gainTarget: BuffKeys.WuShuangLevel, value: 517, coverage: 1 }],
  },
];

// 增强食品
export enum FoodEnhanceList {
  'SuanCaiYu' = '酸菜鱼',
  'HongShaoPaiGu' = '红烧排骨',
  'BaiRouXueChang' = '白肉血肠',
  'GuanTangBao' = '灌汤包',
}

export const FoodEnchanceConfig = [
  {
    name: FoodEnhanceList.BaiRouXueChang,
    data: [{ gainTarget: BuffKeys.PoZhao, value: 695, coverage: 1 }],
  },
  {
    name: FoodEnhanceList.GuanTangBao,
    data: [{ gainTarget: BuffKeys.JiChuGongJi, value: 374, coverage: 1 }],
  },
  {
    name: FoodEnhanceList.HongShaoPaiGu,
    data: [{ gainTarget: BuffKeys.PoFangLevel, value: 695, coverage: 1 }],
  },
  {
    name: FoodEnhanceList.SuanCaiYu,
    data: [{ gainTarget: BuffKeys.HuiXinLevel, value: 695, coverage: 1 }],
  },
];

export enum FoodSupportList {
  'YuPianShaGuoZhou' = '鱼片砂锅粥',
}
export const FoodSupportConfig = [
  {
    name: FoodSupportList.YuPianShaGuoZhou,
    data: [{ gainTarget: BuffKeys.YuanQi, value: 156, coverage: 1 }],
  },
];

export enum DrugEnhanceList {
  'ShangPinNingShenSan' = '上品凝神散',
  'ShangPinPoHuiSan' = '上品破会散',
  'ShangPinYuLiSan' = '上品玉离散',
  'ShangPinZhanFengDan' = '上品斩凤丹',
}
export const DrugEnhanceConfig = [
  {
    name: DrugEnhanceList.ShangPinNingShenSan,
    data: [{ gainTarget: BuffKeys.PoZhao, value: 894, coverage: 1 }],
  },
  {
    name: DrugEnhanceList.ShangPinPoHuiSan,
    data: [{ gainTarget: BuffKeys.PoFangLevel, value: 894, coverage: 1 }],
  },
  {
    name: DrugEnhanceList.ShangPinYuLiSan,
    data: [{ gainTarget: BuffKeys.HuiXinLevel, value: 894, coverage: 1 }],
  },
  {
    name: DrugEnhanceList.ShangPinZhanFengDan,
    data: [{ gainTarget: BuffKeys.JiChuGongJi, value: 481, coverage: 1 }],
  },
];

export enum DrugSupportList {
  'ShangPinJuHunWan' = '上品聚魂丸',
}
export const DrugSupportConfig = [
  {
    name: DrugSupportList.ShangPinJuHunWan,
    data: [{ gainTarget: BuffKeys.YuanQi, value: 200, coverage: 1 }],
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
    data: [{ gainTarget: BuffKeys.JiChuGongJi, value: 149, coverage: 1 }],
  },
  {
    name: HomeFoodList.ZhaYuGan,
    data: [{ gainTarget: BuffKeys.HuiXinLevel, value: 277, coverage: 1 }],
  },
  {
    name: HomeFoodList.QingZhengLuYu,
    data: [{ gainTarget: BuffKeys.PoFangLevel, value: 277, coverage: 1 }],
  },
  {
    name: HomeFoodList.JianDouFu,
    data: [{ gainTarget: BuffKeys.PoZhao, value: 277, coverage: 1 }],
  },
  {
    name: HomeFoodList.DunDouFu,
    data: [{ gainTarget: BuffKeys.WuShuang, value: 277, coverage: 1 }],
  },
];

export enum WeaponEnchantList {
  ZhuiXiaoRongDing = '坠霄熔锭',
  ZhuiXiaoMoShi = '坠霄磨石',
}
export const WeaponEnchantConfig = [
  {
    name: WeaponEnchantList.ZhuiXiaoRongDing,
    data: [{ gainTarget: BuffKeys.JiChuGongJi, value: 320, coverage: 1 }],
  },
  {
    name: WeaponEnchantList.ZhuiXiaoMoShi,
    data: [{ gainTarget: BuffKeys.JiChuGongJi, value: 233, coverage: 1 }],
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
  // {
  //   name: HomeDrinkList.NvErHongJinZhaoZui,
  //   data: [{ gainTarget: BuffKeys.JiaSu, value: 320, coverage: 1 }],
  // },
  // {
  //   name: HomeDrinkList.NvErHongLiuRiZui,
  //   data: [{ gainTarget: BuffKeys.JiaSu, value: 320, coverage: 1 }],
  // },
  // {
  //   name: HomeDrinkList.NvErHongXunYouSan,
  //   data: [{ gainTarget: BuffKeys.JiaSu, value: 320, coverage: 1 }],
  // },
  {
    name: HomeDrinkList.ZhuangYuanHongJinZhaoZui,
    data: [{ gainTarget: BuffKeys.YuanQi, value: 22, coverage: 1 }],
  },
  {
    name: HomeDrinkList.ZhuangYuanHongLiuRiZui,
    data: [{ gainTarget: BuffKeys.YuanQi, value: 48, coverage: 1 }],
  },
  {
    name: HomeDrinkList.ZhuangYuanHongXunYouSan,
    data: [{ gainTarget: BuffKeys.YuanQi, value: 96, coverage: 1 }],
  },
];

export enum FestivalFoodList {
  XiHuaGao = '细花糕',
  JinQianHuaGao = '金钱花糕',
}

export const FestivalFoodConfig = [
  {
    name: FestivalFoodList.XiHuaGao,
    data: [{ gainTarget: BuffKeys.HuiXin, value: 1073, coverage: 1 }],
  },
  {
    name: FestivalFoodList.JinQianHuaGao,
    data: [{ gainTarget: BuffKeys.JiChuGongJi, value: 577, coverage: 1 }],
  },
];
