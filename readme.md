## Jx3-dps-core

纯 Typescript 编写的计算器组件

服务于剑网三少林易筋经心法

初衷是希望把计算器的计算和公共部分抽离出来

这样可以做到最大程度的复用和简洁化

[剑网三少林易筋经计算器Web版](http://101.132.24.127:9090/#/calculator)

[剑网三少林易筋经计算器前端代码](https://github.com/gaohan1994/jx3-dps-rank)

## Documents

Jx3-dps-core 使用文档

### Jx3DpsCore

核心工具预先设置好的所有增益包括

- 易筋经奇穴版本（心诤 or 醍醐）

- 易经经大附魔

- 加速段位

- 阵法

- 小队技能增益

- 团队技能增益

- 套装增益

- 武器列表

- 附魔列表

- 特效腰椎

- 宴席

- 小吃小药

- 目标选择等


```typescript

class Jx3DpsCore {
  /**
   * 增益群组类型
   *
   * @static
   * @memberof Jx3DpsCore
   */
  static GainGroupTypes = GainGroupTypes;
  /**
   * @param YiJinJingQiXueVersion 奇穴
   * @param YiJinJingSkillEnchant 大附魔
   *
   * @static
   * @memberof Jx3DpsCore
   */
  static CalculatorVersions = {
    YiJinJingQiXueVersion: YiJinJingQiXueVersion,
    YiJinJingSkillEnchant: YiJinJingSkillEnchant,
  };
  /**
   * 加速档位
   *
   * @static
   * @memberof Jx3DpsCore
   */
  static JiaSuList = JiaSuValue;
  /**
   * 阵法列表
   *
   * @static
   * @memberof Jx3DpsCore
   */
  static Formations = FormationList;
  /**
   * 小队技能增益列表
   *
   * @static
   * @memberof Jx3DpsCore
   */
  static TeamSkills = TeamSkillList;
  /**
   * 团队技能增益列表
   *
   * @static
   * @memberof Jx3DpsCore
   */
  static GroupSkills = GroupSkillList;
  /**
   * 套装增益列表
   *
   * @static
   * @memberof Jx3DpsCore
   */
  static SetBonusesGain = SetBonuseList;
  /**
   * 武器列表
   *
   * @static
   * @memberof Jx3DpsCore
   */
  static Weapons = WeaponList;
  /**
   * 装备附魔增益列表
   *
   * @static
   * @memberof Jx3DpsCore
   */
  static Enchants = EnChantsList;
  /**
   * 特效腰椎
   *
   * @static
   * @memberof Jx3DpsCore
   */
  static EffectSpines = EffectSpineList;
  /**
   * 宴席增益列表
   *
   * @static
   * @memberof Jx3DpsCore
   */
  static Banquet = BanquetList;
  /**
   * 目标列表
   *
   * @static
   * @memberof Jx3DpsCore
   */
  static Target = TargetListKeys;
  /**
   * 小吃小药列表
   *
   * @static
   * @memberof Jx3DpsCore
   */
  static Food = {
    FoodEnhance: FoodEnhanceList,
    DrugEnhance: DrugEnhanceList,
    FoodSupport: FoodSupportList,
    DrugSupport: DrugSupportList,
    HomeFood: HomeFoodList,
    WeaponEnchant: WeaponEnchantList,
    HomeDrink: HomeDrinkList,
    FestivalFood: FestivalFoodList,
  };

  /**
   * 增益模块
   *
   * @type {GainModule}
   * @memberof Jx3DpsCore
   */
  public gainModule: GainModule;

  /**
   * 创建计算器的其他配置选项
   *
   * @private
   * @type {Jx3DpsCoreOptions}
   * @memberof Jx3DpsCore
   */
  public jx3DpsCoreOptions: Jx3DpsCoreOptions;
  /**
   * 计算器核心core
   *
   * @private
   * @type {DpsCore}
   * @memberof Jx3DpsCore
   */
  private core: DpsCore;
  /**
   * 计算器增益类support
   *
   * @private
   * @type {Support}
   * @memberof Jx3DpsCore
   */
  public support: Support;

  constructor(
    coreOptions: CreateDpsCoreOptions,
    supportOptions: SupportOptions,
    jx3DpsCoreOptions: Jx3DpsCoreOptions
  ) {
    this.core = createDpsCore(coreOptions);
    this.support = new Support(supportOptions);
    this.gainModule = new GainModule();
    this.jx3DpsCoreOptions = jx3DpsCoreOptions;
  }
}
```

## Method calculate

```typescript
/**
 * 计算dps结果
 * @method calculate
 * @memberof Jx3DpsCore
 */
public calculate = (): CalculatorResult => {
  return createCalculator(this.core, this.support, this.jx3DpsCoreOptions);
};
```

## Method profit

```typescript
/**
 * 计算收益结果
 * @method profit
 * @memberof Jx3DpsCore
 */
public profit = () => {
  const pf = new Profit({ core: this.core, support: this.support });
  return pf.calculatroProfit();
};
```


## Usage

```typescript
import Jx3DpsCore, { Support } from 'jx3-dps-core';

type CalculatorResult = {
  dps: number;
  total: number;
  seconds: number;
  skills: Skill[];
};

interface Jx3DpsCoreCalculateResult extends CalculatorResult {
  profit: ProfitCore[];
}

const jdc = new Jx3DpsCore(
  {
    mainAttribute: 2904,
    JiChuGongJi: 15984,
    HuiXin: 32.93,
    HuiXiao: 189.28,
    PoFang: 54.05,
    PoZhao: 4480,
    WuShuang: 45.74,
    JiaSu: 'YiDuanJiaSu',
    WuQiShangHai: 2000,
  }
);

  jdc.setCalculatorVersion({
    qiXueVersion: Jx3DpsCore.CalculatorVersions.YiJinJingQiXueVersion.XinZheng,
    skillEnchant: Jx3DpsCore.CalculatorVersions.YiJinJingSkillEnchant.JinGangRiLun,
  });
  jdc.use(Jx3DpsCore.TeamSkills.JinGangNuMu);
  jdc.use(Jx3DpsCore.TeamSkills.QinLongJue);
  jdc.use({
    name: 'UPDATE08-30',
    type: 'Costom',
    data: [{ gainTarget: 'damageBonus', value: 0.03, coverage: 1 }],
  });
  jdc.use({
    name: '少林常驻破防加成',
    type: 'Costom',
    data: [{ gainTarget: 'SolarOvercomePercent', value: 0.15, coverage: 1 }],
  });

const { dps, total, skills, profit } = jdc.calculate();

```
