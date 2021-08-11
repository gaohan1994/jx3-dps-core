import DpsCore from "../core/core";
import Support from "../support/support";
import Target from '../support/target';

/**
 * 技能增益核心类
 *
 * @export
 * @enum {number}
 */
export interface GainAttribute {
  gainTarget: SupportContextKeys;
  value: number;
}

export type Gain = {
  name: string;
  data: Array<GainAttribute>;
};

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

export enum TargetMode {

  /**
   * 目标类型 - 木桩
   */
  MuZhuang = 'MuZhuang',

  /**
   * 目标类型 - boss
   */
  Boss = 'Boss'
}

/**
 * boss 列表
 *
 * @export
 * @enum {number}
 */
export enum TargetBossList {
  DaMoDong = 'DaMoDong'
}

/**
 * 木桩列表
 *
 * @export
 * @enum {number}
 */
export enum TargetMuZhuangList {
  MuZhuang111 = 'MuZhuang111',
  MuZhuang112 = 'MuZhuang111',
  MuZhuang113 = 'MuZhuang111',
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
  MeiHuaDun = 'MeiHuaDun'
}


export type Formation = {
  [key in FormationValue]: Gain;
}

export enum EnChants {
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

/**
 * 武器类型
 *
 * @export
 * @enum {number}
 */
export enum Weapon {
  Normal = 'Normal',
  /**
   * 橙武
   */
  CW = 'CW',
  /**
   * 雷特效
   */
  EffectThunder = 'EffectThunder',
  /**
   * 水特效
   */
  EffectWather = 'EffectWather'
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

type Partical<T> = {
  [P in keyof T]?: T[P];
}

export type GroupSkillType = Partical<{
  [key in GroupSkillBuffList]: Gain;
}>

export interface SkillMiddleware {
  (ctx: SkillContext, next: any): any;
}

export enum SkillMiddleSteps {
  step1 = 'step1',
  step2 = 'step2',
  step3 = 'step3',
  step4 = 'step4'
}


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

  /**
   * 经过 step1 CalculatorSkillDamage 计算之后的值
   *
   * @type {number}
   * @memberof Skill
   */
  step1SkillDamage?: number;
  /**
   * 计算 step1 时的系数
   *
   * @type {number}
   * @memberof SkillContext
   */
  step1Coefficient?: number;

  /**
   * 经过 step2 CalculatorSkillDamageWithQiXueAndMiJi 计算之后的值
   *
   * @memberof Skill
   */
  step2SkillDamage?: number;

  /**
   * 计算 step2 时的系数
   *
   * @type {number}
   * @memberof SkillContext
   */
  step2Coefficient?: number;

  /**
   * 经过 step3 CalculatorSkillDamageWithPoFangAndWuShuang 计算之后的值
   *
   * @type {number}
   * @memberof Skill
   */
  step3SkillDamage?: number;

  /**
   * 计算 step3 时的系数
   *
   * @type {number}
   * @memberof SkillContext
   */
  step3Coefficient?: number;

  /**
   * 经过 step4 CalculatorSkillDamageWithHuiXinAndHuiXiao 计算之后的值
   *
   * @type {number}
   * @memberof Skill
   */
  step4SkillDamage?: number;

  /**
   * 计算 step4 时的系数
   *
   * @type {number}
   * @memberof SkillContext
   */
  step4Coefficient?: number;

  /**
   * step5 计算结果
   *
   * @type {number}
   * @memberof SkillContext
   */
  step5SkillDamage?: number;

  /**
   * step5 计算系数
   *
   * @type {number}
   * @memberof SkillContext
   */
  step5Coefficient?: number;

  step6SkillDamage?: number;
  step6Coefficient?: number;

  skillTimes?: number;

  basicDamage?: number;

  coefficient?: number;

}

export enum SupportContextKeys {
  mainAttribute = 'mainAttribute',
  YuanQi = 'YuanQi',
  GenGu = 'GenGu',
  LiDao = 'LiDao',
  ShenFa = 'ShenFa',
  damageBonus = 'damageBonus',
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

export interface SupportContext {
  /**
   * 主属性 
   *
   * @type {number}
   * @memberof SupportContext
   */
  mainAttribute: number;
  YuanQi?: number;
  GenGu?: number;
  LiDao?: number;
  ShenFa?: number;

  PoZhao: number;
  /**
   * 易伤
   *
   * @type {number}
   * @memberof SupportContext
   */
  damageBonus: number;

  PoFangLevel: number;
  PoFangPercent: number;

  JiChuGongJi: number;
  JiChuGongJiPercent: number;

  HuiXin: number;
  HuiXinLevel: number;

  HuiXiao: number;
  HuiXiaoLevel: number;

  MingZhong: number;
  MingZhongLevel: number;

  WuShuang: number;
  WuShuangLevel: number;
}

export interface CalculatorResultSkillItem {
  skillName: string;
  subTotal: number;
  percent: number;
}

export interface CalculatorResult {
  totalExpectation: number;
  seconds: number;
  dps: number;
  skills: CalculatorResultSkillItem[];
}