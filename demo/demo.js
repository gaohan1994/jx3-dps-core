(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  const {
    createDpsCore,
    createCalculator,
    Support,
    CoreHelper,
    Profit
  } = require('../build');

  async function newDemo() {
    function sort(skills) {
      return skills.sort((a, b) => {
        return a.skillTitle.charCodeAt(0) - b.skillTitle.charCodeAt(0);
      });
    }

    const newCore = createDpsCore(2880, 14470, 19.05, 175.77, 38.01, 4130, 54.06, 'YiDuanJiaSu', 1998);
    const support = new Support({
      mode: 'NeiGong',
      target: CoreHelper.Target.MuZhuang113
    });
    support.use(CoreHelper.SetBonusesGain.ValueSetBonuse);
    support.use(CoreHelper.SetBonusesGain.SkillSetBonuse);
    support.use(CoreHelper.Enchants.EnChantBelt);
    support.use(CoreHelper.Enchants.EnChantBody);
    support.use(CoreHelper.Enchants.EnChantHead);
    support.use(CoreHelper.TeamSkills.JinGangNuMu);
    support.use(CoreHelper.TeamSkills.QinLongJue);
    support.use({
      name: 'UPDATE08-30',
      type: 'Costom',
      data: [{
        gainTarget: 'damageBonus',
        value: 0.03,
        coverage: 1
      }]
    });
    support.use({
      name: '少林常驻破防加成',
      type: 'Costom',
      data: [{
        gainTarget: 'PoFangPercent',
        value: 0.15,
        coverage: 1
      }]
    });
    const calculatorResult = createCalculator(newCore, support, CoreHelper.CalculatorVersion.Normal);
    const {
      dps,
      total,
      skills
    } = calculatorResult;
    const afterSkills = sort(skills);
    new Profit({
      core: newCore,
      support,
      version: CoreHelper.CalculatorVersion.Normal
    }); // const profitList = profit.calculatroProfit();
    // console.log('profitList', profitList)
    // return;
    // console.log('total', total);

    console.log('dps', dps);
    afterSkills.forEach(item => {// console.log(`${item.skillTitle}:${item.subTotal}`);
    });
  }

  newDemo();

})));
