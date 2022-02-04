/**
 * 收益计算器
 * @Author: Harper.Gao
 * @Date: 2021-09-03 16:23:37
 * @Last Modified by: Harper.Gao
 * @Last Modified time: 2021-11-21 17:59:07
 */
import { BuffKeys, SupportContext } from '@types';
import {
  deepClone,
  increaseCriticalDamagePower,
  increaseSolarAttackPowerBase,
  increaseSolarCriticalStrike,
  increaseSolarOvercomePercent,
  increaseStrainPercent,
  increaseSurplusValue,
  makeSolarAttackPower,
} from '@componet/utils';
import DpsCore from '@packages/core/core';
import Support from '@packages/support/support';
import {
  CalculatorResult,
  createCalculator,
  CreateCalculatorOptions,
} from '@calculator/calculator';
import { pipe } from '@componet/compose';

/**
 * Constants ==============================================================
 * ========================================================================
 */

export type ProfitCore = {
  title: string; // 描述该模块收益
  multiple: number; // 放大倍数
  proportion: number; // 比例
  attrProfit: number; // 该属性单位收益
  pointProfit: number; // 单分收益
  baseDps?: number; // 原dps
  profitDps?: number; // 增益之后的dps
  stone: Map<number, number>; // 五行石对应的数值如  6级 16点元气
  profitWithStone: Map<number, number>; // 单孔收益
  increaseData: Partial<SupportContext>;
};

export type ProfitConstructorOptions = {
  core: DpsCore;
  support: Support;
  jx3DpsCoreOptions: CreateCalculatorOptions;
};

/**
 * Usage =================================================================
 * ========================================================================
 *
 * const pf = new Profit({core, support});
 * const result = pf.calculateProfit();
 */

class Profit {
  // 创建核心类的参数
  public core: DpsCore;
  public support: Support;
  public baseResult: CalculatorResult;
  public baseDps: number;
  public profitList: ProfitCore[] = [];
  public jx3DpsCoreOptions: CreateCalculatorOptions;
  constructor(profitOptions: ProfitConstructorOptions) {
    const { core, support, jx3DpsCoreOptions } = profitOptions;
    this.core = core;
    this.support = support;
    this.jx3DpsCoreOptions = jx3DpsCoreOptions;
    // 如果传入了基础result就使用传入的 否则计算基础result
    const calculatorResult = createCalculator(core, support, jx3DpsCoreOptions);
    this.baseResult = calculatorResult;
    this.baseDps = this.baseResult.dps;

    const SpunkProfit: ProfitCore = {
      title: '元气收益',
      multiple: 1000,
      // 325破防 = 73元气
      proportion: 325 / 73,
      attrProfit: 0,
      pointProfit: 0,
      increaseData: { [BuffKeys.Spunk]: 3 * 1000 },
      stone: new Map(),
      profitWithStone: new Map(),
    };
    // 设置五行石属性
    SpunkProfit.stone.set(6, 16);
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
      increaseData: { [BuffKeys.SolarAttackPowerBase]: (175 / 73) * 3 * 10 },
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
      increaseData: { [BuffKeys.SolarOvercome]: (325 * 3 * 100) / 73 },
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
      increaseData: { [BuffKeys.SolarCriticalStrike]: (325 * 3 * 1000) / 73 },
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
      increaseData: { [BuffKeys.SolarCriticalDamagePower]: (325 * 3 * 10) / 73 },
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
      increaseData: { [BuffKeys.Strain]: (325 * 3 * 10) / 73 },
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
      increaseData: { [BuffKeys.SurplusValue]: (325 * 3 * 10) / 73 },
      stone: new Map(),
      profitWithStone: new Map(),
    };
    SurplusValueProfit.stone.set(6, 72);
    SurplusValueProfit.stone.set(7, 96);
    SurplusValueProfit.stone.set(8, 124);
    this.profitList.push(SurplusValueProfit);
  }

  public calculatroProfitCore(item: ProfitCore): ProfitCore {
    /**
     * @todo 创建管道获取增加属性之后的core
     * @method increaseSolarCriticalStrike
     * @method increaseCriticalDamagePower
     * @method increaseSolarOvercomePercent
     * @method increaseStrainPercent
     * @method increaseSurplusValue
     * @method increaseSolarAttackPowerBase
     * @method makeSolarAttackPower
     */
    const getIncreasedCore = pipe(
      (pipeCore: DpsCore) => {
        if (item.increaseData.Spunk) {
          pipeCore.Spunk += item.increaseData.Spunk;
        }
        return pipeCore;
      },
      (pipeCore: DpsCore) => increaseSolarCriticalStrike(pipeCore, item.increaseData),
      (pipeCore: DpsCore) => increaseCriticalDamagePower(pipeCore, item.increaseData),
      (pipeCore: DpsCore) => increaseSolarOvercomePercent(pipeCore, item.increaseData),
      (pipeCore: DpsCore) => increaseStrainPercent(pipeCore, item.increaseData),
      (pipeCore: DpsCore) => increaseSurplusValue(pipeCore, item.increaseData),
      (pipeCore: DpsCore) => increaseSolarAttackPowerBase(pipeCore, item.increaseData),
      (pipeCore: DpsCore) => makeSolarAttackPower(pipeCore)
    );
    const increasedCore = getIncreasedCore(deepClone(this.core));
    const result = createCalculator(increasedCore, this.support, this.jx3DpsCoreOptions);
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

    /**
     * @todo 设置石头收益
     * 石头收益 = 单分收益 x 石头对应属性点
     */
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
