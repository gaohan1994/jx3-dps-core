import { Gain, SupportContext } from "../types";
import chalk from 'chalk';

export interface SupportBaseOptions {
  defaultGainList?: Gain[];
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
    this.gainList = options.defaultGainList || [];
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
      this.gainList.forEach((gain) => {
        gain.data.forEach((gainAttribute) => {
          ctx[gainAttribute.gainTarget] += gainAttribute.value;
        });
      })
    }

    return next();
  }

  /**
   * 使用增益
   *
   * @param {Gain} gain
   * @memberof SupportBase
   */
  public use(gain: Gain): void {
    const index = this.gainList.findIndex(g => g.name === gain.name);
    if (index <= 0) {
      this.gainList.push(gain);
    }
  }

  /**
   * 去除增益
   *
   * @param {Gain} gain
   * @memberof SupportBase
   */
  public remove(gain: Gain) {
    const index = this.gainList.findIndex(g => g.name === gain.name);
    this.gainList.splice(index, 1);
  }

  public showGain() {
    const names = this.gainList.map((g) => g.name);
    console.log(chalk.blue(`增益列表
      ${names.join(', ')}
    `));
  }
}

export default SupportBase;