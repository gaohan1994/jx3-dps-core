import { SupportContext } from '@types';
import { Gain, isGain, selectGainByName } from '@packages/gain/gain';
import gainModule from '../gain';

export interface SupportBaseOptions {
  gainList?: Gain[];
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
    const gainList = options.gainList || [];
    if (gainList.length > 0) {
      gainList.forEach(gain => this.use(gain));
    }
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
  public use(gain: string | Gain, options?: { coverage: number }): void {
    /**
     * @todo 判断增益的类型，是否是自定义增益，拿到当前增益
     * @param isGain
     */
    let currentGain: Gain = undefined;

    if (isGain(gain)) {
      currentGain = gain;
    } else {
      currentGain = selectGainByName(gainModule.allGainList, gain);
    }

    if (!currentGain) {
      return;
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
