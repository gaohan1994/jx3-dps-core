/**
 * 团队 和 小队增益
 * @Author: centerm.gaohan 
 * @Date: 2021-08-08 17:18:52 
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-08 19:10:49
 */
import chalk = require('chalk');
import { Formation, SupportMode, GroupSkillBuff, TeamSkillBuffNeiGong, TeamSkillBuffWaiGong } from "../types";

class TeamBuff {
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
  public teamSkillBuff: Array<TeamSkillBuffNeiGong | TeamSkillBuffWaiGong>;

  /**
   * 团队技能增益
   *
   * @type {Array<GroupSkillBuff>}
   * @memberof TeamBuff
   */
  public groupSkillBuff: Array<GroupSkillBuff>;

  constructor(options: any = {}) {
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
      : options.mode === SupportMode.NeiGong
        ? [TeamSkillBuffNeiGong.PoCangQiong, TeamSkillBuffNeiGong.QingJuan, TeamSkillBuffNeiGong.XiuQi]
        : [TeamSkillBuffWaiGong.JiLei, TeamSkillBuffWaiGong.Jiu, TeamSkillBuffWaiGong.SuiXingChen, TeamSkillBuffWaiGong.YinMeiXiang];

    /**
     * 初始化团队技能增益
     * 
     * 默认 朝圣言 + 弘法
     */
    this.groupSkillBuff = options.groupSkillBuff || [GroupSkillBuff.ChaoShengYan, GroupSkillBuff.HongFa];
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