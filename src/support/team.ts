/**
 * 团队 和 小队增益
 * @Author: centerm.gaohan 
 * @Date: 2021-08-08 17:18:52 
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-11 16:26:01
 */

import chalk from 'chalk';
import { Formation, SupportMode, Gain, GroupSkillBuffList } from "../types";
import SupportBase from './base';

class TeamBuff extends SupportBase {
  /**
   * 辅助类类型
   *
   * @memberof TeamBuff
   */
  public mode = SupportMode;
  /**
   * 阵法
   *
   * @type {Formation}
   * @memberof Support
   */
  public formation?: Formation = undefined;

  public options: any;

  /**
   * 小队增益
   *
   * @type {(Array<TeamSkillBuffNeiGong | TeamSkillBuffWaiGong>)}
   * @memberof TeamBuff
   */
  public teamSkillBuff: Array<Gain>;

  /**
   * 团队技能增益
   *
   * @type {Array<GroupSkillBuff>}
   * @memberof TeamBuff
   */
  public groupSkillBuff: Array<Gain>;

  constructor(options: any = {}) {
    super(options);
    this.options = options;

    /**
     * 初始化阵法
     */
    this.formation = options.formation;

    /**
     * 初始化类型
     */
    this.mode = options.mode;

    /**
     * 初始化小队技能增益
     * 
     * 如果传入则使用传入的技能增益，如果没有传入根据内外功划分
     */
    this.teamSkillBuff = options.teamSkillBuff
      ? options.teamSkillBuff
      : [];

    this.gainList.push(...this.teamSkillBuff);

    /**
     * 初始化团队技能增益
     * 
     * 默认 朝圣言 + 弘法
     */
    this.groupSkillBuff = options.groupSkillBuff || [];

    this.gainList.push(...this.groupSkillBuff);
  }

  /**
   * 打印团队增益
   *
   * @memberof TeamBuff
   */
  public showTeamBuffValue() {
    console.log(chalk.green(`团队增益：
      阵法：
      ${this.formation || '无'}
      小队技能增益：
      ${this.teamSkillBuff.join(', ')}
      团队技能增益：
      ${this.groupSkillBuff.join(', ')}
    `));
  }
}

export default TeamBuff;