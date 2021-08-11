/**
 * 目标类
 *
 * @Author: centerm.gaohan
 * @Date: 2021-08-08 18:41:58
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-11 15:21:50
 */
import { TargetBossList, TargetMuZhuangList } from "../types";
export declare type TargetOptions = TargetBossList | TargetMuZhuangList;
declare class Target {
    static TargetList: {
        [x: number]: {
            name: any;
            defenseCoefficient: number;
            neiFang: number;
            level: number;
        };
    };
    options: any;
    name: TargetBossList | TargetMuZhuangList;
    /**
     * 防御系数
     *
     * @type {number}
     * @memberof TargetInterface
     */
    defenseCoefficient: number;
    /**
     * 伤害系数
     *
     * @type {number}
     * @memberof TargetInterface
     */
    damageCoefficient: number;
    /**
     * 内防
     *
     * @type {number}
     * @memberof TargetInterface
     */
    neiFang: number;
    /**
     * 等级
     *
     * @type {number}
     * @memberof TargetInterface
     */
    level: number;
    constructor(options: TargetOptions);
    showTargetValue(): void;
}
export default Target;
