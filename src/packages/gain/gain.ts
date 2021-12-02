import { BuffKeys, createEnum } from '@/types';

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
