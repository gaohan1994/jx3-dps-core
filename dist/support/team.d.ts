import { Formation, SupportMode, GroupSkillBuff, TeamSkillBuffNeiGong, TeamSkillBuffWaiGong } from "../types";
declare class TeamBuff {
    /**
     * 辅助类类型
     *
     * @memberof TeamBuff
     */
    mode: typeof SupportMode;
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
    teamSkillBuff: Array<TeamSkillBuffNeiGong | TeamSkillBuffWaiGong>;
    /**
     * 团队技能增益
     *
     * @type {Array<GroupSkillBuff>}
     * @memberof TeamBuff
     */
    groupSkillBuff: Array<GroupSkillBuff>;
    constructor(options?: any);
    /**
     * 打印团队增益
     *
     * @memberof TeamBuff
     */
    showTeamBuffValue(): void;
}
export default TeamBuff;
