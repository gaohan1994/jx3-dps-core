import { TargetBossList, TargetMuZhuangList } from "../types";
declare class Target {
    static TargetList: {
        Boss: {
            DaMoDong: {
                name: TargetBossList;
                defenseCoefficient: number;
                neiFang: number;
                level: number;
            };
        };
        MuZhuang: {
            MuZhuang111: {
                name: TargetMuZhuangList;
                defenseCoefficient: number;
                neiFang: number;
                level: number;
            };
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
    constructor(options?: any);
    showTargetValue(): void;
}
export default Target;
