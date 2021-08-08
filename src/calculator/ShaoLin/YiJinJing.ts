/**
 * 易筋经计算器
 * 
 * @Author: centerm.gaohan 
 * @Date: 2021-08-08 18:35:26 
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-08 19:32:54
 */
import CalculatorBase from "../base";

class YiJinJing extends CalculatorBase {

  constructor(options: any) {
    super(options);

    this.professtion = '少林';

    this.className = '易筋经';
  }
}

export default YiJinJing;