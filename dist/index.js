import DpsCore from './core/core';
import Support from './support/support';
import { YiJinJing } from './calculator';
var Calculator = /** @class */ (function () {
    function Calculator() {
    }
    Calculator.YiJinJing = YiJinJing;
    return Calculator;
}());
export default Calculator;
/**
 * 导出工具类
 *
 * @param DpsCore
 * 核心类
 *
 * @param Support
 * 辅助计算类
 */
export { DpsCore, Support };
/**
 * 导出计算器
 *
 * @param YiJinJing
 * 易筋经计算器
 */
export { YiJinJing };
//# sourceMappingURL=index.js.map