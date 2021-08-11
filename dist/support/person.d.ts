/**
 * 个人增益 类
 *
 * @Author: centerm.gaohan
 * @Date: 2021-08-08 16:55:04
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-11 15:21:36
 */
import { EnChants, Weapon, SetBonuse } from '../types';
import SupportBase from './base';
declare class PersonBuff extends SupportBase {
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
     * 是否由属性套装
     *
     * @return {*}
     * @memberof PersonBuff
     */
    hasValueSetBonuese(): boolean;
    /**
     * 打印套装详情
     *
     * @memberof PersonBuff
     */
    showPersonBuffValue(): void;
}
export default PersonBuff;
