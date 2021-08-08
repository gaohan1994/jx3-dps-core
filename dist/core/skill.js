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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 技能类
 * @Author: centerm.gaohan
 * @Date: 2021-08-08 19:45:42
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-08 21:41:37
 */
var invariant = require("invariant");
var numeral = require("numeral");
var middleware_1 = require("../onion/middleware");
var Skill = /** @class */ (function () {
    function Skill(options) {
        /**
         * 中间件
         *
         * @memberof Skill
         */
        this.middlewares = {
            step1: undefined,
            step2: undefined,
            step3: undefined,
            step4: undefined
        };
        this.options = options;
        this.middleware = new middleware_1.default([]);
        invariant(!!options.skillName, '技能名称不能为空');
        this.skillName = options.skillName;
        invariant(typeof options.basicDamage === 'number', '基础伤害不能为空');
        this.basicDamage = options.basicDamage;
        invariant(typeof options.coefficient === 'number', '伤害系数不能为空');
        this.coefficient = options.coefficient;
        invariant(typeof options.skillTimes === 'number', '技能次数不能为空');
        this.skillTimes = options.skillTimes;
        this.step2Coefficient = options.step2Coefficient;
        if (!!options.middlewares) {
            this.middlewares = options.middlewares;
        }
    }
    /**
     * 计算技能伤害
     *
     * step1SkillDamage = basicDamage + (ZongGongJi * coefficient)
     *
     * @param {number} ZongGongJi
     * @return {*}  {number}
     * @memberof Skill
     */
    Skill.prototype.step1 = function (ctx, next) {
        if (!ctx) {
            return next();
        }
        ctx.step1SkillDamage = formatNumber(ctx.basicDamage + (ctx.core.ZongGongji * ctx.coefficient));
        return next();
    };
    /**
     * 计算奇穴、秘籍、加成之后的伤害
     *
     * step2SkillDamage = step1SkillDamage * QiXueAndMiJiCoefficient
     *
     * @return {*}  {number}
     * @memberof Skill
     */
    Skill.prototype.step2 = function (ctx, next) {
        if (!ctx) {
            return next();
        }
        ctx.step2SkillDamage = formatNumber(ctx.step1SkillDamage * ctx.step2Coefficient);
        return next();
    };
    /**
     * 计算经过破防无双加成之后的值
     *
     * step3SkillDamage = this.step2SkillDamage * (1 + PoFang) * (1 + WuShuang)
     *
     * @param {number} PoFang
     * @param {number} WuShuang
     * @return {*}  {this}
     * @memberof Skill
     */
    Skill.prototype.step3 = function (ctx, next) {
        if (!ctx) {
            return next();
        }
        ctx.step3SkillDamage = formatNumber(ctx.step2SkillDamage * (1 + ctx.core.PoFang / 100) * (1 + ctx.core.WuShuang / 100));
        return next();
    };
    /**
     * 计算双会加成之后的技能伤害
     *
     *
     *
     * @param {number} HuiXin
     * @param {number} HuiXiao
     * @param {Step4Config} [config={}]
     * @return {*}  {this}
     * @memberof Skill
     */
    Skill.prototype.step4 = function (ctx, next) {
        if (!ctx) {
            return next();
        }
        ctx.step4SkillDamage = formatNumber(ctx.step3SkillDamage * ((ctx.core.HuiXin / 100) * (ctx.core.HuiXiao / 100) + 1 - (ctx.core.HuiXin / 100)));
        return this;
    };
    Skill.prototype.checkMiddleware = function (middleware) {
        return middleware !== undefined && typeof middleware === 'function';
    };
    Skill.prototype.calculator = function (ctx) {
        var _this = this;
        /**
         * 补充完整 SkillContext
         *
         * @param ctx
         */
        ctx = __assign(__assign({}, ctx), { skillName: this.skillName, basicDamage: this.basicDamage, coefficient: this.coefficient, skillTimes: this.skillTimes, step2Coefficient: this.step2Coefficient });
        this.middleware.use(this.step1);
        if (this.checkMiddleware(this.middlewares.step1)) {
            this.middleware.use(this.middlewares.step1);
        }
        this.middleware.use(this.step2);
        if (this.checkMiddleware(this.middlewares.step2)) {
            this.middleware.use(this.middlewares.step2);
        }
        this.middleware.use(this.step3);
        if (this.checkMiddleware(this.middlewares.step3)) {
            this.middleware.use(this.middlewares.step3);
        }
        this.middleware.use(this.step4);
        if (this.checkMiddleware(this.middlewares.step4)) {
            this.middleware.use(this.middlewares.step4);
        }
        return new Promise(function (resolve, reject) {
            _this.middleware
                .execute(ctx)
                .then(function () {
                resolve(ctx);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    return Skill;
}());
exports.default = Skill;
function formatNumber(value) {
    return numeral(numeral(value).format('0.00')).value();
}
//# sourceMappingURL=skill.js.map