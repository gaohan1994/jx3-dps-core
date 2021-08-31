import { Gain, SupportContext, FormationValue, TeamSkillValue, GroupSkillBuffList, SetBonuse, GainOptions } from "../types";
import chalk from 'chalk';
import { AllGainList } from "../config";

type SupportName = FormationValue |
  TeamSkillValue |
  GroupSkillBuffList |
  SetBonuse;

export interface SupportBaseOptions {
  defaultGainList?: Gain[];
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
          ctx[gainAttribute.gainTarget] += (gainAttribute.value * gainAttribute.coverage);
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
  public use(gain: SupportName | Gain, options: GainOptions = {}): void {

    /**
     * @todo 判断增益的类型，是否是自定义增益，拿到当前增益
     * @param isGain
     */
    let currentGain: Gain = undefined;

    if (isGain(gain)) {
      const index = this.gainList.findIndex(g => g.name === gain.name);
      index <= 0 && (currentGain = gain);
    } else {
      const index = this.gainList.findIndex(g => g.name === gain);
      index <= 0 && (currentGain = AllGainList[gain]);
    }

    // console.log('currentGain', currentGain)
    /**
     * 如果设置了覆盖率则覆盖
     */
    const { coverage } = options;

    if (coverage !== undefined) {
      currentGain.data.forEach((item) => {
        item.coverage = coverage;
      });
    }

    /**
     * @todo 判断是否重复添加
     */
    if (currentGain === undefined) {
      console.warn('请勿重复添加增益');
      return;
    }

    this.gainList.push(currentGain);
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