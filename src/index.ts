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
  HomeFoodList,
  YiJinJingValues,
} from '@/types';

import Support from '@/packages/support/support';
import Profit from '@/packages/profit/profit';

import unstableOldCore from '@/packages/core/unstableOldCore';
import UnstableOldYiJinJing from '@/calculator/ShaoLin/YiJinJing';

import DpsCore, { createDpsCore } from '@/packages/core/core';
import { createCalculator } from '@/calculator/calculator';

const CoreHelper = {
  CalculatorVersion: YiJinJingValues,
  // 加速列表
  JiaSuList: {
    ...JiaSuValue,
  },
  // 所有阵法
  Formations: {
    ...FormationValue,
  },

  // 技能增益
  TeamSkills: {
    ...TeamSkillValue,
  },

  // 团队技能增益
  GroupSkills: {
    ...GroupSkillBuffList,
  },

  // 套装增益
  SetBonusesGain: {
    ...SetBonuse,
  },
  // 武器增益列表
  Weapons: {
    ...WeaponValue,
  },

  // 附魔增益列表
  Enchants: {
    ...EnChantsList,
  },

  // 新增特效腰椎增益列表
  EffectSpines: {
    ...EffectSpineList,
  },

  // 新增 宴席增益列表
  Banquet: {
    ...BanquetList,
  },
  // 新增 家园小吃
  // 新增 小吃增益列表
  Food: {
    FoodEnhance: {
      ...FoodEnhanceList,
    },
    DrugEnhance: {
      ...DrugEnhanceList,
    },
    FoodSupport: {
      ...FoodSupportList,
    },
    DrugSupport: {
      ...DrugSupportList,
    },
    HomeFood: {
      ...HomeFoodList,
    },
  },
  // 新增 木桩列表
  Target: {
    ...TargetListKeys,
  },
};

// old calculator
class UnstableOldJx3DpsCore {
  static YiJinJing = UnstableOldYiJinJing;
  static Profit = Profit;
  static CoreHelper = CoreHelper;
}

export {
  createCalculator,
  DpsCore,
  createDpsCore,
  Support,
  CoreHelper,
  Profit,
  // unstable packages need remove on Version 2.0.0
  UnstableOldJx3DpsCore,
  unstableOldCore,
  UnstableOldYiJinJing,
};
