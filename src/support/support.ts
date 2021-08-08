/**
 * 辅助类
 * 
 * @Author: centerm.gaohan 
 * @Date: 2021-08-08 16:29:54 
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-08 19:26:26
 */
import chalk = require('chalk');
import invariant = require('invariant');
import { SupportMode } from "../types";
import PersonBuff from './person';
import TeamBuff from './team';
import Target from './target';

class Support {
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
  public personBuff: PersonBuff = undefined;

  /**
   * 团队增益模块
   *
   * @type {TeamBuff}
   * @memberof Support
   */
  public teamBuff: TeamBuff = undefined;

  /**
   * 目标
   *
   * @type {Target}
   * @memberof Support
   */
  public target: Target = undefined;

  constructor(options: any = {}) {
    this.options = options;

    invariant(!!options.mode, '辅助类类型不能为空');
    this.mode = options.mode;

    /**
     * 初始化个人增益
     */
    this.personBuff = new PersonBuff(options.person);

    /**
     * 初始化团队增益
     */
    this.teamBuff = new TeamBuff(options.team);

    /**
     * 初始化目标
     */
    this.target = new Target(options.target);
  }

  public showSupportValue() {
    console.log(chalk.blue(`---- support start ----`));
    this.personBuff.showPersonBuffValue();
    this.teamBuff.showTeamBuffValue();
    this.target.showTargetValue();
    console.log(chalk.blue(`---- support end ----`));
  }
}

export default Support;