"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 团队 和 小队增益
 * @Author: centerm.gaohan
 * @Date: 2021-08-08 17:18:52
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-08 19:10:49
 */
var chalk = require("chalk");
var types_1 = require("../types");
var TeamBuff = /** @class */ (function () {
    function TeamBuff(options) {
        if (options === void 0) { options = {}; }
        /**
         * 辅助类类型
         *
         * @memberof TeamBuff
         */
        this.mode = types_1.SupportMode;
        /**
         * 阵法
         *
         * @type {Formation}
         * @memberof Support
         */
        this.formation = undefined;
        this.options = options;
        /**
         * 初始化阵法
         */
        this.formation = options.formation;
        /**
         * 初始化类型
         */
        this.mode = options.mode;
        /**
         * 初始化小队技能增益
         *
         * 如果传入则使用传入的技能增益，如果没有传入根据内外功划分
         */
        this.teamSkillBuff = options.teamSkillBuff
            ? options.teamSkillBuff
            : options.mode === types_1.SupportMode.NeiGong
                ? [types_1.TeamSkillBuffNeiGong.PoCangQiong, types_1.TeamSkillBuffNeiGong.QingJuan, types_1.TeamSkillBuffNeiGong.XiuQi]
                : [types_1.TeamSkillBuffWaiGong.JiLei, types_1.TeamSkillBuffWaiGong.Jiu, types_1.TeamSkillBuffWaiGong.SuiXingChen, types_1.TeamSkillBuffWaiGong.YinMeiXiang];
        /**
         * 初始化团队技能增益
         *
         * 默认 朝圣言 + 弘法
         */
        this.groupSkillBuff = options.groupSkillBuff || [types_1.GroupSkillBuff.ChaoShengYan, types_1.GroupSkillBuff.HongFa];
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
}());
exports.default = TeamBuff;
//# sourceMappingURL=team.js.map