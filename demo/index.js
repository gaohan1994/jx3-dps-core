const {
  createDpsCore, 
  createCalculator, 
  Support, 
  CoreHelper,
  UnstableOldYiJinJing,
} =require('../build');

const YiJinJing = UnstableOldYiJinJing;

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

  const newCore = createDpsCore(2880, 14470, 19.05, 175.77, 38.01, 4130, 54.06, 'YiDuanJiaSu', 1998);

  const support = new Support({
    mode: 'NeiGong',
    target: CoreHelper.Target.MuZhuang113,
  });

  support.use(CoreHelper.SetBonusesGain.ValueSetBonuse);
  support.use(CoreHelper.SetBonusesGain.SkillSetBonuse);
  support.use(CoreHelper.Enchants.EnChantBelt);
  support.use(CoreHelper.Enchants.EnChantBody);
  support.use(CoreHelper.Enchants.EnChantHead);
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
    CoreHelper.CalculatorVersion.Normal
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
  const Yjj = new YiJinJing({
    CalculatorVersion: YiJinJing.YiJinJingVersion.Normal,
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
      JiaSu: CoreHelper.JiaSuList.YiDuanJiaSu,
    },
    support: {
      mode: 'NeiGong',
      target: CoreHelper.Target.MuZhuang113,
    },
  });

  Yjj.use(CoreHelper.SetBonusesGain.ValueSetBonuse);
  Yjj.use(CoreHelper.SetBonusesGain.SkillSetBonuse);
  Yjj.use(CoreHelper.Enchants.EnChantBelt);
  Yjj.use(CoreHelper.Enchants.EnChantBody);
  Yjj.use(CoreHelper.Enchants.EnChantHead);

  const BaseDps = await Yjj.total();
  // console.log('total', BaseDps.totalExpectation);
  console.log(BaseDps.dps);
}
newDemo();
