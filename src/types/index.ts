import DpsCore from "../core/core";
import Support from "../support/support";
import Target from '../support/target';

export enum JiaSuValue {
  YiDuanJiaSu = 'YiDuanJiaSu',
  ErDuanJiaSu = 'ErDuanJiaSu',
}

/**
 * 技能增益核心类
 * 
 * @todo 新增覆盖率
 * @time 08-31 
 * @param coverage
 *
 * @export
 * @enum {number}
 */
export interface GainAttribute {
  gainTarget: SupportContextKeys;
  value: number;
  coverage: number;
}

export type Gain = {
  name: string;
  data: Array<GainAttribute>;
};

export type GainOptions = {
  coverage?: number;
}

/**
 * 辅助类类别 
 * 
 * 内功 / 外功
 *
 * @export
 * @enum {number}
 */
export enum SupportMode {
  NeiGong = 'NeiGong',
  WaiGong = 'WaiGong'
}

export enum CharacterTypes {
  /**
   * 元气
   */
  YuanQi = 'YuanQi',

  /**
   * 根骨
   */
  GenGu = 'GenGu',

  /**
   * 力道
   */
  LiDao = 'LiDao',

  /**
   * 身法
   */
  ShenFa = 'ShenFa',
}

/**
 * 目标列表
 *
 * @export
 * @enum {number}
 */
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
}

/**
 * 阵法列表
 *
 * @export
 * @enum {number}
 */
export enum FormationValue {
  TianGuLeiYinZhen = 'TianGuLeiYinZhen',
  DuJingZhen = 'DuJingZhen',
  TianLuoZhen = 'TianLuoZhen',
  QiChunZhen = 'QiChunZhen',
}

/**
 * 技能增益列表
 *
 * @export
 * @enum {number}
 */
export enum TeamSkillValue {
  /**
   * 
   * 内功技能增益
   */
  JinGangNuMu = 'JinGangNuMu',
  QinLongJue = 'QinLongJue',
  PoCangQiong = 'PoCangQiong',
  XiuQi = 'XiuQi',
  FenLan = 'FenLan',

  /**
   * 外功小队技能增益
   *
   * @export
   * @enum {number}
   */
  SuiXingChen = 'SuiXingChen',
  YinMeiXiang = 'YinMeiXiang',
  JiLei = 'JiLei',
  Jiu = 'Jiu'
}

export enum GroupSkillList {

}

/**
 * 团队技能增益
 *
 * @export
 * @enum {number}
 */
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


export type Formation = {
  [key in FormationValue]: Gain;
}

export enum EnChantsList {
  // 附魔头
  EnChantHead = 'EnChantHead',
  // 附魔衣服
  EnChantBody = 'EnChantBody',
  // 附魔腰带
  EnChantBelt = 'EnChantBelt',
  // 附魔护手
  EnChantHand = 'EnChantHand',
  // 附魔鞋子
  EnChantShoe = 'EnChantShoe',
}

export type EnChants = {
  [key in EnChantsList]: Gain
}

export enum EffectSpineList {
  XiangMeng = 'XiangMeng'
}

export type EffectSpine = {
  [key in EffectSpineList]: Gain
}

/**
 * 武器类型
 *
 * @export
 * @enum {number}
 */
export enum WeaponValue {
  Normal = 'Normal',
  /**
   * 橙武
   */
  CW = 'CW',
  /**
   * 水特效
   */
  EffectWather = 'EffectWather'
}

export type Weapon = {
  [key in WeaponValue]: Gain;
}

/**
 * 套装类型
 *
 * @export
 * @enum {number}
 */
export enum SetBonuse {
  /**
   * 技能套装效果
   */
  SkillSetBonuse = 'SkillSetBonuse',

  /**
   * 数值套装效果
   */
  ValueSetBonuse = 'ValueSetBonuse',
}

export enum BanquetList {
  ShuiZhuYu = 'ShuiZhuYu',
  ErShiSiQiaoMingYueYe = 'ErShiSiQiaoMingYueYe',
  TongZeYan = 'TongZeYan',
  ZhengYuCaiPan = 'ZhengYuCaiPan',
}

export type Banquet = {
  [key in BanquetList]: Gain
}

/**
 * 增强食品
 */
export enum FoodEnhanceList {
  SuanCaiYu = 'SuanCaiYu',
  HongShaoPaiGu = 'HongShaoPaiGu',
  BaiRouXueChang = 'BaiRouXueChang',
  GuanTangBao = 'GuanTangBao',
}

/**
 * 增强药品
 */
export enum DrugEnhanceList {
  ShangPinYuLiSan = 'ShangPinYuLiSan',
  ShangPinPoHuiSan = 'ShangPinPoHuiSan',
  ShangPinNingShenSan = 'ShangPinNingShenSan',
  ShangPinZhanFengDan = 'ShangPinZhanFengDan',
}

/**
 * 辅助食品
 */
export enum FoodSupportList {
  YuPianShaGuoZhou = 'YuPianShaGuoZhou',
}

/**
 * 辅助药品
 */
export enum DrugSupportList {
  ShangPinJuHunWan = 'ShangPinJuHunWan',
}

/**
 * 小吃增益
 */
export type Food = {
  FoodEnhance: {
    [key in FoodEnhanceList]: Gain;
  },
  DrugEnhance: {
    [key in DrugEnhanceList]: Gain;
  },
  FoodSupport: {
    [key in FoodSupportList]: Gain;
  }
  DrugSupport: {
    [key in DrugSupportList]: Gain;
  }
}

type Partical<T> = {
  [P in keyof T]?: T[P];
}

export type GroupSkillType = Partical<{
  [key in GroupSkillBuffList]: Gain;
}>


export interface SkillContext {
  core: DpsCore;

  support: Support;

  target?: Target;

  skillName?: string;

  supportContext?: SupportContext;

  /**
   * 当前技能的dps期望
   *
   * @type {number}
   * @memberof SkillContext
   */
  subTotal?: number;

  skillTimes?: number;

  basicDamage?: number;

  coefficient?: number;
}

export enum SupportContextKeys {
  YuanQi = 'YuanQi',
  GenGu = 'GenGu',
  LiDao = 'LiDao',
  ShenFa = 'ShenFa',
  damageBonus = 'damageBonus',
  /**
   * 新增无视防御系数
   * 
   * @time 08-24
   * @param ignoreDefense
   */
  ignoreDefense = 'ignoreDefense',
  PoFangPercent = 'PoFangPercent',
  PoFangLevel = 'PoFangLevel',
  JiChuGongJi = 'JiChuGongJi',
  JiChuGongJiPercent = 'JiChuGongJiPercent',
  HuiXin = 'HuiXin',
  HuiXinLevel = 'HuiXinLevel',
  HuiXiao = 'HuiXiao',
  HuiXiaoLevel = 'HuiXiaoLevel',
  MingZhong = 'MingZhong',
  MingZhongLevel = 'MingZhongLevel',
  WuShuang = 'WuShuang',
  WuShuangLevel = 'WuShuangLevel',
  PoZhao = 'PoZhao',
}

export type SupportContext = {
  [key in SupportContextKeys]: number;
}

export interface CalculatorResultSkillItem {
  skillName: string;
  subTotal: number;
  percent: number;
  skillTimes: number;
}

export interface CalculatorResult {
  totalExpectation: number;
  seconds: number;
  dps: number;
  skills: CalculatorResultSkillItem[];
}