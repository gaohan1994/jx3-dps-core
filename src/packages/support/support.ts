/**
 * 辅助类
 * 
 * @Author: centerm.gaohan 
 * @Date: 2021-08-08 16:29:54 
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-31 17:22:24
 */

import invariant from 'invariant';
import chalk from 'chalk';
import { SupportMode, SupportContext, SetBonuse } from "../../types";
import { CoreMiddleware } from '../../componet';
import { Target, TargetOptions, SupportBase, SupportBaseOptions } from './index';

export interface SupportOptions extends SupportBaseOptions {
  mode: SupportMode;
  target?: TargetOptions;

  CWTimes?: number;
}

class Support extends SupportBase {
  static Mode = SupportMode;
  /**
   * 辅助类类型
   *
   * @type {SupportMode}
   * @memberof Support
   */
  public mode: SupportMode;
  /**
   * 缓存参数
   *
   * @memberof Target
   */
  public options: any;

  /**
   * 橙武触发次数默认3次
   *
   * @type {number}
   * @memberof Support
   */
  public CWTimes: number;

  /**
   * 目标
   *
   * @type {Target}
   * @memberof Support
   */
  public target: Target = undefined;

  constructor(options: SupportOptions) {
    super(options);
    this.options = options;

    invariant(!!options.mode, '辅助类类型不能为空');
    this.mode = options.mode;

    /**
     * 初始化目标
     */
    this.target = new Target(options.target);

    this.CWTimes = options.CWTimes || 3;
  }

  /**
   * 获得辅助总增益
   *
   * @return {*}  {Promise<SupportContext>}
   * @memberof Support
   */
  public getSupportAttribute(): Promise<SupportContext> {
    let ctx: SupportContext = {
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
    };

    const middleware = new CoreMiddleware([]);
    middleware.use(this.countCurrentSupportGain.bind(this));

    return new Promise((resolve, reject) => {
      middleware
        .execute(ctx)
        .then(() => {
          resolve(ctx);
        })
        .catch((error) => {
          reject(error);
        })
    })
  }

  /**
   * 打印属性
   *
   * @memberof Support
   */
  public showSupportValue() {
    console.log(chalk.blue(`---- support start ----`));
    this.target.showTargetValue();
    console.log(chalk.blue(`---- support end ----`));
  }

  /**
   * 是否有技能套装
   *
   * @return {*} 
   * @memberof PersonBuff
   */
  public hasSkillSetBonuese() {
    return this.gainList.some((g) => g.name === SetBonuse.SkillSetBonuse);
  }

  /**
   * 判断是否有橙武
   *
   * @return {*} 
   * @memberof Support
   */
  public hasCw() {
    return this.gainList.some((g) => g.name === 'CW');
  }

  /**
   * 是否有属性套装
   *
   * @return {*} 
   * @memberof PersonBuff
   */
  public hasValueSetBonuese() {
    return this.gainList.some((g) => g.name === SetBonuse.ValueSetBonuse);
  }
}

export default Support;