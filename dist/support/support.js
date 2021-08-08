"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 辅助类
 *
 * @Author: centerm.gaohan
 * @Date: 2021-08-08 16:29:54
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-08 21:34:24
 */
var chalk = require("chalk");
var invariant = require("invariant");
var person_1 = require("./person");
var team_1 = require("./team");
var target_1 = require("./target");
var Support = /** @class */ (function () {
    function Support(options) {
        if (options === void 0) { options = {}; }
        /**
         * 个人增益模块
         *
         * @type {PersonBuff}
         * @memberof Support
         */
        this.personBuff = undefined;
        /**
         * 团队增益模块
         *
         * @type {TeamBuff}
         * @memberof Support
         */
        this.teamBuff = undefined;
        /**
         * 目标
         *
         * @type {Target}
         * @memberof Support
         */
        this.target = undefined;
        this.options = options;
        invariant(!!options.mode, '辅助类类型不能为空');
        this.mode = options.mode;
        /**
         * 初始化个人增益
         */
        this.personBuff = new person_1.default(options.person);
        /**
         * 初始化团队增益
         */
        this.teamBuff = new team_1.default(options.team);
        /**
         * 初始化目标
         */
        this.target = new target_1.default(options.target);
    }
    Support.prototype.showSupportValue = function () {
        console.log(chalk.blue("---- support start ----"));
        this.personBuff.showPersonBuffValue();
        this.teamBuff.showTeamBuffValue();
        this.target.showTargetValue();
        console.log(chalk.blue("---- support end ----"));
    };
    return Support;
}());
exports.default = Support;
//# sourceMappingURL=support.js.map