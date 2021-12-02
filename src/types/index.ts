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

export enum EffectSpineList {
  XiangMeng = 'XiangMeng',
}

export enum FormationValue {
  TianGuLeiYinZhen = 'TianGuLeiYinZhen',
  DuJingZhen = 'DuJingZhen',
  TianLuoZhen = 'TianLuoZhen',
  QiChunZhen = 'QiChunZhen',
  MoWenZhen = 'MoWenZhen',
}

export enum TeamSkillValue {
  JinGangNuMu = 'JinGangNuMu',
  QinLongJue = 'QinLongJue',
  PoCangQiong = 'PoCangQiong',
  XiuQi = 'XiuQi',
  FenLan = 'FenLan',
  // 外功
  SuiXingChen = 'SuiXingChen',
  YinMeiXiang = 'YinMeiXiang',
  JiLei = 'JiLei',
  Jiu = 'Jiu',
}

export enum GroupSkillBuffList {
  HongFa = 'HongFa',
  LiDiChengFo = 'LiDiChengFo',
  ChaoShengYan = 'ChaoShengYan',
  JieHuoZhan = 'JieHuoZhan',
  LieRiZhan = 'LieRiZhan',
  HaoLingSanJun = 'HaoLingSanJun',
  MeiHuaDun = 'MeiHuaDun',
  HanXiaoQianJun = 'HanXiaoQianJun',
}

export enum EnChantsList {
  EnChantHead = 'EnChantHead', // 附魔头
  EnChantBody = 'EnChantBody', // 附魔衣服
  EnChantBelt = 'EnChantBelt', // 附魔腰带
  EnChantHand = 'EnChantHand', // 附魔护手
  EnChantShoe = 'EnChantShoe', // 附魔鞋子
}

export enum WeaponValue {
  Normal = 'Normal',
  CW = 'CW', // 橙武
  EffectWather = 'EffectWather', // 水特效
}

export enum SetBonuse {
  SkillSetBonuse = 'SkillSetBonuse', // 套装类型
  ValueSetBonuse = 'ValueSetBonuse', // 数值套装效果
}

// 增强食品
export enum FoodEnhanceList {
  SuanCaiYu = 'SuanCaiYu',
  HongShaoPaiGu = 'HongShaoPaiGu',
  BaiRouXueChang = 'BaiRouXueChang',
  GuanTangBao = 'GuanTangBao',
}
// 增强药品
export enum DrugEnhanceList {
  ShangPinYuLiSan = 'ShangPinYuLiSan',
  ShangPinPoHuiSan = 'ShangPinPoHuiSan',
  ShangPinNingShenSan = 'ShangPinNingShenSan',
  ShangPinZhanFengDan = 'ShangPinZhanFengDan',
}
// 辅助食品
export enum FoodSupportList {
  YuPianShaGuoZhou = 'YuPianShaGuoZhou',
}
// 辅助药品
export enum DrugSupportList {
  ShangPinJuHunWan = 'ShangPinJuHunWan',
}
// 家园小吃
export enum HomeFoodList {
  JianDouFu = 'JianDouFu',
  XiaoChaoQingCai = 'XiaoChaoQingCai',
  ZhaXiaoYu = 'ZhaXiaoYu',
  DunDouFu = 'DunDouFu',
  QingZhengLuYu = 'QingZhengLuYu',
}
