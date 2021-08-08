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

/**
 * 技能类型
 *
 * @export
 * @interface Skill
 */
export interface Skill {
  /**
   * 基础伤害
   *
   * @type {number}
   * @memberof Skill
   */
  basicDamage: number;
  /**
   * 技能系数
   *
   * @type {number}
   * @memberof Skill
   */
  coefficient: number;
  /**
   * 计算技能伤害
   * 
   * 技能伤害 = basicDamage + (ZongGongJi * coefficient)
   *
   * @param {number} ZongGongJi
   * @return {*}  {number}
   * @memberof Skill
   */
  calculatorSkillDamage(ZongGongJi: number): number;
  /**
   * 计算奇穴、秘籍、加成之后的伤害
   * 
   * 技能伤害 = 
   *
   * @return {*}  {number}
   * @memberof Skill
   */
  calculatorSkillDamageWithQiXueAndMiJi(QiXueAndMiJiCoefficient: number): number;
}