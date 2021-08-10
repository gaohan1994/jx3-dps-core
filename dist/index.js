"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YiJinJing = exports.Support = exports.DpsCore = void 0;
var core_1 = require("./core/core");
exports.DpsCore = core_1.default;
var support_1 = require("./support/support");
exports.Support = support_1.default;
var calculator_1 = require("./calculator");
Object.defineProperty(exports, "YiJinJing", { enumerable: true, get: function () { return calculator_1.YiJinJing; } });
var Calculator = /** @class */ (function () {
    function Calculator() {
    }
    Calculator.YiJinJing = calculator_1.YiJinJing;
    return Calculator;
}());
exports.default = Calculator;
//# sourceMappingURL=index.js.map