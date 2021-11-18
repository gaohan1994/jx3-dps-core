// const { YiJinJing } = require('../build');
const {
  pipe,
  multiplication,
  addition,
  composeSync,
} = require('../build').component;

const { createConfig, createCalculator } = require('../build').calculator;
const Calculator = require('../build');
const { createYiJinJingFactory } = require('../build').CoreNew;
const { Target } = require('../build').Target;
// const
/**
 * 08-24
 * 1、无视目标防御
 * 2、团队易伤
 * 3、主属性计算
 */

async function newDemo() {
  function sort(skills) {
    return skills.sort((a, b) => {
      return a.skillTitle.charCodeAt(0) - b.skillTitle.charCodeAt(0);
    });
  }

  function compare(config1, config2) {
    for (let key in config1) {
      if (config1[key] !== config2[key]) {
        console.log(`${key} 不同`, config1[key], config2[key]);
      }
    }
  }

  const newCore = createYiJinJingFactory(
    2880,
    14470,
    19.05,
    175.77,
    38.01,
    4130,
    54.06,
    'YiDuanJiaSu',
    1998
  );

  const support = new Calculator.Support({
    mode: 'NeiGong',
    target: Calculator.CoreHelper.Target.MuZhuang113,
  });

  support.use(Calculator.CoreHelper.SetBonusesGain.ValueSetBonuse);
  support.use(Calculator.CoreHelper.SetBonusesGain.SkillSetBonuse);
  support.use(Calculator.CoreHelper.Enchants.EnChantBelt);
  support.use(Calculator.CoreHelper.Enchants.EnChantBody);
  support.use(Calculator.CoreHelper.Enchants.EnChantHead);
  support.use('JinGangNuMu');
  support.use('QinLongJue');
  support.use({
    name: 'UPDATE08-30',
    data: [{ gainTarget: 'damageBonus', value: 0.03, coverage: 1 }],
  });
  support.use({
    name: '少林常驻破防加成',
    data: [{ gainTarget: 'PoFangPercent', value: 0.15, coverage: 1 }],
  });

  const calculatorResult = createCalculator(
    newCore,
    support,
    Calculator.YiJinJing.YiJinJingVersion.Normal
  );
  const { dps, total, skills } = calculatorResult;
  const afterSkills = sort(skills);

  // console.log('total', total);
  console.log('dps', dps);
  afterSkills.forEach((item) => {
    // console.log(`${item.skillTitle}:${item.subTotal}`);
  });
  console.log('----');

  // console.log('config', config);
  // return;
  const Yjj = new Calculator.YiJinJing({
    CalculatorVersion: Calculator.YiJinJing.YiJinJingVersion.Normal,
    core: {
      type: 'YuanQi',
      JiChuGongJi: 14470,
      WuQiShangHai: 1998,
      HuiXin: 19.05,
      HuiXiao: 175.77,
      PoFang: 38.01,
      PoZhao: 4130,
      WuShuang: 54.06,
      YuanQi: 2880,
      JiaSu: Calculator.CoreHelper.JiaSuList.YiDuanJiaSu,
    },
    support: {
      mode: 'NeiGong',
      target: Calculator.CoreHelper.Target.MuZhuang113,
    },
  });

  Yjj.use(Calculator.CoreHelper.SetBonusesGain.ValueSetBonuse);
  Yjj.use(Calculator.CoreHelper.SetBonusesGain.SkillSetBonuse);
  Yjj.use(Calculator.CoreHelper.Enchants.EnChantBelt);
  Yjj.use(Calculator.CoreHelper.Enchants.EnChantBody);
  Yjj.use(Calculator.CoreHelper.Enchants.EnChantHead);

  const BaseDps = await Yjj.total();
  // console.log('total', BaseDps.totalExpectation);
  console.log(BaseDps.dps);
}
newDemo();
