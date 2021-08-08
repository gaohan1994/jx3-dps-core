"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 计算器核心类
 *
 * @Author: centerm.gaohan
 * @Date: 2021-08-07 20:43:49
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-08 16:16:00
 */
var invariant = require("invariant");
var chalk = require("chalk");
var types_1 = require("../types");
var DpsCore = /** @class */ (function () {
    function DpsCore(options) {
        var _this = this;
        /**
         * 获取角色类型
         *
         * @memberof DpsCore
         */
        this.getCharacterType = function () {
            switch (_this.type) {
                case types_1.CharacterTypes.GenGu:
                    return '根骨';
                case types_1.CharacterTypes.LiDao:
                    return '力道';
                case types_1.CharacterTypes.ShenFa:
                    return '身法';
                case types_1.CharacterTypes.YuanQi:
                    return '元气';
                default:
                    return;
            }
        };
        this.options = options;
        // invariant(typeof options.type === 'number', '角色类型不能为空');
        invariant(typeof options.ZongGongji === 'number', '总攻击不能为空');
        invariant(typeof options.JiChuGongJi === 'number', '攻击不能为空');
        // invariant(typeof options.HuiXin === 'number', '会心不能为空');
        // invariant(typeof options.HuiXiao === 'number', '会心效果不能为空');
        invariant(typeof options.PoFang === 'number', '破防不能为空');
        invariant(typeof options.PoZhao === 'number', '破招不能为空');
        invariant(typeof options.JiaSu === 'number', '加速不能为空');
        invariant(typeof options.WuShuang === 'number', '无双不能为空');
        invariant(typeof options.YuanQi === 'number' ||
            typeof options.GenGu === 'number' ||
            typeof options.LiDao === 'number' ||
            typeof options.ShenFa === 'number', '主属性不能为空');
        this.score = options.score;
        this.type = options.type;
        this.JiChuGongJi = options.JiChuGongJi;
        this.ZongGongji = options.ZongGongji;
        this.HuiXin = options.HuiXin;
        this.HuiXiao = options.HuiXiao;
        this.PoFang = options.PoFang;
        this.PoZhao = options.PoZhao;
        this.JiaSu = options.JiaSu;
        this.WuShuang = options.WuShuang;
        this.YuanQi = options.YuanQi;
        this.GenGu = options.GenGu;
        this.LiDao = options.LiDao;
        this.ShenFa = options.ShenFa;
    }
    /**
     * 计算会心等级
     *
     * @memberof DpsCore
     */
    DpsCore.prototype.calculatorHuiXinLevel = function () {
    };
    /**
     * 计算会心
     *
     * @memberof DpsCore
     */
    DpsCore.prototype.calculatorHuiXin = function () {
        invariant(typeof this.options.HuiXinLevel === 'number', '会心等级不能为空');
        this.HuiXin = 100 * this.options.HuiXinLevel / (this.options.HuiXinLevel + 74 * 110 + 320);
        return this;
    };
    /**
     * 打印属性
     *
     * @memberof DpsCore
     */
    DpsCore.prototype.showAttributes = function () {
        console.log(chalk.green("\u88C5\u5206 " + this.score));
        console.log(chalk.blue("\u4E3B\u5C5E\u6027 " + this.getCharacterType() + " " + (this.YuanQi || this.LiDao || this.GenGu || this.ShenFa)));
        console.log(chalk.yellow("\u57FA\u7840\u653B\u51FB " + this.JiChuGongJi));
        console.log(chalk.yellow("\u603B\u653B\u51FB " + this.ZongGongji));
        console.log(chalk.yellow("\u4F1A\u5FC3 " + this.HuiXin));
        console.log(chalk.yellow("\u4F1A\u5FC3\u6548\u679C " + this.HuiXiao));
        console.log(chalk.yellow("\u7834\u9632 " + this.PoFang));
        console.log(chalk.yellow("\u7834\u62DB " + this.PoZhao));
        console.log(chalk.yellow("\u52A0\u901F " + this.JiaSu));
        console.log(chalk.yellow("\u65E0\u53CC " + this.WuShuang));
    };
    return DpsCore;
}());
exports.default = DpsCore;
//# sourceMappingURL=index.js.map