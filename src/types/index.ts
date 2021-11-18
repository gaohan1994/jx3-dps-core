import DpsCore from "../packages/core/core";
import Support from "../packages/support/support";
import Target from '../packages/support/target';

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

type MyPartial<T> = { [P in keyof T]?: T[P] }
// 接下来设计一个这样的类型工具NonFunctionKeys<T> ，
// 通过使用 NonFunctionKeys<T> 得到对象类型 T 中非函数的属性名组成的联合类型

type MixedProps = { name: string; setName: (name: string) => void };

type NonFunctionKeys<T> = {
  [P in keyof T]: T[P] extends Function ? never : P;
}[keyof T];

// expect: "name"
type Keys = NonFunctionKeys<MixedProps>;

type ContructorParameters<T extends new (...args: any[]) => any>
  = T extends new (...args: infer P) => any ? P : never;

// [string, number] => string | number
type ElementOf<T> = T extends Array<infer E> ? E : never;
type TTuple = [string, number];
type ElementOfTTuple = ElementOf<TTuple>;

// 'NeiGong' | 'WaiGong' => {NeiGong: Gain, WaiGong: Gain}

function createEnum<T extends string>(keys: Array<T>): { [K in T]: K } {
  return keys.reduce((result, key) => {
    result[key] = key
    return result;
  }, Object.create(null));
}

// 创建 K: V
const CoreEnum = createEnum(['YuanQi', 'GenGu', 'LiDao', 'ShenFa']);

type CoreEnum = keyof typeof CoreEnum;

const SupportEnum2 = createEnum(['NeiGong', 'WaiGong']);
type SupportEnum2 = typeof SupportEnum2;

type UnionEnum<T> = {
  [key in keyof T]: Gain
}

type SupportGain = UnionEnum<SupportEnum2>;

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
  MoWenZhen = 'MoWenZhen',
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
 * 家园小吃
 */
export enum HomeFoodList {
  JianDouFu = 'JianDouFu',
  XiaoChaoQingCai = 'XiaoChaoQingCai',
  ZhaXiaoYu = 'ZhaXiaoYu',
  DunDouFu = 'DunDouFu',
  QingZhengLuYu = 'QingZhengLuYu',
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
  HomeFood: {
    [key in HomeFoodList]: Gain;
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
   * 新增全局无视防御系数
   * 包含2个技能 梅花盾 和 田螺阵
   * 
   * @time 09-01
   * @param globalIgnoreDefense
   */
  globalIgnoreDefense = 'globalIgnoreDefense',
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

/**
 * 属性收益模块
 * @param ProfitCore
 */
export type ProfitCore = {
  // 描述该模块收益
  title: string;
  // 该属性具体的增益
  gain: Gain;
  // 放大倍数
  multiple: number;
  // 比例
  proportion: number;

  // 该属性单位收益
  attrProfit: number;
  // 单分收益
  pointProfit: number;

  // 原dps
  baseDps?: number;
  // 增益之后的dps
  profitDps?: number;

  // 五行石对应的数值如  6级 16点元气
  stone: Map<number, number>;

  // 单孔收益
  profitWithStone: Map<number, number>;
}

export enum YiJinJingValues {
  Normal = 'Normal',
  Immortal = 'Immortal'
}