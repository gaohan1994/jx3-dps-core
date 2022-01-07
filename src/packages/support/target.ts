/**
 * 目标类
 *
 * @Author: centerm.gaohan
 * @Date: 2021-08-08 18:41:58
 * @Last Modified by: Harper.Gao
 * @Last Modified time: 2021-11-21 17:59:43
 */
import { SupportContext, TargetListKeys, TargetParams } from '../../types';

export type TargetOptions = string | TargetParams;

const calculateDamageCoefficient = (defenseCoefficient: number, neiFang: number): number => {
  return defenseCoefficient / (neiFang + defenseCoefficient);
};

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
      level: 111,
    },
    [TargetListKeys.MuZhuang112]: {
      name: TargetListKeys.MuZhuang112,
      defenseCoefficient: 21178.56,
      neiFang: 7060,
      level: 112,
    },
    [TargetListKeys.MuZhuang113]: {
      name: TargetListKeys.MuZhuang113,
      defenseCoefficient: 22222.215,
      neiFang: 11966,
      level: 113,
    },
  };

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
    // 设置当前目标如果没传入默认 113 木桩
    const currentTarget: TargetParams =
      options !== undefined
        ? typeof options === 'string'
          ? Target.TargetList[options]
          : options
        : Target.TargetList.MuZhuang113;

    this.name = currentTarget.name;
    this.level = currentTarget.level;

    this.defenseCoefficient = currentTarget.defenseCoefficient;
    this.neiFang = currentTarget.neiFang;
  }

  /**
   * 实际内防计算公式
   * (内防 - 无视内防等级) * (1 - 无视内防系数)
   *
   * @time 09-01
   * 修改内防计算公式
   * 游戏里有两种类型的无视防御机制，称为A类和B类，其中同类无视防御相加，不同类无视防御相乘。
   * https://www.jx3box.com/bps/7609
   * 实际内防 = 内防 *（1 - 全局无视内防等级）* （1 - 无视内防等级）
   * @param currentTargetNeiFang
   */
  calculateDamageCoefficient = (supportContext: SupportContext) => {
    const { ignoreDefense, globalIgnoreDefense } = supportContext;
    const ultimateNeiFang = this.neiFang * (1 - globalIgnoreDefense) * (1 - ignoreDefense);
    this.damageCoefficient = calculateDamageCoefficient(this.defenseCoefficient, ultimateNeiFang);
  };
}

export default Target;
