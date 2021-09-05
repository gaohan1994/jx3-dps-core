import DpsCore from './packages/core/core';
import Support from './packages/support/support';
import { Profit } from './packages/profit';
import { YiJinJing } from './calculator';
import {
  FormationValue,
  TeamSkillValue,
  GroupSkillBuffList,
  SetBonuse,
  WeaponValue,
  EnChantsList,
  EffectSpineList,
  BanquetList,
  FoodEnhanceList,
  DrugEnhanceList,
  FoodSupportList,
  DrugSupportList,
  TargetListKeys,
  JiaSuValue,
} from './types';

const CoreHelper = {
  /**
   * 加速列表
   * @param JiaSuList
   */
  JiaSuList: {
    ...JiaSuValue
  },
  /**
   * 所有阵法
   * @param Formations
   */
  Formations: {
    ...FormationValue
  },

  /**
   * 技能增益
   * @param TeamSkills
   */
  TeamSkills: {
    ...TeamSkillValue
  },

  /**
   * 团队技能增益
   * @param GroupSkills
   */
  GroupSkills: {
    ...GroupSkillBuffList
  },

  /**
   * 套装增益
   * @parma SetBonusesGain
   */
  SetBonusesGain: {
    ...SetBonuse
  },

  /**
   * 武器增益列表
   * @param WeaponValue
   */
  Weapons: {
    ...WeaponValue
  },

  /**
   * @time 08-24
   * 附魔增益列表
   * @param Enchants
   */
  Enchants: {
    ...EnChantsList
  },

  /**
   * @time 08-24
   * 新增特效腰椎增益列表
   * @param EffectSpines
   */
  EffectSpines: {
    ...EffectSpineList
  },

  /**
   * @time 08-24
   * 新增 宴席增益列表
   * @param Banquet
   */
  Banquet: {
    ...BanquetList
  },

  /**
   * @time 08-24
   * 新增 小吃增益列表
   * @param Food
   */
  Food: {
    FoodEnhance: {
      ...FoodEnhanceList
    },
    DrugEnhance: {
      ...DrugEnhanceList
    },
    FoodSupport: {
      ...FoodSupportList
    },
    DrugSupport: {
      ...DrugSupportList
    },
  },

  /**
   * @time 08-25
   * 新增 木桩列表
   * @param Target
   */
  Target: {
    ...TargetListKeys
  }
}

/**
 * 主类
 *
 * @class Jx3DpsCore
 */
class Jx3DpsCore {
  static YiJinJing = YiJinJing;

  static Profit = Profit;

  static CoreHelper = CoreHelper;
}

export default Jx3DpsCore;

/**
 * 导出工具类
 * 
 * @param DpsCore
 * 核心类
 * 
 * @param Support
 * 辅助计算类
 * 
 * 核心辅助类
 * @param CoreHelper
 * 
 * 导出计算器
 * 
 * @param YiJinJing
 * 易筋经计算器
 * 
 * @param Profit
 * 收益计算器
 */
export { DpsCore, Support, CoreHelper, YiJinJing, Profit };