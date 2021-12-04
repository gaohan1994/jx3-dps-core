/**
 * 增益列表库
 *
 * @Author: Harper.Gao
 * @Date: 2021-08-31 17:38:11
 * @Last Modified by: Harper.Gao
 * @Last Modified time: 2021-11-19 10:23:37
 */

import { afterResult } from '@componet/utils';
import { GainGroup, createGainGroup as createGainGroupBase, GainGroupTypes } from './group';
import { createGain, Gain, GainAttribute, GainTypes } from './gain';

import {
  FoodEnchanceConfig,
  FoodSupportConfig,
  DrugEnhanceConfig,
  DrugSupportConfig,
  BanquetConfig,
} from '@config/food.config';
import { FormationsConfig } from '@config/formation.config';
import { GroupSkillConfig, TeamSkillConfig } from '@config/skill.config';
import {
  WeaponConfig,
  EnChantConfig,
  SetBonuseConfig,
  EffectSpineConfig,
} from '@config/item.config';

const gainModule = (function () {
  // 全部Group
  const allGainGroupList: GainGroup[] = [];
  // 全部Gain
  const allGainList: Gain[] = [];

  // const coreHelper: {name: string:} = {};

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

  const beginGainWork = (groupName: GainGroupTypes, groupTitle: string, config: any) => {
    const group = createGainGroup(groupName, groupTitle);
    const factory = createGainFactory(group);
    makeGainsUseConfig(factory, config);
  };

  beginGainWork(GainGroupTypes.FoodEnhance, '增强食品', FoodEnchanceConfig);
  beginGainWork(GainGroupTypes.FoodSupport, '辅助食品', FoodSupportConfig);
  beginGainWork(GainGroupTypes.DrugEnhance, '增强药品', DrugEnhanceConfig);
  beginGainWork(GainGroupTypes.DrugSupport, '辅助药品', DrugSupportConfig);
  beginGainWork(GainGroupTypes.Banquet, '宴席', BanquetConfig);
  beginGainWork(GainGroupTypes.Formations, '阵法', FormationsConfig);
  beginGainWork(GainGroupTypes.TeamSkills, '技能增益', TeamSkillConfig);
  beginGainWork(GainGroupTypes.GroupSkills, '团队技能增益', GroupSkillConfig);
  beginGainWork(GainGroupTypes.Weapons, '武器', WeaponConfig);
  beginGainWork(GainGroupTypes.Enchants, '附魔', EnChantConfig);
  beginGainWork(GainGroupTypes.SetBonusesGain, '套装', SetBonuseConfig);
  beginGainWork(GainGroupTypes.EffectSpines, '特效腰椎', EffectSpineConfig);

  return { allGainGroupList, allGainList };
})();

export default gainModule;
