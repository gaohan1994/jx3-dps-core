/**
 * 收益计算器
 * @Author: Harper.Gao
 * @Date: 2021-09-03 16:23:37
 * @Last Modified by: Harper.Gao
 * @Last Modified time: 2021-11-21 17:59:07
 */
import { BuffKeys } from '@types';
import { deepClone } from '@componet/utils';
import DpsCore from '@packages/core/core';
import Support, { copySupport } from '@packages/support/support';
import { CalculatorResult, createCalculator } from '@calculator/calculator';
import { Gain } from '@packages/gain/gain';

/**
 * Constants ==============================================================
 * ========================================================================
 */

export type ProfitCore = {
  title: string; // 描述该模块收益
  gain: Gain; // 该属性具体的增益
  multiple: number; // 放大倍数
  proportion: number; // 比例
  attrProfit: number; // 该属性单位收益
  pointProfit: number; // 单分收益
  baseDps?: number; // 原dps
  profitDps?: number; // 增益之后的dps
  stone: Map<number, number>; // 五行石对应的数值如  6级 16点元气
  profitWithStone: Map<number, number>; // 单孔收益
};

export type ProfitConstructorOptions = {
  core: DpsCore;
  support: Support;
  baseResult?: CalculatorResult;
};

/**
 * Usage =================================================================
 * ========================================================================
 *
 * const profit = new Profit(core, support, version, result);
 * const profitList = profit.calculatroProfit();
 */

