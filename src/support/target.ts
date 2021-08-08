/**
 * 目标类
 * 
 * @Author: centerm.gaohan 
 * @Date: 2021-08-08 18:41:58 
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-08 19:04:57
 */
import chalk = require('chalk');
import { TargetMode, TargetBossList, TargetMuZhuangList } from "../types";

class Target {
  static TargetList = {
    Boss: {
      [TargetBossList.DaMoDong]: {
        name: TargetBossList.DaMoDong,
        defenseCoefficient: 23265.87,
        damageCoefficient: 0.65,
        neiFang: 12528,
        level: 113,
      }
    },
    MuZhuang: {
      [TargetMuZhuangList.MuZhuang111]: {
        name: TargetMuZhuangList.MuZhuang111,
        defenseCoefficient: 20134.905,
        damageCoefficient: 0.8,
        neiFang: 5034,
        level: 111
      },
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

  constructor(options: any = {}) {
    this.options = options;

    /**
     * 设置当前目标如果没传入默认 111 木桩
     */
    const currentTarget = options !== undefined && typeof options.name === 'string'
      ? options
      : Target.TargetList.MuZhuang[TargetMuZhuangList.MuZhuang111];

    this.name = currentTarget.name;
    this.level = currentTarget.level;
    this.damageCoefficient = currentTarget.damageCoefficient;
    this.defenseCoefficient = currentTarget.defenseCoefficient;
    this.neiFang = currentTarget.neiFang;
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