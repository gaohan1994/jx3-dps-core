/**
 * 团队 和 小队增益
 * @Author: centerm.gaohan
 * @Date: 2021-08-08 17:18:52
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-11 15:21:55
 */
import { Formation, Gain } from "../types";
import SupportBase from './base';
declare class TeamBuff extends SupportBase {
    /**
     * 辅助类类型
     *
     * @memberof TeamBuff
     */
    mode: any;
    /**
     * 阵法
     *
     * @type {Formation}
     * @memberof Support
     */
    formation?: Formation;
    options: any;
    /**
     * 小队增益
     *
     * @type {(Array<TeamSkillBuffNeiGong | TeamSkillBuffWaiGong>)}
     * @memberof TeamBuff
     */
    teamSkillBuff: Array<Gain>;
    /**
     * 团队技能增益
     *
     * @type {Array<GroupSkillBuff>}
     * @memberof TeamBuff
     */
    groupSkillBuff: Array<Gain>;
    constructor(options?: any);
    /**
     * 打印团队增益
     *
     * @memberof TeamBuff
     */
    showTeamBuffValue(): void;
}
export default TeamBuff;
