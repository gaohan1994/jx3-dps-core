/**
 * 辅助类
 *
 * @Author: centerm.gaohan
 * @Date: 2021-08-08 16:29:54
 * @Last Modified by: Harper.Gao
 * @Last Modified time: 2021-11-21 17:59:37
 */

import invariant from 'invariant';
import { createEnum, SupportContext } from '@types';
import CoreMiddleware from '@componet/middleware';
import { deepClone } from '@componet/utils';
import { Gain, GainTypes } from '@packages/gain/gain';
import { SetBonuseList } from '@config/item.config';
import Target, { TargetOptions } from './target';
import SupportBase, { SupportBaseOptions } from './base';

export const isCostomGain = (gain: Gain): boolean => gain && gain.type === GainTypes.Costom;

export const SupportMode = createEnum(['WaiGong', 'NeiGong']);
export type SupportMode = keyof typeof SupportMode;

export interface SupportOptions extends SupportBaseOptions {
  mode: SupportMode;
  target?: TargetOptions;
  CWTimes?: number;
}

export default class Support extends SupportBase {
  static Mode = SupportMode;
  public mode: SupportMode;
  public options: any;
  public target: Target = undefined;

  // 橙武触发次数默认3次
  public CWTimes: number;

  constructor(options: SupportOptions) {
    super(options);
    this.options = options;

    invariant(!!options.mode, '辅助类类型不能为空');
    this.mode = options.mode;

    this.target = new Target(options.target);
    this.CWTimes = options.CWTimes || 3;
  }

  public getSupportAttributeSync(): SupportContext {
    const ctx: SupportContext = {
      YuanQi: 0,
      GenGu: 0,
      LiDao: 0,
      ShenFa: 0,
      damageBonus: 0,
      JiChuGongJi: 0,
      JiChuGongJiPercent: 0,
      PoFangPercent: 0,
      PoFangLevel: 0,
      HuiXin: 0,
      HuiXinLevel: 0,
      HuiXiao: 0,
      HuiXiaoLevel: 0,
      MingZhong: 0,
      MingZhongLevel: 0,
      WuShuang: 0,
      WuShuangLevel: 0,
      PoZhao: 0,
      ignoreDefense: 0,
      globalIgnoreDefense: 0,
    };

    const middleware = new CoreMiddleware([]);
    middleware.use(this.countCurrentSupportGainSync.bind(this));
    return middleware.executeSync(ctx);
  }

  // 是否有技能套装
  public hasSkillSetBonuese() {
    return this.gainList.some(g => g.name === SetBonuseList.SkillSetBonuse);
  }

  // 判断是否有橙武
  public hasCw() {
    return this.gainList.some(g => g.name === '橙武');
  }

  // 是否有属性套装
  public hasValueSetBonuese() {
    return this.gainList.some(g => g.name === SetBonuseList.ValueSetBonuse);
  }
}

export const copySupport = (support: Support): Support => {
  const { options, gainList = [] } = support;
  const nextOptions = deepClone(options);
  const nextGainList = deepClone(gainList);
  const nextSupport = new Support(nextOptions);

  for (let i = 0; i < nextGainList.length; i++) {
    const currentGain = nextGainList[i];

    if (isCostomGain(currentGain)) {
      nextSupport.use(currentGain);
      continue;
    }
    nextSupport.use(currentGain.name);
  }
  return nextSupport;
};
