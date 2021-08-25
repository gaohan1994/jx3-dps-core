// const { YiJinJing } = require('../build');
const Calculator = require('../build');

/**
 * 08-24
 * 1、无视目标防御
 * 2、团队易伤
 * 3、主属性计算
 */

function Demo() {
  const yjj = new Calculator.YiJinJing({
    core: {
      type: 'YuanQi',
      JiChuGongJi: 14816,
      WuQiShangHai: 1998,
      HuiXin: 23.58,
      HuiXiao: 176.98,
      PoFang: 39,
      PoZhao: 4117,
      JiaSu: 4.4,
      WuShuang: 43.62,
      YuanQi: 2623,
    },
    support: {
      mode: 'NeiGong',
      target: Calculator.CoreHelper.Target.MuZhuang111,
    },
  });

  // yjj.use(Calculator.CoreHelper.TeamSkills.FenLan);
  // yjj.use(Calculator.CoreHelper.TeamSkills.PoCangQiong);
  // yjj.use(Calculator.CoreHelper.TeamSkills.XiuQi);
  yjj.use(Calculator.CoreHelper.SetBonusesGain.ValueSetBonuse);
  yjj.use(Calculator.CoreHelper.SetBonusesGain.SkillSetBonuse);
  yjj.use(Calculator.CoreHelper.GroupSkills.JieHuoZhan);
  // yjj.use(Calculator.CoreHelper.GroupSkills.LieRiZhan);
  // yjj.use(Calculator.CoreHelper.GroupSkills.LiDiChengFo);
  // yjj.use(Calculator.CoreHelper.Formations.TianLuoZhen);

  yjj.use(Calculator.CoreHelper.Weapons.EffectWather);

  yjj.use(Calculator.CoreHelper.Enchants.EnChantBelt);
  yjj.use(Calculator.CoreHelper.Enchants.EnChantBody);
  yjj.use(Calculator.CoreHelper.Enchants.EnChantHead);
  yjj.use(Calculator.CoreHelper.EffectSpines.XiangMeng);

  // yjj.use(Calculator.CoreHelper.Banquet.ErShiSiQiaoMingYueYe);

  // yjj.use(Calculator.CoreHelper.GroupSkills.HanXiaoQianJun);

  // yjj.use(Calculator.CoreHelper.Food.FoodEnhance.SuanCaiYu);
  // yjj.use(Calculator.CoreHelper.Food.FoodEnhance.GuanTangBao);
  // yjj.use(Calculator.CoreHelper.Food.FoodEnhance.HongShaoPaiGu);

  // yjj.use(Calculator.CoreHelper.Food.FoodSupport.YuPianShaGuoZhou);

  // yjj.use(Calculator.CoreHelper.Food.DrugSupport.ShangPinJuHunWan);

  // yjj.use(Calculator.CoreHelper.Food.DrugEnhance.ShangPinYuLiSan);
  // yjj.use(Calculator.CoreHelper.Food.DrugEnhance.ShangPinPoHuiSan);
  // yjj.use(Calculator.CoreHelper.Food.DrugEnhance.ShangPinNingShenSan);
  yjj.use(Calculator.CoreHelper.Food.DrugEnhance.ShangPinZhanFengDan);

  yjj.total().then((res) => {
    const skills = res.skills.map((item) => {
      return `${item.skillTitle}: 次数 ${item.skillTimes}, 总 ${item.subTotal}, 占比: ${item.percent}`;
    });
    // console.log('skills', skills);
    console.log('dps: ', res.dps);
    // console.log('yjj.getSupportContext()', yjj.getSupportContext());
    yjj.getCore().showAttributes();
    // yjj.getTarget().showTargetValue();
    // yjj.getSupport().showGain();
  });
}

Demo();
