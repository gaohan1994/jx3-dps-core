import { createEnum } from '@types';
import { Gain } from './gain';

export const GainGroupTypes = createEnum([
  'Formations',
  'TeamSkills',
  'GroupSkills',
  'SetBonusesGain',
  'Weapons',
  'Enchants',
  'EffectSpines',
  'Banquet',
  'DrugEnhance',
  'DrugSupport',
  'FoodEnhance',
  'FoodSupport',
  'HomeFood',
  'Target',
  'WeaponEnchant',
  'HomeDrink',
  'FestivalFood',
]);
export type GainGroupTypes = keyof typeof GainGroupTypes;

let groupIndex = 0;

export class GainGroup {
  public name: string; // 增益群组name
  public title: string; // 增益群组中文name
  public list: Gain[];
  public groupId: number;
  constructor(name: string, title: string) {
    this.name = name;
    this.title = title;
    this.list = [];
    this.groupId = ++groupIndex;
  }
}

// 创建增益群组
// 创建增益一定会插入到全局group中吗？
export const createGainGroup = (gainGroupName: string, gainGroupTitle: string) => {
  const group = new GainGroup(gainGroupName, gainGroupTitle);
  return group;
};

export const selectGainGroupByName = (groups: GainGroup[], name: string): GainGroup => {
  return groups.find(g => g.name === name);
};

export const selectGainGroupById = (groups: GainGroup[], id: number): GainGroup => {
  return groups.find(g => g.groupId === id);
};
