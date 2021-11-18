/**
 * @Author: centerm.gaohan 
 * @Date: 2021-10-01 00:37:06 
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-11-18 18:22:39
 */
import Skill, { createSkillFactory } from "../packages/core/skill_new";
import { addition, multiplication } from "../componet";
import { JiaSuValue, YiJinJingValues } from "../types";
import DpsCore from "../packages/core/core_new";
import { Support } from "../packages/support";
import { createMiJi, IgnoreDefenceMiJi } from "../packages/core/miji";

// 技能名称
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
  EnChantHand = 'EnChantHand',
  EnChantShoe = 'EnChantShoe',
}
type CalculatorConfig = {
  skills: Skill[];
};

type SkillAttributeConfig<T = Array<number>> = T;

type SkillBeforeCreated = Array<number> | Function;

type SkillTimesConfig<T = Array<number>> = { [name: string]: SkillAttributeConfig<T> };

type SkillTimes = { [key in SkillNames]: number };

// 普通版本技能数
const normalSkillTimes: SkillTimesConfig<SkillBeforeCreated> = {
  [SkillNames.PoZhao]: [30, 30, 0],
  [SkillNames.NaYunShi]: [26 * 1.5, 26 * 1.5 + 1.5, 0],
  [SkillNames.WeiTuoXianChu]: [38 - (26 * 0.5), 38 - (26 * 0.5) + 1.5, 2.5],
  [SkillNames.HengSaoLiuHe]: [32, 32, 0],
  [SkillNames.HengSaoLiuHeDot]: [155, 160, 0],
  [SkillNames.ShouQueShi]: [45, 45, 0.5],
  [SkillNames.PuDuSiFang]: [45, 49, -3],
  [SkillNames.TiHuGuanDing]: [22, 22, 0],
  [SkillNames.LiuHeGun]: [172, 172, 0],
  [SkillNames.EnChantHand]: [30, 30, 0],
  [SkillNames.EnChantShoe]: [15, 15, 0],
  [SkillNames.SuoDi]: suodiSkillTimes,
  [SkillNames.FoGuo]: fuoguoSkillTimes,
  [SkillNames.XiangMo]: xiangmoSkillTimes,
};

const immortalSkillTimes: SkillTimesConfig<SkillBeforeCreated> = {
  [SkillNames.PoZhao]: [30, 31, 0],
  [SkillNames.NaYunShi]: [33 * 1.5, 33 * 1.5 + 1.5, 0],
  [SkillNames.WeiTuoXianChu]: [39 - (33 * 0.5), 39 - (33 * 0.5) + 1.5, 2.5],
  [SkillNames.HengSaoLiuHe]: [31, 31, 0],
  [SkillNames.HengSaoLiuHeDot]: [155, 160, 0],
  [SkillNames.ShouQueShi]: [45, 45, 0.5],
  [SkillNames.PuDuSiFang]: [45, 49, -3],
  [SkillNames.TiHuGuanDing]: [22, 22, 0],
  [SkillNames.LiuHeGun]: [172, 172, 0],
  [SkillNames.EnChantHand]: [30, 30, 0],
  [SkillNames.EnChantShoe]: [15, 15, 0],
  [SkillNames.SuoDi]: suodiSkillTimes,
  [SkillNames.FoGuo]: fuoguoSkillTimes,
  [SkillNames.XiangMo]: xiangmoSkillTimes,
};

// 缩地技能公式
function suodiSkillTimes({ NaYunShi, WeiTuoXianChu }: SkillTimes): number {
  return (addition(NaYunShi, WeiTuoXianChu) + 15) / 2;
}

// 佛果技能次数公式
function fuoguoSkillTimes({ NaYunShi, WeiTuoXianChu, PuDuSiFang, ShouQueShi, HengSaoLiuHe, TiHuGuanDing }: SkillTimes): number {
  return multiplication(addition(NaYunShi, WeiTuoXianChu, PuDuSiFang, ShouQueShi, HengSaoLiuHe, TiHuGuanDing), 0.3, 0.9);
}

