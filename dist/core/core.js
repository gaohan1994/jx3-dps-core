"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 计算器核心类
 *
 * @Author: centerm.gaohan
 * @Date: 2021-08-07 20:43:49
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-09 17:47:14
 */
var invariant = require("invariant");
var chalk = require("chalk");
var types_1 = require("../types");
var DpsCore = /** @class */ (function () {
    function DpsCore(options) {
        this.options = options;
        invariant(typeof options.JiChuGongJi === 'number', '攻击不能为空');
        this.JiChuGongJi = options.JiChuGongJi;
        invariant(typeof options.PoFang === 'number', '破防不能为空');
        this.PoFang = options.PoFang;
        invariant(typeof options.PoZhao === 'number', '破招不能为空');
        this.PoZhao = options.PoZhao;
        invariant(typeof options.JiaSu === 'number', '加速不能为空');
        this.JiaSu = options.JiaSu;
        invariant(typeof options.WuShuang === 'number', '无双不能为空');
        this.WuShuang = options.WuShuang;
        invariant(typeof options.WuQiShangHai === 'number', '武器伤害不能为空');
        this.WuQiShangHai = options.WuQiShangHai;
        invariant(typeof options.mainCoeffiecient === 'function', '主属性设置不能为空');
        this.mainCoeffiecient = options.mainCoeffiecient;
        invariant(typeof options.YuanQi === 'number' ||
            typeof options.GenGu === 'number' ||
            typeof options.LiDao === 'number' ||
            typeof options.ShenFa === 'number', '主属性不能为空');
        if (options.YuanQi !== undefined) {
            this.YuanQi = options.YuanQi;
            this.type = types_1.CharacterTypes.YuanQi;
        }
        if (options.GenGu !== undefined) {
            this.GenGu = options.GenGu;
            this.type = types_1.CharacterTypes.GenGu;
        }
        if (options.LiDao !== undefined) {
            this.LiDao = options.LiDao;
            this.type = types_1.CharacterTypes.LiDao;
        }
        if (options.ShenFa !== undefined) {
            this.ShenFa = options.ShenFa;
            this.type = types_1.CharacterTypes.ShenFa;
        }
        this.type = options.type;
        if (options.ZongGongJi) {
            /**
             * 如果传入的总攻击则使用传入的
             */
            this.ZongGongJi = options.ZongGongJi;
        }
        else {
            /**
             * 如果没传入总攻击则计算，需要传入攻击系数
             */
            this.GongJiCoefficient = options.GongJiCoefficient || 1;
            var ZGJ = options.mainCoeffiecient(this[this.type]).ZongGongJi + this.JiChuGongJi * this.GongJiCoefficient;
            this.ZongGongJi = ZGJ;
        }
        this.score = options.score;
        this.HuiXin = options.HuiXin;
        this.HuiXiao = options.HuiXiao;
    }
    /**
     * 打印属性
     *
     * @memberof DpsCore
     */
    DpsCore.prototype.showAttributes = function () {
        console.log(chalk.yellow("---- core start ----"));
        console.log(chalk.yellow("\n      \u4E3B\u5C5E\u6027 " + (this.YuanQi || this.LiDao || this.GenGu || this.ShenFa) + "\n      \u6B66\u5668\u4F24\u5BB3 " + this.WuQiShangHai + "\n      \u57FA\u7840\u653B\u51FB " + this.JiChuGongJi + "\n      \u603B\u653B\u51FB " + this.ZongGongJi + "\n      \u4F1A\u5FC3 " + this.HuiXin + "\n      \u4F1A\u5FC3\u6548\u679C " + this.HuiXiao + "\n      \u7834\u9632 " + this.PoFang + "\n      \u7834\u62DB " + this.PoZhao + "\n      \u52A0\u901F " + this.JiaSu + "\n      \u65E0\u53CC " + this.WuShuang + "\n    "));
        console.log(chalk.yellow("----core end----"));
    };
    return DpsCore;
}());
exports.default = DpsCore;
//# sourceMappingURL=core.js.map