"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 计算器基类
 *
 * @Author: centerm.gaohan
 * @Date: 2021-08-08 19:12:37
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-08 21:23:23
 */
var invariant = require("invariant");
var chalk = require("chalk");
var CalculatorBase = /** @class */ (function () {
    function CalculatorBase(options) {
        if (options === void 0) { options = {}; }
        /**
         * 技能列表
         *
         * @type {Array<Skill>}
         * @memberof CalculatorBase
         */
        this.skills = [];
        this.options = options;
        invariant(!!options.core, '核心类不能为空');
        this.core = options.core;
        invariant(!!options.support, '辅助类不能为空');
        this.support = options.support;
    }
    CalculatorBase.prototype.showCalculatorValue = function () {
        console.log(chalk.white("---- calculator start ----"));
        console.log(chalk.white("\u8BA1\u7B97\u5668\uFF1A\n      \u804C\u4E1A:" + this.professtion + "\n      \u5FC3\u6CD5:" + this.className + "\n    "));
        console.log(chalk.white("---- calculator end ----"));
    };
    CalculatorBase.prototype.showSkills = function () {
        console.log(chalk.white("---- showSkills start ----"));
        this.skills.forEach(function (skill) {
            console.log(chalk.white(skill.skillName));
        });
        console.log(chalk.white("---- showSkills end ----"));
    };
    CalculatorBase.prototype.showCoreValue = function () {
        this.core.showAttributes();
    };
    CalculatorBase.prototype.showSupportValue = function () {
        this.support.showSupportValue();
    };
    return CalculatorBase;
}());
exports.default = CalculatorBase;
//# sourceMappingURL=base.js.map