import { TargetListKeys, HomeFoodList } from '@types';

import Support from '@packages/support/support';
import Profit from '@packages/profit/profit';

import DpsCore, { createDpsCore, JiaSuValue } from '@packages/core/core';
import { createCalculator, YiJinJingVersions } from '@calculator/calculator';
import {
  BanquetList,
  FoodSupportList,
  FoodEnhanceList,
  DrugSupportList,
  DrugEnhanceList,
} from '@config/food.config';
import { WeaponList, EnChantsList, EffectSpineList, SetBonuseList } from '@config/item.config';
import { FormationList } from '@config/formation.config';
import { TeamSkillList, GroupSkillList } from '@config/skill.config';
import gainModule from '@packages/gain/index';
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

const CoreHelper = {
  CalculatorVersion: YiJinJingVersions,
  GainGroupTypes: GainGroupTypes,
  JiaSuList: {
    ...JiaSuValue,
  },
  Formations: {
    ...FormationList,
  },
  TeamSkills: {
    ...TeamSkillList,
  },
  GroupSkills: {
    ...GroupSkillList,
  },
  SetBonusesGain: {
    ...SetBonuseList,
  },
  Weapons: {
    ...WeaponList,
  },
  Enchants: {
    ...EnChantsList,
  },
  EffectSpines: {
    ...EffectSpineList,
  },
  Banquet: {
    ...BanquetList,
  },
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
  Target: {
    ...TargetListKeys,
  },
};

export { createCalculator, gainModule, createDpsCore, DpsCore, Support, CoreHelper, Profit };
