"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 个人增益 类
 *
 * @Author: centerm.gaohan
 * @Date: 2021-08-08 16:55:04
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-08 21:35:25
 */
var chalk = require("chalk");
var types_1 = require("../types");
var PersonBuff = /** @class */ (function () {
    function PersonBuff(options) {
        if (options === void 0) { options = {}; }
        /**
         * 套装情况
         *
         * @type {SetBonuse[]}
         * @memberof PersonBuff
         */
        this.setBonuses = [];
        this.options = options;
        /**
         * 设置附魔
         *
         * 默认全部附魔都有
         */
        this.enChants = options.enChants || [types_1.EnChants.EnChantBelt, types_1.EnChants.EnChantBody, types_1.EnChants.EnChantHand, types_1.EnChants.EnChantHead, types_1.EnChants.EnChantShoe];
        /**
         * 设置武器
         *
         * 默认橙武
         */
        this.weapon = options.weapon || types_1.Weapon.CW;
        /**
         * 设置套装属性
         *
         * 默认四件套
         */
        this.setBonuses = options.setBonuses || [types_1.SetBonuse.SkillSetBonuse, types_1.SetBonuse.ValueSetBonuse];
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
        return this.setBonuses.some(function (sb) { return sb === types_1.SetBonuse.SkillSetBonuse; });
    };
    /**
     * 打印套装详情
     *
     * @memberof PersonBuff
     */
    PersonBuff.prototype.showPersonBuffValue = function () {
        console.log(chalk.blue("\u4E2A\u4EBA\u589E\u76CA\uFF1A\n      \u9644\u9B54\uFF1A\n      " + (this.checkEnChant(types_1.EnChants.EnChantBelt) ? '-腰带附魔' : '') + "\n      " + (this.checkEnChant(types_1.EnChants.EnChantBody) ? '-衣服附魔' : '') + "\n      " + (this.checkEnChant(types_1.EnChants.EnChantHand) ? '-手附魔' : '') + "\n      " + (this.checkEnChant(types_1.EnChants.EnChantHead) ? '-头附魔' : '') + "\n      " + (this.checkEnChant(types_1.EnChants.EnChantShoe) ? '-鞋子附魔' : '') + "\n      \u6B66\u5668\uFF1A\n        " + this.weapon + "\n      \u5957\u88C5\uFF1A\n        " + (this.setBonuses.length === 2 ? '四件套' : this.setBonuses.length === 1 ? '两件套' : '无套装') + "\n    "));
    };
    return PersonBuff;
}());
exports.default = PersonBuff;
//# sourceMappingURL=person.js.map