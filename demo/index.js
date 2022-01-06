const { createDpsCore, createCalculator, Support, CoreHelper } = require('../bundle');

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

  const newCore = createDpsCore(2897, 16912, 23.42, 180.8, 40.6, 3066, 52.05, 'YiDuanJiaSu', 1998);

  const support = new Support({
    mode: 'NeiGong',
    target: CoreHelper.Target.MuZhuang113,
  });

  support.use(CoreHelper.SetBonusesGain.ValueSetBonuse);
  support.use(CoreHelper.SetBonusesGain.SkillSetBonuse);
  support.use(CoreHelper.Enchants.EnChantBelt);
  support.use(CoreHelper.Enchants.EnChantBody);
  support.use(CoreHelper.Enchants.EnChantHead);
  support.use(CoreHelper.TeamSkills.JinGangNuMu);
  support.use(CoreHelper.TeamSkills.QinLongJue);
  // support.use(CoreHelper.Weapons.CW);
  support.use({
    name: 'UPDATE08-30',
    type: 'Costom',
    data: [{ gainTarget: 'damageBonus', value: 0.03, coverage: 1 }],
  });
  support.use({
    name: '少林常驻破防加成',
    type: 'Costom',
    data: [{ gainTarget: 'PoFangPercent', value: 0.15, coverage: 1 }],
  });

  const calculatorConfig = {
    qiXueVersion: CoreHelper.YiJinJingQiXueVersion.TiHuGuanDing,
    skillEnchant: '',
  };
  const calculatorResult = createCalculator(newCore, support, calculatorConfig);
  const { dps, total, skills } = calculatorResult;
  console.log('dps', dps);
  console.log('skills', skills.length);
}
newDemo();
