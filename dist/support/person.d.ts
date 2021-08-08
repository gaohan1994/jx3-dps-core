import { EnChants, Weapon, SetBonuse } from '../types';
declare class PersonBuff {
    options: any;
    /**
     * 附魔情况
     *
     * @type {EnChants[]}
     * @memberof PersonBuff
     */
    enChants: EnChants[];
    /**
     * 武器情况
     *
     * @type {Weapon}
     * @memberof PersonBuff
     */
    weapon: Weapon;
    /**
     * 套装情况
     *
     * @type {SetBonuse[]}
     * @memberof PersonBuff
     */
    setBonuses: SetBonuse[];
    constructor(options?: any);
    /**
     * 校验是否存在传入的附魔
     *
     * @param {EnChants} targetEnChant
     * @return {*}
     * @memberof PersonBuff
     */
    checkEnChant(targetEnChant: EnChants): boolean;
    /**
     * 是否有技能套装
     *
     * @return {*}
     * @memberof PersonBuff
     */
    hasSkillSetBonuese(): boolean;
    /**
     * 打印套装详情
     *
     * @memberof PersonBuff
     */
    showPersonBuffValue(): void;
}
export default PersonBuff;
