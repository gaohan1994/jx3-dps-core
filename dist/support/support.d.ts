import { SupportMode } from "../types";
import PersonBuff from './person';
import TeamBuff from './team';
import Target from './target';
declare class Support {
    /**
     * 辅助类类型
     *
     * @type {SupportMode}
     * @memberof Support
     */
    mode: SupportMode;
    /**
     * 缓存参数
     *
     * @memberof Target
     */
    options: any;
    /**
     * 个人增益模块
     *
     * @type {PersonBuff}
     * @memberof Support
     */
    personBuff: PersonBuff;
    /**
     * 团队增益模块
     *
     * @type {TeamBuff}
     * @memberof Support
     */
    teamBuff: TeamBuff;
    /**
     * 目标
     *
     * @type {Target}
     * @memberof Support
     */
    target: Target;
    constructor(options?: any);
    showSupportValue(): void;
}
export default Support;
