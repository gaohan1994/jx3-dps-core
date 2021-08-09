"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 目标类
 *
 * @Author: centerm.gaohan
 * @Date: 2021-08-08 18:41:58
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-09 16:10:28
 */
var chalk = require("chalk");
var types_1 = require("../types");
var Target = /** @class */ (function () {
    function Target(options) {
        if (options === void 0) { options = {}; }
        this.options = options;
        /**
         * 设置当前目标如果没传入默认 111 木桩
         */
        var currentTarget = options !== undefined && typeof options.name === 'string'
            ? options
            : Target.TargetList.MuZhuang[types_1.TargetMuZhuangList.MuZhuang111];
        this.name = currentTarget.name;
        this.level = currentTarget.level;
        this.defenseCoefficient = currentTarget.defenseCoefficient;
        this.neiFang = currentTarget.neiFang;
        this.damageCoefficient = currentTarget.defenseCoefficient / (currentTarget.neiFang + currentTarget.defenseCoefficient);
    }
    Target.prototype.showTargetValue = function () {
        console.log(chalk.red("\u76EE\u6807\uFF1A" + this.name + "\n      \u7B49\u7EA7\uFF1A" + this.level + "\n      \u4F24\u5BB3\u7CFB\u6570\uFF1A" + this.damageCoefficient + "\n      \u9632\u5FA1\u7CFB\u6570\uFF1A" + this.defenseCoefficient + "\n      \u5185\u9632\uFF1A" + this.neiFang + "\n    "));
    };
    Target.TargetList = {
        Boss: (_a = {},
            _a[types_1.TargetBossList.DaMoDong] = {
                name: types_1.TargetBossList.DaMoDong,
                defenseCoefficient: 23265.87,
                neiFang: 12528,
                level: 113,
            },
            _a),
        MuZhuang: (_b = {},
            _b[types_1.TargetMuZhuangList.MuZhuang111] = {
                name: types_1.TargetMuZhuangList.MuZhuang111,
                defenseCoefficient: 20134.905,
                neiFang: 5034,
                level: 111
            },
            _b)
    };
    return Target;
}());
exports.default = Target;
//# sourceMappingURL=target.js.map