class Profit {
  // 创建核心类的参数
  public core: DpsCore;
  public support: Support;
  public baseResult: CalculatorResult;
  public baseDps: number;
  public profitList: ProfitCore[] = [];
  constructor(profitOptions: ProfitConstructorOptions) {
    const { core, support, baseResult } = profitOptions;
    this.core = core;
    this.support = support;
    // 如果传入了基础result就使用传入的 否则计算基础result
    const calculatorResult = baseResult ? deepClone(baseResult) : createCalculator(core, support);
    this.baseResult = calculatorResult;
    this.baseDps = this.baseResult.dps;

    const SpunkProfit: ProfitCore = {
      title: '元气收益',
      multiple: 10,
      // 325破防 = 73元气
      proportion: 325 / 73,
      attrProfit: 0,
      pointProfit: 0,
      gain: {
        name: 'Profit-YuanQi',
        data: [{ gainTarget: BuffKeys.Spunk, value: 3 * 10, coverage: 1 }],
      },
      stone: new Map(),
      profitWithStone: new Map(),
    };
    // 设置五行石属性
    SpunkProfit.stone.set(6, 13);
    SpunkProfit.stone.set(7, 21);
    SpunkProfit.stone.set(8, 27);
    this.profitList.push(SpunkProfit);

    const SolarAttackPowerBaseProfit: ProfitCore = {
      title: '基础攻击收益',
      multiple: 10,
      // 325破防 = 175基础攻击
      proportion: 325 / 175,
      attrProfit: 0,
      pointProfit: 0,
      gain: {
        name: 'Profit-SolarAttackPowerBase',
        data: [
          { gainTarget: BuffKeys.SolarAttackPowerBase, value: (175 / 73) * 3 * 10, coverage: 1 },
        ],
      },
      stone: new Map(),
      profitWithStone: new Map(),
    };
    // 设置五行石属性
    SolarAttackPowerBaseProfit.stone.set(6, 38);
    SolarAttackPowerBaseProfit.stone.set(7, 51);
    SolarAttackPowerBaseProfit.stone.set(8, 66);
    this.profitList.push(SolarAttackPowerBaseProfit);

    const SolarOvercomeProfit: ProfitCore = {
      title: '破防收益',
      multiple: 100,
      proportion: 1,
      attrProfit: 0,
      pointProfit: 0,
      gain: {
        name: 'Profit-SolarOvercomePercent',
        data: [{ gainTarget: BuffKeys.SolarOvercome, value: (325 * 3 * 100) / 73, coverage: 1 }],
      },
      stone: new Map(),
      profitWithStone: new Map(),
    };
    // 设置五行石属性
    SolarOvercomeProfit.stone.set(6, 72);
    SolarOvercomeProfit.stone.set(7, 96);
    SolarOvercomeProfit.stone.set(8, 124);
    this.profitList.push(SolarOvercomeProfit);

    const CriticalStrikeProfit: ProfitCore = {
      title: '会心收益',
      multiple: 1000,
      proportion: 1,
      attrProfit: 0,
      pointProfit: 0,
      gain: {
        name: 'Profit-CriticalStrike',
        data: [
          { gainTarget: BuffKeys.SolarCriticalStrike, value: (325 * 3 * 1000) / 73, coverage: 1 },
        ],
      },
      stone: new Map(),
      profitWithStone: new Map(),
    };
    CriticalStrikeProfit.stone.set(6, 72);
    CriticalStrikeProfit.stone.set(7, 96);
    CriticalStrikeProfit.stone.set(8, 124);
    this.profitList.push(CriticalStrikeProfit);

    const CriticalDamageProfit: ProfitCore = {
      title: '会效收益',
      multiple: 10,
      proportion: 1,
      attrProfit: 0,
      pointProfit: 0,
      gain: {
        name: 'Profit-SolarCriticalDamagePowerPercent',
        data: [
          {
            gainTarget: BuffKeys.SolarCriticalDamagePower,
            value: (325 * 3 * 10) / 73,
            coverage: 1,
          },
        ],
      },
      stone: new Map(),
      profitWithStone: new Map(),
    };
    CriticalDamageProfit.stone.set(6, 72);
    CriticalDamageProfit.stone.set(7, 96);
    CriticalDamageProfit.stone.set(8, 124);
    this.profitList.push(CriticalDamageProfit);

    const StrainProfit: ProfitCore = {
      title: '无双收益',
      multiple: 10,
      proportion: 1,
      attrProfit: 0,
      pointProfit: 0,
      gain: {
        name: 'Profit-Strain',
        data: [{ gainTarget: BuffKeys.Strain, value: (325 * 3 * 10) / 73, coverage: 1 }],
      },
      stone: new Map(),
      profitWithStone: new Map(),
    };
    StrainProfit.stone.set(6, 72);
    StrainProfit.stone.set(7, 96);
    StrainProfit.stone.set(8, 124);
    this.profitList.push(StrainProfit);

    const SurplusValueProfit: ProfitCore = {
      title: '破招收益',
      multiple: 10,
      proportion: 1,
      attrProfit: 0,
      pointProfit: 0,
      gain: {
        name: 'Profit-SurplusValue',
        data: [{ gainTarget: BuffKeys.SurplusValue, value: (325 * 3 * 10) / 73, coverage: 1 }],
      },
      stone: new Map(),
      profitWithStone: new Map(),
    };
    SurplusValueProfit.stone.set(6, 72);
    SurplusValueProfit.stone.set(7, 96);
    SurplusValueProfit.stone.set(8, 124);
    this.profitList.push(SurplusValueProfit);
  }

  public calculatroProfitCore(item: ProfitCore): ProfitCore {
    // 增加计算收益的属性
    const currentProfitSupport = copySupport(this.support);
    currentProfitSupport.use(item.gain);

    const result = createCalculator(this.core, currentProfitSupport);

    // 计算单位收益
    const attrProfit = ((result.dps / this.baseDps - 1) * 100) / item.multiple;
    // 计算单分收益
    const pointProfit = attrProfit * item.proportion;

    const currentProfitCore: ProfitCore = {
      ...item,
      attrProfit,
      pointProfit,
      baseDps: this.baseDps,
      profitDps: result.dps,
    };

    // 设置石头收益
    currentProfitCore.stone.forEach((value, key) => {
      currentProfitCore.profitWithStone.set(key, currentProfitCore.pointProfit * value);
    });

    return currentProfitCore;
  }

  // 计算收益
  public calculatroProfit(): ProfitCore[] {
    const profitList: ProfitCore[] = [];

    // 遍历每一项收益并计算各收益的值
    this.profitList.forEach(item => {
      const result = this.calculatroProfitCore(item);
      profitList.push(result);
    });

    return profitList;
  }
}

export default Profit;
