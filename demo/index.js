// const { YiJinJing } = require('../build');
// const Calculator = require('../build');
const Calculator = require('../build');

function Demo() {
  const yjj = new Calculator.YiJinJing({
    core: {
      type: 'YuanQi',
      ZongGongJi: 26583,
      JiChuGongJi: 14707,
      WuQiShangHai: 1998,
      HuiXin: 20.62,
      HuiXiao: 175.99,
      PoFang: 42.62,
      PoZhao: 4117,
      JiaSu: 4.4,
      WuShuang: 41.88,
      YuanQi: 2562,
    },
    support: {
      mode: 'NeiGong',
    },
  });

  yjj.total().then((res) => {
    console.log('res', res);
    let total = 0;

    res.skills.forEach((element) => {
      total += element.percent;
    });
    console.log('total', total);
  });
}

Demo();
