/**
 * 增益列表库
 *
 * @Author: Harper.Gao
 * @Date: 2021-08-31 17:38:11
 * @Last Modified by: Harper.Gao
 * @Last Modified time: 2021-11-19 10:23:37
 */
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
  const gains = [];
  for (let i = 0; i < length; i++) {
    const currentGainConfig = gainConfig[i];
    const gain = factory({ ...currentGainConfig });
    gains.push(gain);
  }
  return gains;
};

class GainModule {
  // 全部Group
  public allGainGroupList: GainGroup[];
  // 全部Gain
  public allGainList: Gain[];

  constructor() {
    this.allGainGroupList = [];
    this.allGainList = [];

    this.beginGainWork(GainGroupTypes.FoodEnhance, '增强食品', FoodEnchanceConfig);
    this.beginGainWork(GainGroupTypes.FoodSupport, '辅助食品', FoodSupportConfig);
    this.beginGainWork(GainGroupTypes.DrugEnhance, '增强药品', DrugEnhanceConfig);
    this.beginGainWork(GainGroupTypes.DrugSupport, '辅助药品', DrugSupportConfig);
    this.beginGainWork(GainGroupTypes.Banquet, '宴席', BanquetConfig);
    this.beginGainWork(GainGroupTypes.Formations, '阵法', FormationsConfig);
    this.beginGainWork(GainGroupTypes.TeamSkills, '技能增益', TeamSkillConfig);
    this.beginGainWork(GainGroupTypes.GroupSkills, '团队技能增益', GroupSkillConfig);
    this.beginGainWork(GainGroupTypes.Weapons, '武器', WeaponConfig);
    this.beginGainWork(GainGroupTypes.Enchants, '附魔', EnChantConfig);
    this.beginGainWork(GainGroupTypes.SetBonusesGain, '套装', SetBonuseConfig);
    this.beginGainWork(GainGroupTypes.EffectSpines, '特效腰椎', EffectSpineConfig);
  }

  beginGainWork = (groupName: GainGroupTypes, groupTitle: string, config: any) => {
    const group = createGainGroupBase(groupName, groupTitle);
    this.allGainGroupList.push(group);

    const factory = createGainFactory(group);
    const gains = makeGainsUseConfig(factory, config);
    this.allGainList.push(...gains);
  };
}

export default new GainModule();
