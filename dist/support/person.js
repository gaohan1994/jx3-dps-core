/**
 * 个人增益 类
 *
 * @Author: centerm.gaohan
 * @Date: 2021-08-08 16:55:04
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-11 15:21:36
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
import chalk from 'chalk';
import { EnChants, Weapon, SetBonuse } from '../types';
import SupportBase from './base';
import { SetBonusesGain } from '../config/config';
var PersonBuff = /** @class */ (function (_super) {
    __extends(PersonBuff, _super);
    function PersonBuff(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        /**
         * 套装情况
         *
         * @type {SetBonuse[]}
         * @memberof PersonBuff
         */
        _this.setBonuses = [];
        _this.options = options;
        /**
         * 设置附魔
         *
         * 默认全部附魔都有
         */
        _this.enChants = options.enChants || [EnChants.EnChantBelt, EnChants.EnChantBody, EnChants.EnChantHand, EnChants.EnChantHead, EnChants.EnChantShoe];
        /**
         * 设置武器
         *
         * 默认橙武
         */
        _this.weapon = options.weapon || Weapon.CW;
        /**
         * 设置套装属性
         *
         * 默认四件套
         */
        _this.setBonuses = options.setBonuses || [];
        if (_this.hasValueSetBonuese()) {
            _this.gainList.push(SetBonusesGain.ValueSetBonuse);
        }
        return _this;
    }
    /**
     * 校验是否存在传入的附魔
     *
     * @param {EnChants} targetEnChant
     * @return {*}
     * @memberof PersonBuff
     */
    PersonBuff.prototype.checkEnChant = function (targetEnChant) {
        return this.enChants.some(function (ec) { return ec === targetEnChant; });
    };
    /**
     * 是否有技能套装
     *
     * @return {*}
     * @memberof PersonBuff
     */
    PersonBuff.prototype.hasSkillSetBonuese = function () {
        return this.setBonuses.some(function (sb) { return sb === SetBonuse.SkillSetBonuse; });
    };
    /**
     * 是否由属性套装
     *
     * @return {*}
     * @memberof PersonBuff
     */
    PersonBuff.prototype.hasValueSetBonuese = function () {
        return this.setBonuses.some(function (sb) { return sb === SetBonuse.ValueSetBonuse; });
    };
    /**
     * 打印套装详情
     *
     * @memberof PersonBuff
     */
    PersonBuff.prototype.showPersonBuffValue = function () {
        console.log(chalk.blue("\u4E2A\u4EBA\u589E\u76CA\uFF1A\n      \u9644\u9B54\uFF1A\n      " + (this.checkEnChant(EnChants.EnChantBelt) ? '-腰带附魔' : '') + "\n      " + (this.checkEnChant(EnChants.EnChantBody) ? '-衣服附魔' : '') + "\n      " + (this.checkEnChant(EnChants.EnChantHand) ? '-手附魔' : '') + "\n      " + (this.checkEnChant(EnChants.EnChantHead) ? '-头附魔' : '') + "\n      " + (this.checkEnChant(EnChants.EnChantShoe) ? '-鞋子附魔' : '') + "\n      \u6B66\u5668\uFF1A\n        " + this.weapon + "\n      \u5957\u88C5\uFF1A\n        " + (this.setBonuses.length === 2 ? '四件套' : this.setBonuses.length === 1 ? '两件套' : '无套装') + "\n    "));
    };
    return PersonBuff;
}(SupportBase));
export default PersonBuff;
//# sourceMappingURL=person.js.map