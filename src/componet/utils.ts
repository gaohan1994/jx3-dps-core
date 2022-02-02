import { Gain } from '@packages/gain/gain';
import DpsCore from '@packages/core/core';
import { pipe } from './compose';
import { CreateCalculatorOptions } from '@calculator/calculator';
import { YiJinJingQiXueVersion, YiJinJingSkillEnchant } from '@types';
import {
  CRITICALSTRIKE_TRANSFORM_COE,
  SOLAROVERCOME_TRANSFORM_COE,
  STRAIN_TRANSFORM_COE,
} from '@config/constants';

export function deepClone<T>(target: T): T {
  if (typeof target !== 'object') return;
  const newObj: any = target instanceof Array ? [] : {};
  for (const key in target) {
    if (target.hasOwnProperty(key)) {
      newObj[key] = typeof target[key] === 'object' ? deepClone(target[key]) : target[key];
    }
  }
  return newObj;
}

// 执行原函数之前先执行beforeFunction
export const before = (originFunction: any, beforeFunction: any): any => {
  return function (...rest: any[]) {
    beforeFunction.apply(this, rest);
    return originFunction.apply(this, rest);
  };
};

// 执行原函数之后执行afterFunction
export const after = (originFunction: any, afterFunction: any): any => {
  return function (...rest: any[]) {
    const result = originFunction.apply(this, rest);
    afterFunction.apply(this, rest);
    return result;
  };
};

// 执行原函数之后以originFunction的result作为入参执行afterFunction
export const afterResult = (originFunction: any, afterFunction: any): any => {
  return function (...rest: any[]) {
    const result = originFunction.apply(this, rest);
    afterFunction.call(this, result);
    return result;
  };
};

export function isSingleGain(data: Gain[] | Gain): data is Gain {
  return !Array.isArray(data) && typeof data.name === 'string';
}

export const mergeGainList = (...restGainList: Gain[]): Gain[] => {
  const nextGainList: Gain[] = [];
  restGainList.reduce((prevGainList, gainList) => {
    const currentGainList: Gain[] = !isSingleGain(gainList) ? gainList : [gainList];
    return prevGainList.concat(currentGainList);
  }, nextGainList);

  return nextGainList;
};

export const mergeAttribute = function <T>(attribute1: T, attribute2: T) {
  for (const key in attribute2) {
    if (attribute1.hasOwnProperty(key)) {
      attribute1[key] += attribute2[key] as any;
    }
  }
};

export const getTargetAttribute = (attributes: any, target: string): number => {
  return attributes[target] ?? 0;
};

export const getSpunkAttribute = (attributes: any) => getTargetAttribute(attributes, 'Spunk');

type CombineAttribute = {
  target: string;
  value: number;
};
// 增加属性并返回增加属性之后的新的值
export const makeAttributeCombine = (prevAttributes: any, combineAttribute: CombineAttribute) => {
  const { target, value } = combineAttribute;
  const nextAttributes = deepClone(prevAttributes);
  nextAttributes[target] = nextAttributes[target] + value;
  return nextAttributes;
};

export const makeSpunkAttributeCombine = (prevAttributes: any, Spunk: number) =>
  makeAttributeCombine(prevAttributes, { target: 'Spunk', value: Spunk });

// 转换计算用的标准属性
export const transferSolarCriticalStrikeToSolarCriticalStrikeRate = (
  SolarCriticalStrike: number
): number => SolarCriticalStrike / CRITICALSTRIKE_TRANSFORM_COE;

const HUIXIAO_LEVEL_COE = 125.0625;
export const transferHuiXiaoLevelToHuiXiao = (huiXiaoLevel: number): number =>
  huiXiaoLevel / HUIXIAO_LEVEL_COE;

export const transferSolarOvercomeToSolarOvercomePercent = (SolarOvercome: number): number =>
  SolarOvercome / SOLAROVERCOME_TRANSFORM_COE;

export const transferStrainToStrainPercent = (Strain: number): number =>
  Strain / STRAIN_TRANSFORM_COE;

