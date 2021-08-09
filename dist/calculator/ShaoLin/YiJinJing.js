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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 易筋经计算器
 *
 * 加法计算：二业加成0.0996秘籍加成3+4+5%,30%佛果触发30% 4件套10% CW特效5%
 *
 * 乘法计算: 幻身100% 众嗔20%
 *
 * @Author: centerm.gaohan
 * @Date: 2021-08-08 18:35:26
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-09 18:23:25
 */
var base_1 = require("../base");
var skill_1 = require("../../core/skill");
var config_1 = require("../../config/config");
var config_2 = require("./config");
var YiJinJing = /** @class */ (function (_super) {
    __extends(YiJinJing, _super);
    function YiJinJing(options) {
        var _a;
        var _this = _super.call(this, options) || this;
        _this.professtion = '少林';
        _this.className = '易筋经';
        _this.skillTimesLib = (_a = {},
            _a[config_2.SkillNames.WeiTuoXianChu] = 25,
            _a);
        /**
         * 技能增益列表
         */
        _this.support.use(config_2.shaoLinSkills.JinGangNuMu);
        _this.support.use(config_2.shaoLinSkills.QinLongJue);
        _this.support.use(config_1.TeamSkills.FenLan);
        _this.support.use(config_1.TeamSkills.PoCangQiong);
        _this.support.use(config_1.TeamSkills.XiuQi);
        /**
         * 套装
         */
        _this.support.use(config_1.SetBonusesGain.ValueSetBonuse);
        _this.support.use(config_1.SetBonusesGain.SkillSetBonuse);
        _this.support.showGain();
        return _this;
    }
    YiJinJing.prototype.addSkills = function () {
        return __awaiter(this, void 0, void 0, function () {
            var BaseCoefficient, ErYeYiYuanCoefficient, ZhongChenCoefficient, FoGuoCoefficient, MiJiCoefficient, skills, liuHeGunWeiTuo, liuHeGunWeiTuoResult, weiTuoXianChu;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        BaseCoefficient = 1;
                        ErYeYiYuanCoefficient = 0.0996;
                        ZhongChenCoefficient = 1.2;
                        FoGuoCoefficient = 0.3 * 0.3;
                        MiJiCoefficient = 0.12;
                        skills = [];
                        liuHeGunWeiTuo = new skill_1.default({
                            skillName: '韦陀触发六合棍',
                            basicDamage: this.options.core.WuQiShangHai,
                            coefficient: 0,
                            skillTimes: this.getSkillTimes(config_2.SkillNames.WeiTuoXianChu) * 2,
                            step2Coefficient: 1.0996,
                            step4Coefficient: 0.05 * 1.75 + 1 - 0.05
                        });
                        liuHeGunWeiTuo.use('step2', function (ctx, next) {
                            // 六合棍只计算无双
                            var coefficient = 1 + (ctx.core.WuShuang / 100);
                            ctx.step3Coefficient = coefficient;
                            return next();
                        });
                        return [4 /*yield*/, this.execute(liuHeGunWeiTuo)];
                    case 1:
                        liuHeGunWeiTuoResult = _a.sent();
                        weiTuoXianChu = new skill_1.default({
                            skillName: '韦陀献杵',
                            basicDamage: 179,
                            coefficient: 1.66,
                            skillTimes: this.getSkillTimes(config_2.SkillNames.WeiTuoXianChu),
                            step2Coefficient: (BaseCoefficient + MiJiCoefficient + ErYeYiYuanCoefficient + (this.support.hasSkillSetBonuese() ? this.skillCoefficient : 0) + FoGuoCoefficient) * ZhongChenCoefficient,
                            step6Coefficient: 1.11, // 明发 1.11
                        });
                        weiTuoXianChu.use('step4', function (ctx, next) {
                            // 韦陀拿云减少目标60%内防等级;
                            var ingoreDefense = 0.4 * ctx.target.neiFang;
                            var coefficient = ctx.target.defenseCoefficient / (ctx.target.defenseCoefficient + ingoreDefense);
                            ctx.step5Coefficient = coefficient;
                            return next();
                        });
                        weiTuoXianChu.use('step6', function (ctx, next) {
                            // 添加韦陀触发的六合棍
                            ctx.subTotal = ctx.subTotal + liuHeGunWeiTuoResult.subTotal;
                            return next();
                        });
                        skills.push(weiTuoXianChu);
                        _super.prototype.addSkills.call(this, skills);
                        return [2 /*return*/];
                }
            });
        });
    };
    return YiJinJing;
}(base_1.default));
exports.default = YiJinJing;
//# sourceMappingURL=YiJinJing.js.map