import DpsCore from './core/core';
import Support from './support/support';
import { YiJinJing } from './calculator';
import { FormationValue, TeamSkillValue, GroupSkillBuffList, SetBonuse, WeaponValue, EnChantsList } from './types';

const CoreHelper = {
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
}

/**
 * 主类
 *
 * @class Jx3DpsCore
 */
class Jx3DpsCore {
  static YiJinJing = YiJinJing;

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
 */
export { DpsCore, Support, CoreHelper, YiJinJing };