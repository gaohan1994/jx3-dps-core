/**
 * 个人增益 类
 * 
 * @Author: centerm.gaohan 
 * @Date: 2021-08-08 16:55:04 
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-08 21:35:25
 */
import chalk = require('chalk');
import { EnChants, Weapon, SetBonuse } from '../types'

class PersonBuff {

  public options: any;

  /**
   * 附魔情况
   *
   * @type {EnChants[]}
   * @memberof PersonBuff
   */
  public enChants: EnChants[];

  /**
   * 武器情况
   *
   * @type {Weapon}
   * @memberof PersonBuff
   */
  public weapon: Weapon;

  /**
   * 套装情况
   *
   * @type {SetBonuse[]}
   * @memberof PersonBuff
   */
  public setBonuses: SetBonuse[] = [];

  constructor(options: any = {}) {
    this.options = options;

    /**
     * 设置附魔
     * 
     * 默认全部附魔都有
     */
    this.enChants = options.enChants || [EnChants.EnChantBelt, EnChants.EnChantBody, EnChants.EnChantHand, EnChants.EnChantHead, EnChants.EnChantShoe];

    /**
     * 设置武器
     * 
     * 默认橙武
     */
    this.weapon = options.weapon || Weapon.CW;

    /**
     * 设置套装属性 
     * 
     * 默认四件套
     */
    this.setBonuses = options.setBonuses || [SetBonuse.SkillSetBonuse, SetBonuse.ValueSetBonuse];
  }

  /**
   * 校验是否存在传入的附魔
   *
   * @param {EnChants} targetEnChant
   * @return {*} 
   * @memberof PersonBuff
   */
  public checkEnChant(targetEnChant: EnChants) {
    return this.enChants.some((ec) => ec === targetEnChant);
  }

  /**
   * 是否有技能套装
   *
   * @return {*} 
   * @memberof PersonBuff
   */
  public hasSkillSetBonuese() {
    return this.setBonuses.some((sb) => sb === SetBonuse.SkillSetBonuse);
  }

  /**
   * 打印套装详情
   *
   * @memberof PersonBuff
   */
  public showPersonBuffValue() {
    console.log(chalk.blue(`个人增益：
      附魔：
      ${this.checkEnChant(EnChants.EnChantBelt) ? '-腰带附魔' : ''}
      ${this.checkEnChant(EnChants.EnChantBody) ? '-衣服附魔' : ''}
      ${this.checkEnChant(EnChants.EnChantHand) ? '-手附魔' : ''}
      ${this.checkEnChant(EnChants.EnChantHead) ? '-头附魔' : ''}
      ${this.checkEnChant(EnChants.EnChantShoe) ? '-鞋子附魔' : ''}
      武器：
        ${this.weapon}
      套装：
        ${this.setBonuses.length === 2 ? '四件套' : this.setBonuses.length === 1 ? '两件套' : '无套装'}
    `));
  }
}
export default PersonBuff;