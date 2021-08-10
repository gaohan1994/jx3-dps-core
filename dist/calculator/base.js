"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
 * 计算器基类
 *
 * @Author: centerm.gaohan
 * @Date: 2021-08-08 19:12:37
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-10 18:04:25
 */
var invariant = require("invariant");
var chalk = require("chalk");
var core_1 = require("../core/core");
var support_1 = require("../support/support");
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
        /**
         * 技能次数库，由子类填充
         *
         * @type {{
         *     [name: string]: number;
         *   }}
         * @memberof CalculatorBase
         */
        this.skillTimesLib = {};
        this.options = options;
        invariant(!!options.support, '辅助类不能为空');
        this.support = new support_1.default(options.support);
        if (this.support.hasSkillSetBonuese()) {
            this.skillSetBonuseCoefficient = 0.0996;
        }
        else {
            this.skillSetBonuseCoefficient = 0;
        }
        this.seconds = options.seconds || (5 * 60);
    }
    /**
     * 传入技能名称返回战斗时间内该技能次数
     *
     * @param {string} skillName
     * @memberof CalculatorBase
     */
    CalculatorBase.prototype.getSkillTimes = function (skillName) {
        return this.skillTimesLib[skillName];
    };
    /**
     * 获得core类
     *
     * @return {*}  {Core}
     * @memberof CalculatorBase
     */
    CalculatorBase.prototype.getCore = function () {
        return this.core;
    };
    /**
     * 获得辅助类
     *
     * @return {*}  {SupportContext}
     * @memberof CalculatorBase
     */
    CalculatorBase.prototype.getSupportContext = function () {
        return this.supportContext;
    };
    CalculatorBase.prototype.getSupport = function () {
        return this.support;
    };
    /**
     * 获得目标类
     *
     * @return {*}  {Target}
     * @memberof CalculatorBase
     */
    CalculatorBase.prototype.getTarget = function () {
        return this.target;
    };
    /**
     * 添加技能
     *
     * @param {Skill[]} [skills=[]]
     * @memberof CalculatorBase
     */
    CalculatorBase.prototype.addSkills = function (skills) {
        var _a;
        if (skills === void 0) { skills = []; }
        (_a = this.skills).push.apply(_a, skills);
    };
    /**
     * 生成最终核心类
     *
     * @memberof CalculatorBase
     */
    CalculatorBase.prototype.initUltimate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var initCore, supportContext, core;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        initCore = new core_1.default(__assign(__assign({}, this.options.core), { mainCoeffiecient: function (YuanQi) {
                                return {
                                    JiChuGongJi: YuanQi * 0.18,
                                    ZongGongJi: YuanQi * 1.85,
                                };
                            } }));
                        return [4 /*yield*/, this.support.getSupportAttribute()];
                    case 1:
                        supportContext = _a.sent();
                        this.supportContext = supportContext;
                        core = this.generateUltimate(initCore, supportContext);
                        this.core = core;
                        this.target = this.support.target;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 基类 method 计算所有技能伤害
     *
     * @memberof CalculatorBase
     */
    CalculatorBase.prototype.executeCalculator = function () {
        return __awaiter(this, void 0, void 0, function () {
            var skillsArray, i, total;
            return __generator(this, function (_a) {
                skillsArray = [];
                for (i = 0; i < this.skills.length; i++) {
                    skillsArray.push(this.skills[i].calculator());
                }
                total = 0;
                skillsArray.forEach(function (skill) {
                    // skill.showSkillInfo();
                    total += skill.subTotal;
                });
                this.totalExpectation = total;
                this.dps = total / this.seconds;
                return [2 /*return*/, {
                        totalExpectation: this.totalExpectation,
                        seconds: this.seconds,
                        dps: this.dps,
                        skills: skillsArray
                    }];
            });
        });
    };
    /**
     * 计算
     *
     * @memberof CalculatorBase
     */
    CalculatorBase.prototype.total = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    /**
                     * 生成最终面板
                     */
                    return [4 /*yield*/, this.initUltimate()];
                    case 1:
                        /**
                         * 生成最终面板
                         */
                        _a.sent();
                        return [4 /*yield*/, this.addSkills()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, this.executeCalculator()];
                }
            });
        });
    };
    /**
     * 生成最终属性
     *
     * @memberof DpsCore
     */
    CalculatorBase.prototype.generateUltimate = function (core, ctx) {
        var _a;
        // console.log('ctx', ctx)
        /**
         * 最终core类
         *
         * @parma mainAttribute
         */
        var mainAttribute = core[core.type] + ctx.mainAttribute;
        /**
         * 计算基础攻击
         *
         * @param JiChuGongJi
         */
        var JiChuGongJi = core.JiChuGongJi + ctx.JiChuGongJi + (core.mainCoeffiecient(ctx.mainAttribute).JiChuGongJi || 0);
        /**
         * 计算最终会心、会心效果
         *
         * @param HuiXin
         */
        var HuiXin = core.HuiXin + ctx.HuiXin + (ctx.HuiXinLevel / 357.375);
        var HuiXiao = core.HuiXiao + ctx.HuiXiao * 100;
        /**
         * 计算最终破防
         *
         * @param PoFang
         */
        var PoFang = (core.PoFang + (ctx.PoFangLevel / 357.375)) * (1.15 + ctx.PoFangPercent);
        /**
         * 计算最终无双
         *
         * @param WuShuang
         */
        var WuShuang = core.WuShuang + ctx.WuShuang + (ctx.WuShuangLevel / 344.5875);
        var PoZhao = core.PoZhao + ctx.PoZhao;
        /**
         * 计算基础攻击系数
         */
        var GongJiCoefficient = 1 + ctx.JiChuGongJiPercent;
        var ultimate = new core_1.default((_a = {
                mainCoeffiecient: core.mainCoeffiecient,
                /**
                 * 设置主属性
                 */
                type: core.type
            },
            _a[core.type] = mainAttribute,
            /**
             * 设置基础攻击
             * 基础攻击系数
             */
            _a.JiChuGongJi = JiChuGongJi,
            _a.GongJiCoefficient = GongJiCoefficient,
            /**
             * 武器伤害不变
             *
             * @param WuQiShangHai
             */
            _a.WuQiShangHai = core.WuQiShangHai,
            /**
             * 设置会心、会心效果
             */
            _a.HuiXin = HuiXin,
            _a.HuiXiao = HuiXiao,
            /**
             * 设置破防 无双 破招 加速
             */
            _a.PoFang = PoFang,
            _a.WuShuang = WuShuang,
            _a.PoZhao = PoZhao,
            _a.JiaSu = core.JiaSu,
            _a));
        return ultimate;
    };
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