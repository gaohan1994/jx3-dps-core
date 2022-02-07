import { Gain } from '@packages/gain/gain';
import DpsCore from '@packages/core/core';
import { pipe } from './compose';
import { CreateCalculatorOptions } from '@calculator/main-calculator';
import { YiJinJingQiXueVersion, YiJinJingSkillEnchant } from '@types';
import {
  CRITICALSTRIKEDAMAGEPOWER_TRANSFORM_COE,
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

export const transferSolarCriticalDamagePowerSolarCriticalDamagePowerPercent = (
  SolarCriticalDamagePower: number
): number => SolarCriticalDamagePower / CRITICALSTRIKEDAMAGEPOWER_TRANSFORM_COE;

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

export const increaseCriticalDamagePower = (core: DpsCore, increasedAttributes: any) => {
  const { SolarCriticalDamagePowerPercent = 0, SolarCriticalDamagePower = 0 } = increasedAttributes;
  const increasedSolarCriticalDamagePowerPercent = SolarCriticalDamagePowerPercent * 100;
  const increasedSolarCriticalDamagePowerPercentFromSolarCriticalDamagePower =
    transferSolarCriticalDamagePowerSolarCriticalDamagePowerPercent(SolarCriticalDamagePower);

  const nextCore = deepClone(core);
  nextCore.SolarCriticalDamagePowerPercent +=
    increasedSolarCriticalDamagePowerPercent +
    increasedSolarCriticalDamagePowerPercentFromSolarCriticalDamagePower;
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

export const increaseSurplusValue = (core: DpsCore, increasedAttributes: any) => {
  const { SurplusValue = 0 } = increasedAttributes;
  const nextCore = deepClone(core);
  nextCore.SurplusValue += SurplusValue;
  return nextCore;
};

export const increaseSolarAttackPowerBase = (core: DpsCore, increasedAttributes: any) => {
  const { SolarAttackPowerBase = 0, SolarAttackPowerBasePercent = 0 } = increasedAttributes;

  const nextCore = deepClone(core);
  nextCore.SolarAttackPowerBase += SolarAttackPowerBase;
  nextCore.SolarAttackPowerBasePercent += SolarAttackPowerBasePercent;
  return nextCore;
};

export const increaseSpunk = (core: DpsCore, spunk: number) => {
  const { mainCoeffiecient } = core;
  const { SolarAttackPowerBase, SolarOvercome, SolarCriticalStrike } = mainCoeffiecient(spunk);
  const getNextCore = pipe(
    (pipeCore: DpsCore) => increaseSolarAttackPowerBase(pipeCore, { SolarAttackPowerBase }),
    (pipeCore: DpsCore) => increaseSolarOvercomePercent(pipeCore, { SolarOvercome }),
    (pipeCore: DpsCore) => increaseSolarCriticalStrike(pipeCore, { SolarCriticalStrike })
  );
  const nextCore = getNextCore(core);
  return nextCore;
};

export const makeSolarAttackPower = (core: DpsCore) => {
  const nextCore = deepClone(core);
  const { mainCoeffiecient } = nextCore;

  const spunk = getSpunkAttribute(nextCore);
  const { SolarAttackPower } = mainCoeffiecient(spunk);

  const finalSolarAttackPower =
    SolarAttackPower + nextCore.SolarAttackPowerBase * nextCore.SolarAttackPowerBasePercent;
  nextCore.SolarAttackPower = finalSolarAttackPower;
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

/**
 * 目前只用三生所以直接返回 true
 * @returns boolean
 */
export const isSanShengVersion = (payload: CreateCalculatorOptions): boolean => {
  return true;
};
