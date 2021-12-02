/**
 * 增益列表库
 *
 * @Author: Harper.Gao
 * @Date: 2021-08-31 17:38:11
 * @Last Modified by: Harper.Gao
 * @Last Modified time: 2021-11-19 10:23:37
 */

import { afterResult } from '@/componet/utils';
import { TeamSkillGains, GroupSkillGains } from '../../lib/skill';
import { FormationsGains } from '../../lib/formation';
import { WeaponGains, EnChantGains, EffectSpineGains, SetBonuseGains } from '../../lib/item';
import { BanquetGains, FoodGains } from '../../lib/food';
import { GainGroup, createGainGroup as createGainGroupBase, GainGroupTypes } from './group';
import { createGain, Gain, GainAttribute, GainTypes } from './gain';

import {
  FoodEnchanceConfig,
  FoodSupportConfig,
  DrugEnhanceConfig,
  DrugSupportConfig,
} from '@/config/food.config';

const AllGainList: { [key: string]: any } = {
  // 阵法增益
  ...FormationsGains,
  // 小队技能增益
  ...TeamSkillGains,
  // 团队技能增益
  ...GroupSkillGains,
  // 装备增益
  ...SetBonuseGains,
  ...WeaponGains,
  ...EnChantGains,
  ...EffectSpineGains,
  // 小吃、宴席增益
  ...BanquetGains,
  ...FoodGains.DrugEnhance,
  ...FoodGains.DrugSupport,
  ...FoodGains.FoodEnhance,
  ...FoodGains.FoodSupport,
  ...FoodGains.HomeFood,
};

const gainModule = (function () {
  // 全部Group
  const allGainGroupList: GainGroup[] = [];
  // 全部Gain
  const allGainList: Gain[] = [];

  // 创建group之后插入到 groupList
  const createGroupInsertIntoGroupList = (group: GainGroup) => {
    allGainGroupList.push(group);
    return group;
  };
  const createGainGroup = afterResult(createGainGroupBase, createGroupInsertIntoGroupList);

  // 创建完gain之后插入到全部 gainList
  const createGainInsertIntoGainList = (gain: Gain) => {
    allGainList.push(gain);
  };

  // 创建增益工厂模式
  const createGainFactory =
    (group: GainGroup) =>
    ({ name = '', data = [] }: { name: string; data: GainAttribute[] }) => {
      const gain = createGain(name, data, GainTypes.Normal, group.groupId);
      group.list.push(gain);
      return gain;
    };

  // 使用工厂和配置文件创建增益
  const makeGainsUseConfig = (factory: any, gainConfig: any[]) => {
    const length = gainConfig.length;
    for (let i = 0; i < length; i++) {
      const currentGainConfig = gainConfig[i];
      const gain = factory({ ...currentGainConfig });
      createGainInsertIntoGainList(gain);
    }
  };
  // 创建食品增益列表
  const foodEnhanceGroup = createGainGroup(GainGroupTypes.FoodEnhance, '增强食品');
  const createFoodEnhanceGain = createGainFactory(foodEnhanceGroup);
  makeGainsUseConfig(createFoodEnhanceGain, FoodEnchanceConfig);

  const foodSupportGroup = createGainGroup(GainGroupTypes.FoodSupport, '辅助食品');
  const createFoodSupportGain = createGainFactory(foodSupportGroup);
  makeGainsUseConfig(createFoodSupportGain, FoodSupportConfig);

  const drugEnchanceGroup = createGainGroup(GainGroupTypes.DrugEnhance, '增强药品');
  const createDrugEnchanceGain = createGainFactory(drugEnchanceGroup);
  makeGainsUseConfig(createDrugEnchanceGain, DrugEnhanceConfig);

  const drugSupportGroup = createGainGroup(GainGroupTypes.DrugSupport, '辅助药品');
  const createDrugSupportGain = createGainFactory(drugSupportGroup);
  makeGainsUseConfig(createDrugSupportGain, DrugSupportConfig);

  return { allGainGroupList, allGainList };
})();

const { allGainGroupList, allGainList } = gainModule;
console.log('[allGainGroupList: ]', allGainGroupList.length);
console.log('[allGainList : ]', allGainList);

export {
  AllGainList,
  FormationsGains,
  TeamSkillGains,
  GroupSkillGains,
  SetBonuseGains,
  WeaponGains,
  EnChantGains,
  EffectSpineGains,
  BanquetGains,
  FoodGains,
  gainModule,
};
