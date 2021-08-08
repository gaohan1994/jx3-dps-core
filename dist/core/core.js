"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 计算器核心类
 *
 * @Author: centerm.gaohan
 * @Date: 2021-08-07 20:43:49
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-08 19:27:35
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
        invariant(typeof options.ZongGongji === 'number', '总攻击不能为空');
        this.ZongGongji = options.ZongGongji;
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
        invariant(typeof options.YuanQi === 'number' ||
            typeof options.GenGu === 'number' ||
            typeof options.LiDao === 'number' ||
            typeof options.ShenFa === 'number', '主属性不能为空');
        this.YuanQi = options.YuanQi;
        this.GenGu = options.GenGu;
        this.LiDao = options.LiDao;
        this.ShenFa = options.ShenFa;
        this.score = options.score;
        this.type = options.type;
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
        console.log(chalk.yellow("\n      \u4E3B\u5C5E\u6027 " + this.getCharacterType() + " " + (this.YuanQi || this.LiDao || this.GenGu || this.ShenFa) + "\n      \u6B66\u5668\u4F24\u5BB3 " + this.WuQiShangHai + "\n      \u57FA\u7840\u653B\u51FB " + this.JiChuGongJi + "\n      \u603B\u653B\u51FB " + this.ZongGongji + "\n      \u4F1A\u5FC3 " + this.HuiXin + "\n      \u4F1A\u5FC3\u6548\u679C " + this.HuiXiao + "\n      \u7834\u9632 " + this.PoFang + "\n      \u7834\u62DB " + this.PoZhao + "\n      \u52A0\u901F " + this.JiaSu + "\n      \u65E0\u53CC " + this.WuShuang + " \n    "));
        console.log(chalk.yellow("---- core end ----"));
    };
    return DpsCore;
}());
exports.default = DpsCore;
//# sourceMappingURL=core.js.map