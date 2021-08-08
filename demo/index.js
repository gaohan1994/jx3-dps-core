const { DpsCore, Support, YiJinJing } = require('../dist');

function Demo() {
  const dpsCore = new DpsCore({
    type: 'YuanQi',
    ZongGongji: 26583,
    JiChuGongJi: 15064,
    WuQiShangHai: 1998,
    HuiXin: 20.62,
    HuiXiao: 175.99,
    PoFang: 51.62,
    PoZhao: 4117,
    JiaSu: 4.4,
    WuShuang: 41.88,
    YuanQi: 2562,
  });

  const support = new Support({ mode: 'NeiGong' });

  const yjj = new YiJinJing({ core: dpsCore, support });
  yjj.showCalculatorValue();
  yjj.showCoreValue();
  yjj.showSupportValue();
}

Demo();
