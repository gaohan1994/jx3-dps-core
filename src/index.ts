import { TargetListKeys, YiJinJingSkillEnchant, YiJinJingQiXueVersion } from '@types';

import Support, { SupportOptions } from '@packages/support/support';
import Profit from '@packages/profit/profit';

import DpsCore, { createDpsCore, CreateDpsCoreOptions, JiaSuValue } from '@packages/core/core';
import {
  createCalculator,
  CalculatorResult,
  CreateCalculatorOptions,
} from '@calculator/calculator';
import {
  BanquetList,
  FoodSupportList,
  FoodEnhanceList,
  DrugSupportList,
  DrugEnhanceList,
  HomeFoodList,
  WeaponEnchantList,
  HomeDrinkList,
  FestivalFoodList,
} from '@config/food.config';
import { WeaponList, EnChantsList, EffectSpineList, SetBonuseList } from '@config/item.config';
import { FormationList } from '@config/formation.config';
import { TeamSkillList, GroupSkillList } from '@config/skill.config';
import { GainModule } from '@packages/gain/index';
import { GainGroupTypes } from '@packages/gain/group';

export {
  createGain,
  gainDataToString,
  isGain,
  getGainName,
  selectGainByName,
  selectGainById,
} from '@packages/gain/gain';
export { createGainGroup, selectGainGroupByName, selectGainGroupById } from '@packages/gain/group';

type Jx3DpsCoreOptions = CreateCalculatorOptions;

/**
 * https://github.com/gaohan1994/jx3-dps-core/issues/19
 * execpt export only one major class to user
 *
 * ```javascript
 * import Jx3DpsCore from 'jx3-dps-core';
 *
 * const jdc = new Jx3DpsCore(
 *  dpsCoreOptions,
 *  supportOptions,
 *  extraOptions,
 * );
 *
 * // 计算dps
 * const result = jdc.calcuate();
 *
 * // 计算收益
 * const result = jdc.profit();
 * ```
 *
 * @class Jx3DpsCore
 */
class Jx3DpsCore {
  /**
   * 增益群组类型
   *
   * @static
   * @memberof Jx3DpsCore
   */
  static GainGroupTypes = GainGroupTypes;
  /**
   * @param YiJinJingQiXueVersion 奇穴
   * @param YiJinJingSkillEnchant 大附魔
   *
   * @static
   * @memberof Jx3DpsCore
   */
  static CalculatorVersions = {
    YiJinJingQiXueVersion: YiJinJingQiXueVersion,
    YiJinJingSkillEnchant: YiJinJingSkillEnchant,
  };
  /**
   * 加速档位
   *
   * @static
   * @memberof Jx3DpsCore
   */
  static JiaSuList = JiaSuValue;
  /**
   * 阵法列表
   *
   * @static
   * @memberof Jx3DpsCore
   */
  static Formations = FormationList;
  /**
   * 小队技能增益列表
   *
   * @static
   * @memberof Jx3DpsCore
   */
  static TeamSkills = TeamSkillList;
  /**
   * 团队技能增益列表
   *
   * @static
   * @memberof Jx3DpsCore
   */
  static GroupSkills = GroupSkillList;
  /**
   * 套装增益列表
   *
   * @static
   * @memberof Jx3DpsCore
   */
  static SetBonusesGain = SetBonuseList;
  /**
   * 武器列表
   *
   * @static
   * @memberof Jx3DpsCore
   */
  static Weapons = WeaponList;
  /**
   * 装备附魔增益列表
   *
   * @static
   * @memberof Jx3DpsCore
   */
  static Enchants = EnChantsList;
  /**
   * 特效腰椎
   *
   * @static
   * @memberof Jx3DpsCore
   */
  static EffectSpines = EffectSpineList;
  /**
   * 宴席增益列表
   *
   * @static
   * @memberof Jx3DpsCore
   */
  static Banquet = BanquetList;
  /**
   * 目标列表
   *
   * @static
   * @memberof Jx3DpsCore
   */
  static Target = TargetListKeys;
  /**
   * 小吃小药列表
   *
   * @static
   * @memberof Jx3DpsCore
   */
  static Food = {
    FoodEnhance: FoodEnhanceList,
    DrugEnhance: DrugEnhanceList,
    FoodSupport: FoodSupportList,
    DrugSupport: DrugSupportList,
    HomeFood: HomeFoodList,
    WeaponEnchant: WeaponEnchantList,
    HomeDrink: HomeDrinkList,
    FestivalFood: FestivalFoodList,
  };

  /**
   * 增益模块
   *
   * @type {GainModule}
   * @memberof Jx3DpsCore
   */
  public gainModule: GainModule;

  /**
   * 创建计算器的其他配置选项
   *
   * @private
   * @type {Jx3DpsCoreOptions}
   * @memberof Jx3DpsCore
   */
  public jx3DpsCoreOptions: Jx3DpsCoreOptions;
  /**
   * 计算器核心core
   *
   * @private
   * @type {DpsCore}
   * @memberof Jx3DpsCore
   */
  public core: DpsCore;
  /**
   * 计算器增益类support
   *
   * @private
   * @type {Support}
   * @memberof Jx3DpsCore
   */
  public support: Support;

  constructor(
    coreOptions: CreateDpsCoreOptions,
    supportOptions: SupportOptions,
    jx3DpsCoreOptions: Jx3DpsCoreOptions
  ) {
    this.core = createDpsCore(coreOptions);
    this.support = new Support(supportOptions);
    this.gainModule = new GainModule();
    this.jx3DpsCoreOptions = jx3DpsCoreOptions;
  }

  /**
   * 计算dps结果
   * @method calculate
   * @memberof Jx3DpsCore
   */
  public calculate = (): CalculatorResult => {
    return createCalculator(this.core, this.support, this.jx3DpsCoreOptions);
  };

  /**
   * 计算收益结果
   * @method profit
   * @memberof Jx3DpsCore
   */
  public profit = () => {
    const pf = new Profit({ core: this.core, support: this.support });
    return pf.calculatroProfit();
  };
}
export default Jx3DpsCore;
