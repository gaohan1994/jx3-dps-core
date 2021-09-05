// const { YiJinJing } = require('../build');
const Calculator = require('../build');

/**
 * 08-24
 * 1、无视目标防御
 * 2、团队易伤
 * 3、主属性计算
 */

async function Demo() {
  const Yjj = new Calculator.YiJinJing({
    CalculatorVersion: Calculator.YiJinJing.YiJinJingVersion.Immortal,
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
  console.log('BaseDps', BaseDps.dps);
  // const profit = new Calculator.Profit({
  //   options: {
  //     core: {
  //       type: 'YuanQi',
  //       JiChuGongJi: 14470,
  //       WuQiShangHai: 1998,
  //       HuiXin: 19.05,
  //       HuiXiao: 175.77,
  //       PoFang: 38.01,
  //       PoZhao: 4130,
  //       WuShuang: 54.06,
  //       YuanQi: 2880,
  //       JiaSu: Calculator.CoreHelper.JiaSuList.YiDuanJiaSu,
  //     },
  //     support: {
  //       mode: 'NeiGong',
  //       target: Calculator.CoreHelper.Target.MuZhuang113,
  //     },
  //   },
  //   gainList: Yjj.support.gainList,
  // });

  // const profitResult = await profit.calculatroProfit();
  // console.log('profitResult', profitResult);
  // const skills = BaseDps.skills.map((item) => {
  // item.showSkillInfo();
  // return `${item.skillTitle} ${item.skillTimes} ${item.subTotal} 占比：${item.percent}`;
  // console.log('item', item);
  // });
  // BaseDps.skills.showSkillInfo();
  // console.log('基础面板');
  // Yjj.showCoreValue();
  // console.log('基础dps: ', BaseDps.dps);

  // console.log('Yjj.getSupportContext()', Yjj.getSupportContext());
  // Yjj.use({
  //   name: 'Profit-YuanQi',
  //   data: [{ gainTarget: 'YuanQi', value: 30, coverage: 1 }],
  // });

  // const YuanQiDps = await Yjj.total();
  // const YuanQiCoe = (YuanQiDps.dps / BaseDps.dps - 1) * 100;

  // console.log('元气dps', YuanQiDps.dps);
  // console.log('元气系数', YuanQiCoe);

  // Yjj.remove('Profit-YuanQi');
  // Yjj.use({
  //   name: 'Profit-JiChuGongJi',
  //   data: [{ gainTarget: 'JiChuGongJi', value: 70, coverage: 1 }],
  // });

  // // Yjj.support.showGain();
  // const JiChuDps = await Yjj.total();
  // const JiChuCoe = (JiChuDps.dps / BaseDps.dps - 1) * 100;
  // console.log('基础dps', JiChuDps.dps);
  // console.log('基础系数', JiChuCoe);

  // const JiChuYjj = new Calculator.YiJinJing({
  //   core: {
  //     ...baseCore,
  //     JiChuGongJi: baseCore.JiChuGongJi + 7,
  //   },
  //   support: {
  //     ...Yjj.support,
  //     target: Yjj.options.target,
  //   },
  // });

  // const JiChuDps = await JiChuYjj.total();
  // const JiChuCoe = (JiChuDps.dps / BaseDps.dps - 1) * 100;
  // console.log('JiChuYjj', JiChuYjj.showCoreValue());
  // console.log('JiChuDps.dps', JiChuDps.dps);
  // console.log('JiChuCoe', JiChuCoe);
}

Demo();
