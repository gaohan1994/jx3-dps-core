import { BanquetList } from '@/config/food.config';
import {
  DrugEnhanceList,
  DrugSupportList,
  FoodEnhanceList,
  FoodSupportList,
  HomeFoodList,
  BuffKeys,
} from '../types';

/**
 * 宴席增益
 */
export const BanquetGains = {
  [BanquetList.ShuiZhuYu]: {
    name: BanquetList.ShuiZhuYu,
    data: [{ gainTarget: BuffKeys.WuShuangLevel, value: 100, coverage: 1 }],
  },
  [BanquetList.ErShiSiQiaoMingYueYe]: {
    name: BanquetList.ErShiSiQiaoMingYueYe,
    data: [
      { gainTarget: BuffKeys.JiChuGongJi, value: 214, coverage: 1 },
      { gainTarget: BuffKeys.HuiXinLevel, value: 397, coverage: 1 },
      { gainTarget: BuffKeys.PoZhao, value: 397, coverage: 1 },
    ],
  },
  [BanquetList.TongZeYan]: {
    name: BanquetList.TongZeYan,
    data: [{ gainTarget: BuffKeys.WuShuangLevel, value: 130, coverage: 1 }],
  },
  [BanquetList.ZhengYuCaiPan]: {
    name: BanquetList.ZhengYuCaiPan,
    data: [{ gainTarget: BuffKeys.WuShuangLevel, value: 517, coverage: 1 }],
  },
};

export const FoodGains = {
  FoodEnhance: {
    [FoodEnhanceList.BaiRouXueChang]: {
      name: FoodEnhanceList.BaiRouXueChang,
      data: [{ gainTarget: BuffKeys.PoZhao, value: 695, coverage: 1 }],
    },
    [FoodEnhanceList.GuanTangBao]: {
      name: FoodEnhanceList.GuanTangBao,
      data: [{ gainTarget: BuffKeys.JiChuGongJi, value: 374, coverage: 1 }],
    },
    [FoodEnhanceList.HongShaoPaiGu]: {
      name: FoodEnhanceList.HongShaoPaiGu,
      data: [{ gainTarget: BuffKeys.PoFangLevel, value: 695, coverage: 1 }],
    },
    [FoodEnhanceList.SuanCaiYu]: {
      name: FoodEnhanceList.SuanCaiYu,
      data: [{ gainTarget: BuffKeys.HuiXinLevel, value: 695, coverage: 1 }],
    },
  },
  FoodSupport: {
    [FoodSupportList.YuPianShaGuoZhou]: {
      name: FoodSupportList.YuPianShaGuoZhou,
      data: [{ gainTarget: BuffKeys.YuanQi, value: 156, coverage: 1 }],
    },
  },
  DrugEnhance: {
    [DrugEnhanceList.ShangPinNingShenSan]: {
      name: DrugEnhanceList.ShangPinNingShenSan,
      data: [{ gainTarget: BuffKeys.PoZhao, value: 894, coverage: 1 }],
    },
    [DrugEnhanceList.ShangPinPoHuiSan]: {
      name: DrugEnhanceList.ShangPinPoHuiSan,
      data: [{ gainTarget: BuffKeys.PoFangLevel, value: 894, coverage: 1 }],
    },
    [DrugEnhanceList.ShangPinYuLiSan]: {
      name: DrugEnhanceList.ShangPinYuLiSan,
      data: [{ gainTarget: BuffKeys.HuiXinLevel, value: 894, coverage: 1 }],
    },
    [DrugEnhanceList.ShangPinZhanFengDan]: {
      name: DrugEnhanceList.ShangPinZhanFengDan,
      data: [{ gainTarget: BuffKeys.JiChuGongJi, value: 481, coverage: 1 }],
    },
  },
  DrugSupport: {
    [DrugSupportList.ShangPinJuHunWan]: {
      name: DrugSupportList.ShangPinJuHunWan,
      data: [{ gainTarget: BuffKeys.YuanQi, value: 200, coverage: 1 }],
    },
  },
  HomeFood: {
    [HomeFoodList.DunDouFu]: {
      name: HomeFoodList.DunDouFu,
      data: [{ gainTarget: BuffKeys.WuShuangLevel, value: 277, coverage: 1 }],
    },
    [HomeFoodList.JianDouFu]: {
      name: HomeFoodList.JianDouFu,
      data: [{ gainTarget: BuffKeys.PoZhao, value: 277, coverage: 1 }],
    },
    [HomeFoodList.QingZhengLuYu]: {
      name: HomeFoodList.QingZhengLuYu,
      data: [{ gainTarget: BuffKeys.PoFangLevel, value: 277, coverage: 1 }],
    },
    [HomeFoodList.XiaoChaoQingCai]: {
      name: HomeFoodList.XiaoChaoQingCai,
      data: [{ gainTarget: BuffKeys.JiChuGongJi, value: 147, coverage: 1 }],
    },
    [HomeFoodList.ZhaXiaoYu]: {
      name: HomeFoodList.ZhaXiaoYu,
      data: [{ gainTarget: BuffKeys.HuiXinLevel, value: 277, coverage: 1 }],
    },
  },
};
