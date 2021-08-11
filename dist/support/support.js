/**
 * 辅助类
 *
 * @Author: centerm.gaohan
 * @Date: 2021-08-08 16:29:54
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-11 15:21:44
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import invariant from 'invariant';
import chalk from 'chalk';
import { SupportMode, SetBonuse } from "../types";
import { CoreMiddleware } from '../onion';
import { Target, SupportBase } from './index';
var Support = /** @class */ (function (_super) {
    __extends(Support, _super);
    function Support(options) {
        var _this = _super.call(this, options) || this;
        /**
         * 个人增益模块
         *
         * @type {PersonBuff}
         * @memberof Support
         */
        // public personBuff: PersonBuff = undefined;
        /**
         * 团队增益模块
         *
         * @type {TeamBuff}
         * @memberof Support
         */
        // public teamBuff: TeamBuff = undefined;
        /**
         * 目标
         *
         * @type {Target}
         * @memberof Support
         */
        _this.target = undefined;
        _this.options = options;
        invariant(!!options.mode, '辅助类类型不能为空');
        _this.mode = options.mode;
        /**
         * 初始化个人增益
         */
        // this.personBuff = new PersonBuff(options);
        /**
         * 初始化团队增益
         */
        // this.teamBuff = new TeamBuff(options);
        /**
         * 初始化目标
         */
        _this.target = new Target(options.target);
        return _this;
    }
    /**
     * 获得辅助总增益
     *
     * @return {*}  {Promise<SupportContext>}
     * @memberof Support
     */
    Support.prototype.getSupportAttribute = function () {
        var ctx = {
            mainAttribute: 0,
            damageBonus: 0,
            JiChuGongJi: 0,
            JiChuGongJiPercent: 0,
            PoFangPercent: 0,
            PoFangLevel: 0,
            HuiXin: 0,
            HuiXinLevel: 0,
            HuiXiao: 0,
            HuiXiaoLevel: 0,
            MingZhong: 0,
            MingZhongLevel: 0,
            WuShuang: 0,
            WuShuangLevel: 0,
            PoZhao: 0,
        };
        var middleware = new CoreMiddleware([]);
        middleware.use(this.countCurrentSupportGain.bind(this));
        return new Promise(function (resolve, reject) {
            middleware
                .execute(ctx)
                .then(function () {
                resolve(ctx);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    /**
     * 打印属性
     *
     * @memberof Support
     */
    Support.prototype.showSupportValue = function () {
        console.log(chalk.blue("---- support start ----"));
        this.target.showTargetValue();
        console.log(chalk.blue("---- support end ----"));
    };
    /**
     * 是否有技能套装
     *
     * @return {*}
     * @memberof PersonBuff
     */
    Support.prototype.hasSkillSetBonuese = function () {
        return this.gainList.some(function (g) { return g.name === SetBonuse.SkillSetBonuse; });
    };
    Support.prototype.hasCw = function () {
        return this.gainList.some(function (g) { return g.name === 'CW'; });
    };
    /**
     * 是否由属性套装
     *
     * @return {*}
     * @memberof PersonBuff
     */
    Support.prototype.hasValueSetBonuese = function () {
        return this.gainList.some(function (g) { return g.name === SetBonuse.ValueSetBonuse; });
    };
    Support.Mode = SupportMode;
    return Support;
}(SupportBase));
export default Support;
//# sourceMappingURL=support.js.map