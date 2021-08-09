/**
 * 易筋经计算器
 *
 * 加法计算：二业加成0.0996秘籍加成3+4+5%,30%佛果触发30% 4件套10% CW特效5%
 *
 * 乘法计算: 幻身100% 众嗔20%
 *
 * @Author: centerm.gaohan
 * @Date: 2021-08-08 18:35:26
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-09 18:23:25
 */
import CalculatorBase from "../base";
declare class YiJinJing extends CalculatorBase {
    constructor(options: any);
    addSkills(): Promise<void>;
}
export default YiJinJing;
