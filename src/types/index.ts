import DpsCore from "../core/core";
import Support from "../support/support";

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

export enum FormationValue {
  TianGuLeiYinZhen = 'TianGuLeiYinZhen'
}

export enum FormationName {
  TianGuLeiYinZhen = '天鼓雷音阵'
}

export interface Formation {
  name: FormationName;
  value: FormationValue;
}

export const Formations: Array<Formation> = [
  {
    name: FormationName.TianGuLeiYinZhen,
    value: FormationValue.TianGuLeiYinZhen,
  }
];


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

/**
 * 内功小队技能增益
 *
 * @export
 * @enum {number}
 */
export enum TeamSkillBuffNeiGong {
  PoCangQiong = 'PoCangQiong',
  XiuQi = 'XiuQi',
  QingJuan = 'QingJuan'
}

/**
 * 外功小队技能增益
 *
 * @export
 * @enum {number}
 */
export enum TeamSkillBuffWaiGong {
  SuiXingChen = 'SuiXingChen',
  YinMeiXiang = 'YinMeiXiang',
  JiLei = 'JiLei',
  Jiu = 'Jiu'
}

/**
 * 团队技能增益
 *
 * @export
 * @enum {number}
 */
export enum GroupSkillBuff {
  HongFa = 'HongFa',
  LiDiChengFo = 'LiDiChengFo',
  ChaoShengYan = 'ChaoShengYan',
  JieHuoZhan = 'JieHuoZhan',
  HaoLingSanJun = 'HaoLingSanJun',
  MeiHuaDun = 'MeiHuaDun'
}

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

  skillName?: string;

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

  skillTimes?: number;

  basicDamage?: number;

  coefficient?: number;

}