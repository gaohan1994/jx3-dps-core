const { YiJinJing } = require('../dist');

function Demo() {
  const yjj = new YiJinJing({
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
    console.log('res', res.totalExpectation);
    console.log('res', res.dps);
  });
}

Demo();
