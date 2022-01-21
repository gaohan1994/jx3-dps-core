import { TargetListKeys } from '@types';

import Support from '@packages/support/support';
import Profit from '@packages/profit/profit';

import DpsCore, { createDpsCore, JiaSuValue } from '@packages/core/core';
import { createCalculator } from '@calculator/calculator';
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
import gainModule from '@packages/gain/index';
import { GainGroupTypes } from '@packages/gain/group';
import { YiJinJingQiXueVersion, YiJinJingSkillEnchant } from '@calculator/calculatorWoker';

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
  GainGroupTypes: GainGroupTypes,
  YiJinJingQiXueVersion: YiJinJingQiXueVersion,
  YiJinJingSkillEnchant: YiJinJingSkillEnchant,
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
    WeaponEnchant: {
      ...WeaponEnchantList,
    },
    HomeDrink: {
      ...HomeDrinkList,
    },
    FestivalFood: {
      ...FestivalFoodList,
    },
  },
  Target: {
    ...TargetListKeys,
  },
};

export { createCalculator, createDpsCore, gainModule, DpsCore, Support, CoreHelper, Profit };
