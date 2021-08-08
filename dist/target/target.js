"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../types");
/**
 * 目标类
 *
 * @Author: centerm.gaohan
 * @Date: 2021-08-08 16:16:36
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-08 16:21:29
 */
var Target = /** @class */ (function () {
    function Target(options) {
        this.options = options;
        /**
         * 初始化目标类型，默认木桩
         */
        this.mode = options.mode || types_1.TargetMode.MuZhuang;
        /**
         * 初始化目标等级，默认110
         */
        this.level = options.level || 110;
    }
    return Target;
}());
exports.default = Target;
//# sourceMappingURL=target.js.map