// 计算增加的属性
export const increaseSolarCriticalStrike = (core: DpsCore, increasedAttributes: any) => {
  const { SolarCriticalStrike = 0, SolarCriticalStrikeRate = 0 } = increasedAttributes;
  const increasedSolarCriticalStrikeRate = SolarCriticalStrikeRate * 100;
  const increasedSolarCriticalStrikeRateFromSolarCriticalStrike =
    transferSolarCriticalStrikeToSolarCriticalStrikeRate(SolarCriticalStrike);

  const nextCore = deepClone(core);
  nextCore.SolarCriticalStrikeRate +=
    increasedSolarCriticalStrikeRate + increasedSolarCriticalStrikeRateFromSolarCriticalStrike;
  return nextCore;
};

export const increaseHuiXiao = (core: DpsCore, increasedAttributes: any) => {
  const { HuiXiao = 0, HuiXiaoLevel = 0 } = increasedAttributes;
  const increasedHuiXiao = HuiXiao * 100;
  const increasedHuiXiaoFromLevel = transferHuiXiaoLevelToHuiXiao(HuiXiaoLevel);

  const nextCore = deepClone(core);
  nextCore.HuiXiao += increasedHuiXiao + increasedHuiXiaoFromLevel;
  return nextCore;
};

export const increaseSolarOvercomePercent = (core: DpsCore, increasedAttributes: any) => {
  const { SolarOvercome = 0, SolarOvercomePercent = 0 } = increasedAttributes;
  const increasedSolarOvercomePercentFromSolarOvercome =
    transferSolarOvercomeToSolarOvercomePercent(SolarOvercome);

  const nextCore = deepClone(core);
  nextCore.SolarOvercomePercent += increasedSolarOvercomePercentFromSolarOvercome;
  nextCore.SolarOvercomePercent = nextCore.SolarOvercomePercent * (1 + SolarOvercomePercent);
  return nextCore;
};

export const increaseStrainPercent = (core: DpsCore, increasedAttributes: any) => {
  const { StrainPercent = 0, Strain = 0 } = increasedAttributes;
  const increasedStrainPercentFromStrain = transferStrainToStrainPercent(Strain);

  const nextCore = deepClone(core);
  nextCore.StrainPercent += StrainPercent + increasedStrainPercentFromStrain;
  return nextCore;
};

export const increasePoZhao = (core: DpsCore, increasedAttributes: any) => {
  const { PoZhao = 0 } = increasedAttributes;
  const nextCore = deepClone(core);
  nextCore.PoZhao += PoZhao;
  return nextCore;
};

export const increaseSolarAttackPowerBase = (core: DpsCore, increasedAttributes: any) => {
  const { SolarAttackPowerBase = 0, SolarAttackPowerBasePercent = 0 } = increasedAttributes;

  const nextCore = deepClone(core);
  nextCore.SolarAttackPowerBase += SolarAttackPowerBase;
  nextCore.GongJiCoefficient += SolarAttackPowerBasePercent;
  return nextCore;
};

export const increaseMainAttribute = (core: DpsCore, mainAttribute: number) => {
  const { mainCoeffiecient } = core;
  const { SolarAttackPowerBase, SolarOvercome, SolarCriticalStrike } =
    mainCoeffiecient(mainAttribute);

  const getNextCore = pipe(
    () => increaseSolarAttackPowerBase(core, { SolarAttackPowerBase }),
    () => increaseSolarOvercomePercent(core, { SolarOvercome }),
    () => increaseSolarCriticalStrike(core, { SolarCriticalStrike })
  );
  const nextCore = getNextCore();
  return nextCore;
};

export const makeZongGongJi = (core: DpsCore) => {
  const nextCore = deepClone(core);
  const { mainCoeffiecient } = nextCore;

  const mainAttribute = getSpunkAttribute(nextCore);
  const { ZongGongJi } = mainCoeffiecient(mainAttribute);

  const finalZongGongJi = ZongGongJi + nextCore.SolarAttackPowerBase * nextCore.GongJiCoefficient;
  nextCore.ZongGongJi = finalZongGongJi;
  return nextCore;
};

export const isJinGangRiLunEnchat = (payload: CreateCalculatorOptions): boolean => {
  if (
    payload &&
    payload.skillEnchant &&
    payload.skillEnchant === YiJinJingSkillEnchant.JinGangRiLun
  ) {
    return true;
  }
  return false;
};

export const isXinZhengVersion = (payload: CreateCalculatorOptions): boolean => {
  if (payload && payload.qiXueVersion && payload.qiXueVersion === YiJinJingQiXueVersion.XinZheng) {
    return true;
  }
  return false;
};
