import { CharacterTypes } from '../types';
declare class DpsCore {
    /**
     * 装分
     *
     * @type {number}
     * @memberof DpsCore
     */
    score: number;
    /**
     * 角色主属性 元气 根骨 身法 力道 之一
     *
     * @type {CharacterTypes}
     * @memberof DpsCore
     */
    type: CharacterTypes;
    /**
     * 气血
     *
     * @type {number}
     * @memberof DpsCore
     */
    QiXue: number;
    /**
     * 基础攻击
     *
     * @type {number}
     * @memberof DpsCore
     */
    JiChuGongJi: number;
    /**
     * 总攻击
     *
     * @type {number}
     * @memberof DpsCore
     */
    ZongGongJi: number;
    /**
     * 计算面板攻击的系数
     *
     * @type {number}
     * @memberof DpsCore
     */
    GongJiCoefficient: number;
    /**
     * 武器伤害
     *
     * @type {number}
     * @memberof DpsCore
     */
    WuQiShangHai: number;
    /**
     * 会心
     *
     * @type {number}
     * @memberof DpsCore
     */
    HuiXin: number;
    /**
     * 会心等级
     *
     * @type {number}
     * @memberof DpsCore
     */
    HuiXinLevel: number;
    /**
     * 会心效果
     *
     * @type {number}
     * @memberof DpsCore
     */
    HuiXiao: number;
    /**
     * 会心效果等级
     *
     * @type {number}
     * @memberof DpsCore
     */
    HuiXiaoLevel: number;
    /**
     * 破防
     *
     * @type {number}
     * @memberof DpsCore
     */
    PoFang: number;
    /**
     * 破招
     *
     * @type {number}
     * @memberof DpsCore
     */
    PoZhao: number;
    /**
     * 加速
     *
     * @type {number}
     * @memberof DpsCore
     */
    JiaSu: number;
    /**
     * 无双
     *
     * @type {number}
     * @memberof DpsCore
     */
    WuShuang: number;
    /**
     * 元气
     *
     * @type {number}
     * @memberof DpsCore
     */
    YuanQi?: number;
    /**
     * 根骨
     *
     * @type {number}
     * @memberof DpsCore
     */
    GenGu?: number;
    /**
     * 力道
     *
     * @type {number}
     * @memberof DpsCore
     */
    LiDao?: number;
    /**
     * 身法
     *
     * @type {number}
     * @memberof DpsCore
     */
    ShenFa?: number;
    options: any;
    mainCoeffiecient: any;
    constructor(options: any);
    /**
     * 打印属性
     *
     * @memberof DpsCore
     */
    showAttributes(): void;
}
export default DpsCore;