// 降魔技能次数计算公式
function xiangmoSkillTimes({ NaYunShi, WeiTuoXianChu }: SkillTimesConfig): number {
  return addition(NaYunShi, WeiTuoXianChu);
}

function skillAttributeIsNumberType(data: SkillBeforeCreated): data is Array<number> {
  return Array.isArray(data);
}

function skillAttributeIsFunctionType(data: SkillBeforeCreated): data is Function {
  return typeof data === 'function';
}

/**
 * 根据传入的 version 生成对应的 config
 * 
 * @param {YiJinJingValues} version 
 */
export const createConfig = function createSkillTimesConfig(
  core: DpsCore,
  support: Support,
  // 技能次数版本
  version: YiJinJingValues,
) {
  const JiaSu = core.JiaSu;
  // 是否含有橙武
  const hasCw = support.hasCw();
  // 橙武触发次数
  const cwTimes = support.CWTimes;
  const target = support.target;
  /**
   * 计算器配置文件
   */
  let calculatorConfig: CalculatorConfig = {
    skills: [],
  };

  /**
   * 技能次数配置文件
   */
  let skillTimes: SkillTimes = {
    PoZhao: 0,
    NaYunShi: 0,
    WeiTuoXianChu: 0,
    HengSaoLiuHe: 0,
    HengSaoLiuHeDot: 0,
    ShouQueShi: 0,
    PuDuSiFang: 0,
    TiHuGuanDing: 0,
    LiuHeGun: 0,
    EnChantHand: 0,
    EnChantShoe: 0,
    SuoDi: 0,
    FoGuo: 0,
    XiangMo: 0,
  };

  let config: SkillTimesConfig;

  if (version === YiJinJingValues.Immortal) {
    config = immortalSkillTimes as any;
  } else {
    config = normalSkillTimes as any;
  }

  /**
   * 根据加速段数和cw返回技能次数
   *
   * @param {JiaSuValue} JiaSu
   */
  function calculatorSillTimesByNumberConfigWithJiaSuAndCw(skillName: SkillNames): void {
    // 根据段位选择技能数
    const token = JiaSu === JiaSuValue.YiDuanJiaSu ? 0 : 1;
    const currentSkillConfig = config[skillName];

    function updateSkillTimesByCw(): void {
      // 更新技能次数如果有橙武 橙武次数 * 单次橙武影响的技能数
      skillTimes[skillName] += (currentSkillConfig[2] * cwTimes);
    }

    skillTimes[skillName] = currentSkillConfig[token];

    if (hasCw) {
      updateSkillTimesByCw();
    }
  }

  /**
   * 根据回调返回技能次数
   */
  function calculatorSillTimesByCallback(skillName: SkillNames): void {
    const currentCallback: any = config[skillName];
    skillTimes[skillName] = currentCallback(skillTimes);
  }

  /**
   * 首先拿到所有的keys
   */
  let keys = Object.keys(config) as SkillNames[];

  /**
   * 函数类型的技能配置文件的队列
   */
  let quene = [];

  /**
   * 第一遍遍历
   * 遍历所有非函数类型的技能配置
   */
  for (let i = 0; i < keys.length;) {
    let currentKey = keys.shift();
    if (skillAttributeIsFunctionType(config[currentKey])) {
      /**
       * 如果是技能类型的配置则插入到队列中去等待第二次遍历
       */
      quene.push(currentKey);
      continue;
    }

    calculatorSillTimesByNumberConfigWithJiaSuAndCw(currentKey);
  }

  /**
   * 第二次遍历 遍历函数类型的技能配置文件
   */
  while (quene.length > 0) {
    const currentKey = quene.shift();
    calculatorSillTimesByCallback(currentKey);
  }

  try {
    const skillFactory = createSkillFactory(core, support);

    const hasSkillSetBonuese = support.hasSkillSetBonuese();
    /**
     * @param BaseCoefficient 基础系数
     * @param ErYeYiYuanCoefficient 二业依缘系数
     * @param skillSetBonuseCoefficient 套装
     * @param ZhongChenCoefficient 众嗔系数（乘法）
     * @param MingFaCoefficient 明发
     * @param FoGuoCoefficient 佛果
     */
    const BaseCoefficient = 1;
    const ErYeYiYuanCoefficient = 0.0996;
    const skillSetBonuseCoefficient = hasSkillSetBonuese ? 0.0996 : 0;
    const ZhongChenCoefficient = 1.2;
    const MingFaCoefficient = 1.11;
    const MiJiCoefficient = 0.12;
    const FoGuoCoefficient = 0.3 * 0.3;

    const ignoreMiJi = [
      createMiJi('', 0.6, IgnoreDefenceMiJi)
    ];
    const PoZhao = skillFactory({
      skillName: SkillNames.PoZhao,
      skillTitle: '破招',
      skillTimes: skillTimes[SkillNames.PoZhao],
      basicDamage: core.PoZhao,
      basicDamageCoefficient: 15.2288,
      damageBonuesCoefficient: BaseCoefficient + ErYeYiYuanCoefficient,
    });

    const LiuHeGun = skillFactory({
      skillName: SkillNames.LiuHeGun,
      skillTitle: '六合棍',
      skillTimes: skillTimes[SkillNames.LiuHeGun],
      basicDamage: 0,
      skillBasicNumber: core.WuQiShangHai,
      basicDamageCoefficient: 0,
      poFangCoefficient: 1,
    });

    const WeiTuoXianChu = skillFactory({
      skillName: SkillNames.WeiTuoXianChu,
      skillTitle: '韦陀献杵',
      skillTimes: skillTimes[SkillNames.WeiTuoXianChu],
      skillBasicNumber: 179,
      basicDamageCoefficient: 1.66,
      damageBonuesCoefficient: (BaseCoefficient + MiJiCoefficient + ErYeYiYuanCoefficient + skillSetBonuseCoefficient + FoGuoCoefficient) * ZhongChenCoefficient * MingFaCoefficient,
      miJi: ignoreMiJi,
    });

    const NaYunShi = skillFactory({
      skillName: SkillNames.NaYunShi,
      skillTitle: '拿云式',
      skillTimes: skillTimes[SkillNames.NaYunShi],
      skillBasicNumber: 258.5,
      basicDamageCoefficient: 2,
      damageBonuesCoefficient: (BaseCoefficient + MiJiCoefficient + ErYeYiYuanCoefficient + skillSetBonuseCoefficient + FoGuoCoefficient) * ZhongChenCoefficient * MingFaCoefficient,
      miJi: ignoreMiJi,
    });

    const HengSaoLiuHe = skillFactory({
      skillName: SkillNames.HengSaoLiuHe,
      skillTitle: '横扫六合',
      skillTimes: skillTimes[SkillNames.HengSaoLiuHe],
      skillBasicNumber: 75,
      basicDamageCoefficient: 0.58,
      damageBonuesCoefficient: (BaseCoefficient + ErYeYiYuanCoefficient + FoGuoCoefficient + 0.5) * 2 * MingFaCoefficient,
      huiXinHuiXiaoCoefficient: (core.HuiXin / 100 + 0.1) * (core.HuiXiao / 100 + 0.1) + 1 - (core.HuiXin / 100 + 0.1)
    });

    const cwBuff = hasCw ? 0.0996 / 2 : 0;

    const ShouQueShi = skillFactory({
      skillName: SkillNames.ShouQueShi,
      skillTitle: '守缺式',
      skillTimes: skillTimes[SkillNames.ShouQueShi],
      skillBasicNumber: 144.5,
      basicDamageCoefficient: 1.36,
      damageBonuesCoefficient: (BaseCoefficient + 0.12 + ErYeYiYuanCoefficient + cwBuff + FoGuoCoefficient) * ZhongChenCoefficient * MingFaCoefficient,
      huiXinHuiXiaoCoefficient: (core.HuiXin / 100 + 0.04 + 0.1) * (core.HuiXiao / 100 + 0.1) + 1 - (core.HuiXin / 100 + 0.1 + 0.04),
      miJi: ignoreMiJi,
    });

    const HengSaoLiuHeDot = skillFactory({
      skillName: SkillNames.HengSaoLiuHeDot,
      skillTitle: '横扫DOT',
      skillTimes: skillTimes[SkillNames.HengSaoLiuHeDot],
      skillBasicNumber: 45,
      basicDamageCoefficient: 0.083,
      damageBonuesCoefficient: (BaseCoefficient + FoGuoCoefficient + ErYeYiYuanCoefficient) * 2 * 3 * MingFaCoefficient,
      huiXinHuiXiaoCoefficient: (core.HuiXin / 100 + 0.1) * (core.HuiXiao / 100 + 0.1) + 1 - (core.HuiXin / 100 + 0.1)
    });

    const PuDuSiFang = skillFactory({
      skillName: SkillNames.PuDuSiFang,
      skillTitle: '普渡四方',
      skillTimes: skillTimes[SkillNames.PuDuSiFang],
      skillBasicNumber: 163.5,
      basicDamageCoefficient: 0.92,
      damageBonuesCoefficient: (BaseCoefficient + 0.0996 + FoGuoCoefficient + ErYeYiYuanCoefficient + cwBuff) * MingFaCoefficient,
    });

    const SuoDi = skillFactory({
      skillName: SkillNames.SuoDi,
      skillTitle: '缩地',
      skillTimes: skillTimes[SkillNames.SuoDi],
      skillBasicNumber: 407.5,
      basicDamageCoefficient: 1.25,
      damageBonuesCoefficient: (BaseCoefficient + ErYeYiYuanCoefficient) * MingFaCoefficient,
    });

    const TiHuGuanDing = skillFactory({
      skillName: SkillNames.TiHuGuanDing,
      skillTitle: '醍醐灌顶',
      skillTimes: skillTimes[SkillNames.TiHuGuanDing],
      skillBasicNumber: 407.5,
      basicDamageCoefficient: 1.92185,
      damageBonuesCoefficient: (BaseCoefficient + ErYeYiYuanCoefficient),
    });
    const FoGuo = skillFactory({
      skillName: SkillNames.FoGuo,
      skillTitle: '佛果',
      skillTimes: skillTimes[SkillNames.FoGuo],
      skillBasicNumber: 127.5,
      basicDamageCoefficient: 0.697922,
      damageBonuesCoefficient: BaseCoefficient + 0.3 + ErYeYiYuanCoefficient,
    });

    const EnChantHand = skillFactory({
      skillName: SkillNames.EnChantHand,
      skillTitle: '附魔手',
      skillTimes: skillTimes[SkillNames.EnChantHand],
      skillBasicNumber: 0,
      basicDamageCoefficient: 0.95,
      damageBonuesCoefficient: (BaseCoefficient + ErYeYiYuanCoefficient) * 0.4,
    });

    const EnChantShoe = skillFactory({
      skillName: SkillNames.EnChantShoe,
      skillTitle: '附魔脚',
      skillTimes: skillTimes[SkillNames.EnChantShoe],
      skillBasicNumber: 0,
      basicDamageCoefficient: 0.38125,
      damageBonuesCoefficient: (BaseCoefficient + ErYeYiYuanCoefficient)
    });

    const WeiTuoSubTotal = WeiTuoXianChu.subTotal;
    const NaYunShiSubTotal = NaYunShi.subTotal;

    const XiangMo = skillFactory({
      skillName: SkillNames.XiangMo,
      skillTitle: '降魔',
      skillTimes: skillTimes[SkillNames.XiangMo],
      skillBasicNumber: 0,
      basicDamage: (WeiTuoSubTotal + NaYunShiSubTotal) / 4 / 1.2 / skillTimes[SkillNames.XiangMo],
      poFangCoefficient: 1,
      wuShuangCoefficient: 1,
      huiXinHuiXiaoCoefficient: 1,
      targetDamageCoefficient: 1,
    });

    const skills = [ShouQueShi, FoGuo, LiuHeGun, PoZhao, WeiTuoXianChu, NaYunShi, HengSaoLiuHe, HengSaoLiuHeDot, PuDuSiFang, SuoDi, TiHuGuanDing, EnChantHand, EnChantShoe, XiangMo];
    calculatorConfig.skills = skills;
  } catch (error) {
    console.warn('初始化技能配置时出错', error);
  } finally {
    return calculatorConfig;
  }
}