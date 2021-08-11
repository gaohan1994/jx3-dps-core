/**
 * 团队 和 小队增益
 * @Author: centerm.gaohan
 * @Date: 2021-08-08 17:18:52
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-11 15:21:55
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
import { SupportMode } from "../types";
import SupportBase from './base';
var TeamBuff = /** @class */ (function (_super) {
    __extends(TeamBuff, _super);
    function TeamBuff(options) {
        var _a, _b;
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        /**
         * 辅助类类型
         *
         * @memberof TeamBuff
         */
        _this.mode = SupportMode;
        /**
         * 阵法
         *
         * @type {Formation}
         * @memberof Support
         */
        _this.formation = undefined;
        _this.options = options;
        /**
         * 初始化阵法
         */
        _this.formation = options.formation;
        /**
         * 初始化类型
         */
        _this.mode = options.mode;
        /**
         * 初始化小队技能增益
         *
         * 如果传入则使用传入的技能增益，如果没有传入根据内外功划分
         */
        _this.teamSkillBuff = options.teamSkillBuff
            ? options.teamSkillBuff
            : [];
        (_a = _this.gainList).push.apply(_a, _this.teamSkillBuff);
        /**
         * 初始化团队技能增益
         *
         * 默认 朝圣言 + 弘法
         */
        _this.groupSkillBuff = options.groupSkillBuff || [];
        (_b = _this.gainList).push.apply(_b, _this.groupSkillBuff);
        return _this;
    }
    /**
     * 打印团队增益
     *
     * @memberof TeamBuff
     */
    TeamBuff.prototype.showTeamBuffValue = function () {
        console.log(chalk.green("\u56E2\u961F\u589E\u76CA\uFF1A\n      \u9635\u6CD5\uFF1A\n      " + (this.formation || '无') + "\n      \u5C0F\u961F\u6280\u80FD\u589E\u76CA\uFF1A\n      " + this.teamSkillBuff.join(', ') + "\n      \u56E2\u961F\u6280\u80FD\u589E\u76CA\uFF1A\n      " + this.groupSkillBuff.join(', ') + "\n    "));
    };
    return TeamBuff;
}(SupportBase));
export default TeamBuff;
//# sourceMappingURL=team.js.map