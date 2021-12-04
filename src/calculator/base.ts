/**
 * 新的计算器文件
 * @Author: centerm.gaohan
 * @Date: 2021-10-01 00:33:41
 * @Last Modified by: Harper.Gao
 * @Last Modified time: 2021-11-21 17:53:36
 */

import invariant from 'invariant';
import Skill from '@packages/core/skill';
import Support from '@packages/support/support';
import Target from '@packages/support/target';
import DpsCore from '@packages/core/core';
import { Gain } from '@packages/gain/gain';

export default class CalculatorBase {
  public CalculatorVersion: any;
  public options: any;
  public skills: Array<Skill> = [];
  public core: DpsCore;
  public support: Support;
  public target: Target;
  public professtion: string;
  public className: string;
  public seconds: number; // 战斗时间 default: 300s
  public totalExpectation: number;
  public dps: number;
  constructor(options: any = {}) {
    this.options = options;

    invariant(!!options.support, '辅助类不能为空');
    this.support = new Support(options.support);
    this.seconds = options.seconds || 5 * 60;
  }

  public use(...rest: any[]) {
    this.support.use.apply(this, rest);
  }

  public remove(gain: string) {
    this.support.remove(gain);
  }

  public setGain(gains: Gain[]) {
    this.support.setGain(gains);
  }

  public addSkills(skills: Skill[] = []) {
    this.skills = skills;
  }

  public addSkill(skill: Skill) {
    this.skills.push(skill);
  }
}
