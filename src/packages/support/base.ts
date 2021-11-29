import {
  SupportContext,
  FormationValue,
  TeamSkillValue,
  GroupSkillBuffList,
  SetBonuse,
} from '../../types';
import { AllGainList } from '../gain';
import { Gain } from '@/packages/gain/gain';

export type SupportName = FormationValue | TeamSkillValue | GroupSkillBuffList | SetBonuse;

export interface SupportBaseOptions {
  gainList?: Gain[];
}

/**
 * 判断Gain类型 是增益库里的增益还是自定义增益
 *
 * @param {(SupportName | Gain)} value
 * @return {*}  {value is Gain}
 */
function isGain(value: SupportName | Gain): value is Gain {
  return typeof value !== 'string' && Array.isArray(value.data);
}

class SupportBase {
  /**
   * 增益列表
   *
   * @type {Gain[]}
   * @memberof SupportBase
   */
  public gainList: Gain[] = [];

  constructor(options: SupportBaseOptions) {
    this.gainList = options.gainList || [];
  }

  /**
   * 计算所有增益中间件
   *
   * @param {SupportContext} ctx
   * @param {*} next
   * @return {*}
   * @memberof SupportBase
   */
  public countCurrentSupportGain(ctx: SupportContext, next: any) {
    if (!ctx) {
      return next();
    }

    if (this.gainList.length > 0) {
      this.gainList.forEach(gain => {
        gain.data.forEach(gainAttribute => {
          ctx[gainAttribute.gainTarget] += gainAttribute.value * gainAttribute.coverage;
        });
      });
    }

    return next();
  }

  public countCurrentSupportGainSync(ctx: SupportContext) {
    if (this.gainList.length > 0) {
      this.gainList.forEach(gain => {
        gain.data.forEach(gainAttribute => {
          ctx[gainAttribute.gainTarget] += gainAttribute.value * gainAttribute.coverage;
        });
      });
    }

    return ctx;
  }

  /**
   * 使用增益
   *
   * @param {Gain} gain
   * @memberof SupportBase
   */
  public use(gain: SupportName | Gain, options?: { coverage: number }): void {
    /**
     * @todo 判断增益的类型，是否是自定义增益，拿到当前增益
     * @param isGain
     */
    let currentGain: Gain = undefined;

    if (isGain(gain)) {
      currentGain = gain;
    } else {
      currentGain = AllGainList[gain];
    }

    /**
     * 如果设置了覆盖率则覆盖
     */
    const coverage = options && options.coverage;

    if (coverage !== undefined) {
      currentGain.data.forEach(item => {
        item.coverage = coverage;
      });
    }

    /**
     * @todo 判断是否重复添加
     */
    const index = this.gainList.findIndex(g => g.name === currentGain.name);
    if (index >= 0) {
      console.warn('请勿重复添加增益', gain);
      return;
    }

    this.gainList.push(currentGain);
  }

  /**
   * 重置增益列表
   *
   * @param {Gain[]} gains
   * @memberof SupportBase
   */
  public setGain(gains: Gain[]) {
    this.gainList = gains;
  }

  /**
   * 去除增益
   *
   * @param {Gain} gain
   * @memberof SupportBase
   */
  public remove(gain: string) {
    const index = this.gainList.findIndex(g => g.name === gain);
    this.gainList.splice(index, 1);
  }
}

export default SupportBase;
