// const { YiJinJing } = require('../build');
const Calculator = require('../build');

/**
 * 08-24
 * 1、无视目标防御
 * 2、团队易伤
 */

function Demo() {
  const yjj = new Calculator.YiJinJing({
    core: {
      type: 'YuanQi',
      JiChuGongJi: 14707,
      WuQiShangHai: 1998,
      HuiXin: 19.02,
      HuiXiao: 175.99,
      PoFang: 42.62,
      PoZhao: 4117,
      JiaSu: 4.4,
      WuShuang: 41.88,
      YuanQi: 2562,
    },
    support: {
      mode: 'NeiGong',
      target: 'MuZhuang113',
    },
  });

  yjj.use(Calculator.CoreHelper.TeamSkills.FenLan);
  yjj.use(Calculator.CoreHelper.TeamSkills.PoCangQiong);
  yjj.use(Calculator.CoreHelper.TeamSkills.XiuQi);
  yjj.use(Calculator.CoreHelper.SetBonusesGain.ValueSetBonuse);
  yjj.use(Calculator.CoreHelper.SetBonusesGain.SkillSetBonuse);
  yjj.use(Calculator.CoreHelper.GroupSkills.JieHuoZhan);
  yjj.use(Calculator.CoreHelper.GroupSkills.LieRiZhan);
  yjj.use(Calculator.CoreHelper.GroupSkills.LiDiChengFo);
  yjj.use(Calculator.CoreHelper.Formations.TianLuoZhen);

  yjj.total().then((res) => {
    console.log('dps: ', res.dps);
  });
}

Demo();
