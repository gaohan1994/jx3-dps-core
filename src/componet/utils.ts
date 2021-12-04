import { Gain } from '@packages/gain/gain';
import DpsCore, { CoreEnum } from '@packages/core/core';
import { pipe } from './compose';

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

export const getYuanQiAttribute = (attributes: any) =>
  getTargetAttribute(attributes, CoreEnum.YuanQi);

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

export const makeYuanQiAttributeCombine = (prevAttributes: any, yuanQi: number) =>
  makeAttributeCombine(prevAttributes, { target: CoreEnum.YuanQi, value: yuanQi });

// 转换计算用的标准属性
const HUIXIN_LEVEL_COE = 357.375;
export const transferHuiXinLevelToHuiXin = (huiXinLevel: number): number =>
  huiXinLevel / HUIXIN_LEVEL_COE;

const HUIXIAO_LEVEL_COE = 125.0625;
export const transferHuiXiaoLevelToHuiXiao = (huiXiaoLevel: number): number =>
  huiXiaoLevel / HUIXIAO_LEVEL_COE;

const POFANG_COE = 357.375;
export const transferPoFangLevelToPoFang = (poFangLevel: number): number =>
  poFangLevel / POFANG_COE;

const WUSHUANG_COE = 344.5875;
export const transferWuShuangLevelToWuShuang = (wuShuangLevel: number): number =>
  wuShuangLevel / WUSHUANG_COE;

// 计算增加的属性
export const increaseHuiXin = (core: DpsCore, increasedAttributes: any) => {
  const { HuiXin = 0, HuiXinLevel = 0 } = increasedAttributes;
  const increasedHuiXin = HuiXin * 100;
  const increasedHuiXinFromLevel = transferHuiXinLevelToHuiXin(HuiXinLevel);

  const nextCore = deepClone(core);
  nextCore.HuiXin += increasedHuiXin + increasedHuiXinFromLevel;
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

export const increasePoFang = (core: DpsCore, increasedAttributes: any) => {
  const { PoFangLevel = 0, PoFangPercent = 0 } = increasedAttributes;
  const increasedPoFangFromLevel = transferPoFangLevelToPoFang(PoFangLevel);

  const nextCore = deepClone(core);
  nextCore.PoFang += increasedPoFangFromLevel;
  nextCore.PoFang = nextCore.PoFang * (1 + PoFangPercent);
  return nextCore;
};

export const increaseWuShuang = (core: DpsCore, increasedAttributes: any) => {
  const { WuShuang = 0, WuShuangLevel = 0 } = increasedAttributes;
  const increasedWuShuangFromLevel = transferWuShuangLevelToWuShuang(WuShuangLevel);

  const nextCore = deepClone(core);
  nextCore.WuShuang += WuShuang + increasedWuShuangFromLevel;
  return nextCore;
};

export const increasePoZhao = (core: DpsCore, increasedAttributes: any) => {
  const { PoZhao = 0 } = increasedAttributes;
  const nextCore = deepClone(core);
  nextCore.PoZhao += PoZhao;
  return nextCore;
};

export const increaseJiChuGongJi = (core: DpsCore, increasedAttributes: any) => {
  const { JiChuGongJi = 0, JiChuGongJiPercent = 0 } = increasedAttributes;

  const nextCore = deepClone(core);
  nextCore.JiChuGongJi += JiChuGongJi;
  nextCore.GongJiCoefficient += JiChuGongJiPercent;
  return nextCore;
};

export const increaseMainAttribute = (core: DpsCore, mainAttribute: number) => {
  const { mainCoeffiecient } = core;
  const { JiChuGongJi, PoFangLevel, HuiXinLevel } = mainCoeffiecient(mainAttribute);

  const getNextCore = pipe(
    () => increaseJiChuGongJi(core, { JiChuGongJi }),
    () => increasePoFang(core, { PoFangLevel }),
    () => increaseHuiXin(core, { HuiXinLevel })
  );
  const nextCore = getNextCore();
  return nextCore;
};

export const makeZongGongJi = (core: DpsCore) => {
  const nextCore = deepClone(core);
  const { mainCoeffiecient } = nextCore;

  const mainAttribute = getYuanQiAttribute(nextCore);
  const { ZongGongJi } = mainCoeffiecient(mainAttribute);

  const finalZongGongJi = ZongGongJi + nextCore.JiChuGongJi * nextCore.GongJiCoefficient;
  nextCore.ZongGongJi = finalZongGongJi;
  return nextCore;
};
