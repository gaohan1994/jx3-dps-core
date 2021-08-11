/**
 * 目标类
 * 
 * @Author: centerm.gaohan 
 * @Date: 2021-08-08 18:41:58 
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-11 15:21:50
 */

import chalk from 'chalk';
import { TargetMode, TargetBossList, TargetMuZhuangList } from "../types";

export type TargetOptions = TargetBossList | TargetMuZhuangList;

class Target {
  static TargetList = {
    [TargetBossList.DaMoDong]: {
      name: TargetBossList.DaMoDong,
      defenseCoefficient: 23265.87,
      neiFang: 12528,
      level: 113,
    },
    [TargetMuZhuangList.MuZhuang111]: {
      name: TargetMuZhuangList.MuZhuang111,
      defenseCoefficient: 20134.905,
      neiFang: 5034,
      level: 111
    }
  }

  public options: any;

  public name: TargetBossList | TargetMuZhuangList;
  /**
   * 防御系数
   *
   * @type {number}
   * @memberof TargetInterface
   */
  public defenseCoefficient: number;
  /**
   * 伤害系数
   *
   * @type {number}
   * @memberof TargetInterface
   */
  public damageCoefficient: number;
  /**
   * 内防
   *
   * @type {number}
   * @memberof TargetInterface
   */
  public neiFang: number;
  /**
   * 等级
   *
   * @type {number}
   * @memberof TargetInterface
   */
  public level: number;

  constructor(options: TargetOptions) {
    this.options = options;

    /**
     * 设置当前目标如果没传入默认 111 木桩
     */
    const currentTarget = options !== undefined && typeof options === 'string'
      ? Target.TargetList[options]
      : Target.TargetList[TargetMuZhuangList.MuZhuang113];

    this.name = currentTarget.name;
    this.level = currentTarget.level;
    this.defenseCoefficient = currentTarget.defenseCoefficient;
    this.neiFang = currentTarget.neiFang;
    this.damageCoefficient = currentTarget.defenseCoefficient / (currentTarget.neiFang + currentTarget.defenseCoefficient);
  }

  public showTargetValue() {
    console.log(chalk.red(`目标：${this.name}
      等级：${this.level}
      伤害系数：${this.damageCoefficient}
      防御系数：${this.defenseCoefficient}
      内防：${this.neiFang}
    `));
  }
}

export default Target;