/**
 * 易筋经计算器
 * 
 * @Author: centerm.gaohan 
 * @Date: 2021-08-08 18:35:26 
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-08 21:42:03
 */
import CalculatorBase from "../base";
import Skill from "../../core/skill";
import { SetBonuse } from "../../types";

class YiJinJing extends CalculatorBase {


  constructor(options: any) {
    super(options);

    this.professtion = '少林';

    this.className = '易筋经';

    /**
     * 是否有技能特效
     */
    const hasSkillSetBonuese = this.support.personBuff.hasSkillSetBonuese();

    const weiTuoXianChu = new Skill({
      skillName: '韦陀献杵',
      basicDamage: 179,
      coefficient: 1.66,
      skillTimes: 25,
      step2Coefficient: (1.12 + 0.0996 + (hasSkillSetBonuese ? 0.0996 : 0) + 0.3 * 0.3) * 1.2
    });
    this.skills.push(weiTuoXianChu);
  }

  public calculatorSkills() {
    let promises = [];
    for (let i = 0; i < this.skills.length; i++) {

      promises.push(
        this.skills[i].calculator({
          core: this.core,
          support: this.support,
        })
      );
    }

    Promise.all(promises)
      .then((responses) => {
        console.log('responses:', responses)
      })
  }
}

export default YiJinJing;