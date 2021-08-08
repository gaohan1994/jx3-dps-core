/**
 * 计算器基类
 * 
 * @Author: centerm.gaohan 
 * @Date: 2021-08-08 19:12:37 
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-08 21:23:23
 */
import invariant = require('invariant');
import chalk = require('chalk');
import Core from '../core/core';
import Support from '../support/support';
import Skill from '../core/skill';

class CalculatorBase {

  public options: any;

  /**
   * 技能列表
   *
   * @type {Array<Skill>}
   * @memberof CalculatorBase
   */
  public skills: Array<Skill> = [];

  /**
   * 核心类
   *
   * @type {Core}
   * @memberof CalculatorBase
   */
  public core: Core;

  /**
   * 辅助类
   *
   * @type {Support}
   * @memberof CalculatorBase
   */
  public support: Support;

  /**
   * 职业
   *
   * @type {string}
   * @memberof CalculatorBase
   */
  public professtion: string;

  /**
   * 心法
   *
   * @type {string}
   * @memberof CalculatorBase
   */
  public className: string;

  constructor(options: any = {}) {
    this.options = options;

    invariant(!!options.core, '核心类不能为空');
    this.core = options.core;

    invariant(!!options.support, '辅助类不能为空');
    this.support = options.support;
  }


  public showCalculatorValue() {
    console.log(chalk.white(`---- calculator start ----`));
    console.log(chalk.white(`计算器：
      职业:${this.professtion}
      心法:${this.className}
    `));
    console.log(chalk.white(`---- calculator end ----`));
  }

  public showSkills() {
    console.log(chalk.white(`---- showSkills start ----`));
    this.skills.forEach((skill) => {
      console.log(chalk.white(skill.skillName));
    })
    console.log(chalk.white(`---- showSkills end ----`));
  }

  public showCoreValue() {
    this.core.showAttributes();
  }

  public showSupportValue() {
    this.support.showSupportValue();
  }
}
export default CalculatorBase;