/**
 * 目标类
 * 
 * @Author: centerm.gaohan 
 * @Date: 2021-08-08 18:41:58 
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-31 17:22:24
 */

import chalk from 'chalk';
import { TargetListKeys, TargetParams } from "../../types";

export type TargetOptions = string | TargetParams;

class Target {
  static TargetList: { [name: string]: TargetParams } = {
    [TargetListKeys.DaMoDong]: {
      name: TargetListKeys.DaMoDong,
      defenseCoefficient: 23265.87,
      neiFang: 12528,
      level: 113,
    },
    [TargetListKeys.MuZhuang111]: {
      name: TargetListKeys.MuZhuang111,
      defenseCoefficient: 20134.905,
      neiFang: 5034,
      level: 111
    },
    [TargetListKeys.MuZhuang112]: {
      name: TargetListKeys.MuZhuang112,
      defenseCoefficient: 21178.56,
      neiFang: 7060,
      level: 112
    },
    [TargetListKeys.MuZhuang113]: {
      name: TargetListKeys.MuZhuang113,
      defenseCoefficient: 22222.215,
      neiFang: 11966,
      level: 113
    }
  }

  public options: TargetOptions;

  public name: string;
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
    const currentTarget: TargetParams = options !== undefined
      ? typeof options === 'string'
        ? Target.TargetList[options]
        : options
      : Target.TargetList.MuZhuang113;

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