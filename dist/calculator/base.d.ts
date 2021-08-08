import Core from '../core/core';
import Support from '../support/support';
declare class CalculatorBase {
    options: any;
    /**
     * 核心类
     *
     * @type {Core}
     * @memberof CalculatorBase
     */
    core: Core;
    /**
     * 辅助类
     *
     * @type {Support}
     * @memberof CalculatorBase
     */
    support: Support;
    /**
     * 职业
     *
     * @type {string}
     * @memberof CalculatorBase
     */
    professtion: string;
    /**
     * 心法
     *
     * @type {string}
     * @memberof CalculatorBase
     */
    className: string;
    constructor(options?: any);
    showCalculatorValue(): void;
    showCoreValue(): void;
    showSupportValue(): void;
}
export default CalculatorBase;
