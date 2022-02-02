import { BuffKeys, createEnum } from '@types';

export interface GainAttribute {
  gainTarget: BuffKeys;
  value: number;
  coverage: number;
}

// Constants ============================================
// ========================================================

export const GainTypes = createEnum(['Normal', 'Costom']);
export type GainTypes = keyof typeof GainTypes;

let gainIndex = 0;

export class Gain {
  public id?: number;
  public name: string;
  public data: Array<GainAttribute>;
  public type?: GainTypes;
  public groupId?: number;

  constructor(
    name: string,
    data: Array<GainAttribute>,
    type: GainTypes = GainTypes.Normal,
    groupId = -1
  ) {
    this.id = ++gainIndex;
    this.name = name;
    this.data = data;
    this.type = type;
    this.groupId = groupId;
  }
}

// 创建增益
export const createGain = (
  gainName: string,
  gainData: GainAttribute[],
  type?: GainTypes,
  groupId?: number
) => {
  const gain: Gain = new Gain(gainName, gainData, type, groupId);
  return gain;
};

/**
 * 判断Gain类型 是增益库里的增益还是自定义增益
 *
 * @param {(string | Gain)} value
 * @return {*}  {value is Gain}
 */
export const isGain = (value: string | Gain): value is Gain => {
  return typeof value !== 'string' && Array.isArray(value.data);
};

export const getGainName = (gain: Gain): string => {
  return gain.name;
};

export const selectGainByName = (gains: Gain[], name: string): Gain => {
  return gains.find(g => g.name === name);
};

export const selectGainById = (gains: Gain[], id: number): Gain => {
  return gains.find(g => g.id === id);
};

export const gainDataAtrributeToString = (data: GainAttribute): string => {
  let value = '';
  switch (data.gainTarget) {
    case BuffKeys.Spunk:
      value += '元气';
      break;
    case BuffKeys.damageBonus:
      value += '易伤';
      break;
    case BuffKeys.globalIgnoreDefense:
      value += '全局无视防御';
      break;
    case BuffKeys.ignoreDefense:
      value += '无视防御';
      break;
    case BuffKeys.SolarOvercomePercent:
      value += '破防百分比';
      break;
    case BuffKeys.SolarOvercome:
      value += '破防等级';
      break;
    case BuffKeys.SolarAttackPowerBase:
      value += '基础攻击';
      break;
    case BuffKeys.SolarAttackPowerBasePercent:
      value += '基础攻击百分比';
      break;
    case BuffKeys.HuiXin:
      value += '会心';
      break;
    case BuffKeys.HuiXinLevel:
      value += '会心等级';
      break;
    case BuffKeys.HuiXiao:
      value += '会效';
      break;
    case BuffKeys.HuiXiaoLevel:
      value += '会效等级';
      break;
    case BuffKeys.MingZhong:
      value += '命中';
      break;
    case BuffKeys.MingZhongLevel:
      value += '命中等级';
      break;
    case BuffKeys.WuShuang:
      value += '无双';
      break;
    case BuffKeys.WuShuangLevel:
      value += '无双等级';
      break;
    case BuffKeys.PoZhao:
      value += '破招';
      break;
    default:
      break;
  }
  return value;
};

// 返回 gain 中文描述
export const gainDataToString = (gain: Gain): string => {
  let value = `${gain.name}:`;

  for (let i = 0; i < gain.data.length; i++) {
    const currentGainData = gain.data[i];
    value += `${gainDataAtrributeToString(currentGainData)}+${currentGainData.value}`;
    if (i !== gain.data.length - 1) {
      value += ',';
    }
  }
  return value;
};
