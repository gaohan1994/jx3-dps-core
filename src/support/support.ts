/**
 * 辅助类
 * 
 * @Author: centerm.gaohan 
 * @Date: 2021-08-08 16:29:54 
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-25 16:08:06
 */

import invariant from 'invariant';
import chalk from 'chalk';
import { SupportMode, SupportContext, SetBonuse } from "../types";
import { CoreMiddleware } from '../onion';
import { Target, TargetOptions, SupportBase, SupportBaseOptions } from './index';

export interface SupportOptions extends SupportBaseOptions {
  mode: SupportMode;
  target?: TargetOptions
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
   * 个人增益模块
   *
   * @type {PersonBuff}
   * @memberof Support
   */
  // public personBuff: PersonBuff = undefined;

  /**
   * 团队增益模块
   *
   * @type {TeamBuff}
   * @memberof Support
   */
  // public teamBuff: TeamBuff = undefined;

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

  public hasCw() {
    return this.gainList.some((g) => g.name === 'CW');
  }

  /**
   * 是否由属性套装
   *
   * @return {*} 
   * @memberof PersonBuff
   */
  public hasValueSetBonuese() {
    return this.gainList.some((g) => g.name === SetBonuse.ValueSetBonuse);
  }
}

export default Support;