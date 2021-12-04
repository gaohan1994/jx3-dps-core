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
