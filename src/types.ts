export function createEnum<T extends string>(keys: Array<T>): { [K in T]: K } {
  return keys.reduce((result, key) => {
    result[key] = key;
    return result;
  }, Object.create(null));
}

// 增益目标
export const BuffKeys = createEnum([
  'Spunk',
  'damageBonus',
  'globalIgnoreDefense', // 新增全局无视防御系数 包含2个技能 梅花盾 和 田螺阵
  'ignoreDefense', // 新增无视防御系数
  'SolarOvercomePercent',
  'SolarOvercome',
  'SolarAttackPowerBase',
  'SolarAttackPowerBasePercent',
  'SolarCriticalStrikeRate',
  'SolarCriticalStrike',
  'HuiXiao',
  'HuiXiaoLevel',
  'MingZhong',
  'MingZhongLevel',
  'Strain',
  'StrainPercent',
  'PoZhao',
]);
export type BuffKeys = keyof typeof BuffKeys;

export enum SkillNames {
  PoZhao = 'PoZhao',
  NaYunShi = 'NaYunShi',
  HengSaoLiuHe = 'HengSaoLiuHe',
  HengSaoLiuHeDot = 'HengSaoLiuHeDot',
  ShouQueShi = 'ShouQueShi',
  PuDuSiFang = 'PuDuSiFang',
  XiangMo = 'XiangMo',
  SuoDi = 'SuoDi',
  TiHuGuanDing = 'TiHuGuanDing',
  FoGuo = 'FoGuo',
  WeiTuoXianChu = 'WeiTuoXianChu',
  LiuHeGun = 'LiuHeGun',
  XinZheng = 'XinZheng',
  XinZhengGunWu = 'XinZhengGunWu',
  EnChantHand = 'EnChantHand',
  EnChantShoe = 'EnChantShoe',
  QianJinZhui = 'QianJinZhui',
  JinGangRiLun = 'JinGangRiLun',
}
// 技能名称
export enum SkillTitles {
  PoZhao = '破招',
  NaYunShi = '拿云式',
  HengSaoLiuHe = '横扫六合',
  HengSaoLiuHeDot = '横扫六合DOT',
  ShouQueShi = '守缺式',
  PuDuSiFang = '普度四方',
  XiangMo = '降魔',
  SuoDi = '缩地',
  TiHuGuanDing = '醍醐灌顶',
  FoGuo = '佛果',
  WeiTuoXianChu = '韦陀献杵',
  LiuHeGun = '六合棍',
  XinZheng = '心诤·扫击',
  XinZhengGunWu = '心诤·棍舞',
  EnChantHand = '附魔手',
  EnChantShoe = '附魔脚',
  QianJinZhui = '千斤坠',
  JinGangRiLun = '金刚日轮',
}

export const YiJinJingQiXueVersion = createEnum([SkillNames.XinZheng, SkillNames.TiHuGuanDing]);
export type YiJinJingQiXueVersion = keyof typeof YiJinJingQiXueVersion;

export const YiJinJingSkillEnchant = createEnum(['JinGangRiLun']);
export type YiJinJingSkillEnchant = keyof typeof YiJinJingSkillEnchant;

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
