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

  // yjj.use(Calculator.CoreHelper.TeamSkills.FenLan);
  // yjj.use(Calculator.CoreHelper.TeamSkills.PoCangQiong);
  // yjj.use(Calculator.CoreHelper.TeamSkills.XiuQi);
  // yjj.use(Calculator.CoreHelper.SetBonusesGain.ValueSetBonuse);
  // yjj.use(Calculator.CoreHelper.SetBonusesGain.SkillSetBonuse);
  // yjj.use(Calculator.CoreHelper.GroupSkills.JieHuoZhan);
  // yjj.use(Calculator.CoreHelper.GroupSkills.LieRiZhan);
  // yjj.use(Calculator.CoreHelper.GroupSkills.LiDiChengFo);
  // yjj.use(Calculator.CoreHelper.Formations.TianLuoZhen);
  // yjj.use(Calculator.CoreHelper.Formations.MoWenZhen);
  yjj.use(Calculator.CoreHelper.Formations.TianGuLeiYinZhen);
  // yjj.use(Calculator.CoreHelper.GroupSkills.MeiHuaDun);

  // yjj.use(Calculator.CoreHelper.Weapons.EffectWather);

  // yjj.use(Calculator.CoreHelper.Enchants.EnChantBelt);
  // yjj.use(Calculator.CoreHelper.Enchants.EnChantBody);
  // yjj.use(Calculator.CoreHelper.Enchants.EnChantHead);
  // yjj.use(Calculator.CoreHelper.EffectSpines.XiangMeng);

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
  // yjj.use(Calculator.CoreHelper.Food.DrugEnhance.ShangPinZhanFengDan);

  // yjj.use(Calculator.CoreHelper.GroupSkills.HongFa, { coverage: 0.4 });

  yjj.total().then((res) => {
    const skills = res.skills.map((item) => {
      // item.showSkillInfo();
      return `${item.skillTitle} ${item.skillTimes} ${item.subTotal} 占比：${item.percent}`;
      // console.log('item', item);
    });
    // res.skills.showSkillInfo();
    console.log('skills', skills);
    console.log('dps: ', res.dps);
    // console.log('yjj.getSupportContext()', yjj.getSupportContext());
    // yjj.getCore().showAttributes();
    yjj.getCore().showAttributes();
    // yjj.getTarget().showTargetValue();
    // yjj.getSupport().showGain();

    // yjj.support.showGain();
    // console.log(yjj.supportContext);
  });
}

Demo();
