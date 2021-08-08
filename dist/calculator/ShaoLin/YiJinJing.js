"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 易筋经计算器
 *
 * @Author: centerm.gaohan
 * @Date: 2021-08-08 18:35:26
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-08 21:42:03
 */
var base_1 = require("../base");
var skill_1 = require("../../core/skill");
var YiJinJing = /** @class */ (function (_super) {
    __extends(YiJinJing, _super);
    function YiJinJing(options) {
        var _this = _super.call(this, options) || this;
        _this.professtion = '少林';
        _this.className = '易筋经';
        /**
         * 是否有技能特效
         */
        var hasSkillSetBonuese = _this.support.personBuff.hasSkillSetBonuese();
        var weiTuoXianChu = new skill_1.default({
            skillName: '韦陀献杵',
            basicDamage: 179,
            coefficient: 1.66,
            skillTimes: 25,
            step2Coefficient: (1.12 + 0.0996 + (hasSkillSetBonuese ? 0.0996 : 0) + 0.3 * 0.3) * 1.2
        });
        _this.skills.push(weiTuoXianChu);
        return _this;
    }
    YiJinJing.prototype.calculatorSkills = function () {
        var promises = [];
        for (var i = 0; i < this.skills.length; i++) {
            promises.push(this.skills[i].calculator({
                core: this.core,
                support: this.support,
            }));
        }
        Promise.all(promises)
            .then(function (responses) {
            console.log('responses:', responses);
        });
    };
    return YiJinJing;
}(base_1.default));
exports.default = YiJinJing;
//# sourceMappingURL=YiJinJing.js.map