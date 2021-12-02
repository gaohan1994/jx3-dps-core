export function createEnum<T extends string>(keys: Array<T>): { [K in T]: K } {
  return keys.reduce((result, key) => {
    result[key] = key;
    return result;
  }, Object.create(null));
}

// 增益目标
export const BuffKeys = createEnum([
  'YuanQi',
  'GenGu',
  'LiDao',
  'ShenFa',
  'damageBonus',
  'globalIgnoreDefense', // 新增全局无视防御系数 包含2个技能 梅花盾 和 田螺阵
  'ignoreDefense', // 新增无视防御系数
  'PoFangPercent',
  'PoFangLevel',
  'JiChuGongJi',
  'JiChuGongJiPercent',
  'HuiXin',
  'HuiXinLevel',
  'HuiXiao',
  'HuiXiaoLevel',
  'MingZhong',
  'MingZhongLevel',
  'WuShuang',
  'WuShuangLevel',
  'PoZhao',
]);
export type BuffKeys = keyof typeof BuffKeys;

export type SupportContext = {
  [key in BuffKeys]: number;
};

export enum TargetListKeys {
  DaMoDong = 'DaMoDong',
  MuZhuang111 = 'MuZhuang111',
  MuZhuang112 = 'MuZhuang112',
  MuZhuang113 = 'MuZhuang113',
}

export type TargetParams = {
  name: string;
  defenseCoefficient: number;
  neiFang: number;
  level: number;
};
// 家园小吃
export enum HomeFoodList {
  JianDouFu = 'JianDouFu',
  XiaoChaoQingCai = 'XiaoChaoQingCai',
  ZhaXiaoYu = 'ZhaXiaoYu',
  DunDouFu = 'DunDouFu',
  QingZhengLuYu = 'QingZhengLuYu',
}
