## Jx3-dps-core

纯 Typescript 编写的计算器组件

## Documents

Jx3-dps-core 使用文档

### CoreHelper

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


```javascript
const CoreHelper = {
  GainGroupTypes: GainGroupTypes,
  YiJinJingQiXueVersion: YiJinJingQiXueVersion,
  YiJinJingSkillEnchant: YiJinJingSkillEnchant,
  JiaSuList: {
    ...JiaSuValue,
  },
  Formations: {
    ...FormationList,
  },
  TeamSkills: {
    ...TeamSkillList,
  },
  GroupSkills: {
    ...GroupSkillList,
  },
  SetBonusesGain: {
    ...SetBonuseList,
  },
  Weapons: {
    ...WeaponList,
  },
  Enchants: {
    ...EnChantsList,
  },
  EffectSpines: {
    ...EffectSpineList,
  },
  Banquet: {
    ...BanquetList,
  },
  Food: {
    FoodEnhance: {
      ...FoodEnhanceList,
    },
    DrugEnhance: {
      ...DrugEnhanceList,
    },
    FoodSupport: {
      ...FoodSupportList,
    },
    DrugSupport: {
      ...DrugSupportList,
    },
    HomeFood: {
      ...HomeFoodList,
    },
    WeaponEnchant: {
      ...WeaponEnchantList,
    },
    HomeDrink: {
      ...HomeDrinkList,
    },
    FestivalFood: {
      ...FestivalFoodList,
    },
  },
  Target: {
    ...TargetListKeys,
  },
};
```

### createDpsCore

创建角色
输入主属性、基础攻击、会心、会效、破防、破招、无双、加速（段位）、武器伤害返回DpsCore

```typescript
declare const createDpsCore: (
  mainAttribute: number, 
  JiChuGongJi: number, 
  HuiXin: number, 
  HuiXiao: number, 
  PoFang: number, 
  PoZhao: number, 
  WuShuang: number, 
  JiaSu: JiaSuValue, 
  WuQiShangHai?: number
) => DpsCore;

const dpsCore = createDpsCore(
  2904,
  15984,
  32.93,
  189.28,
  54.05,
  4480,
  45.74,
  'YiDuanJiaSu',
  1998
);

```

### Support 

创建辅助工具 ``support`` 最开始的设计为内外功都可以使用本库，后期会废除掉mode
通过调用 ``support`` 类的 ``use`` 函数可以使用预先设置好的增益Buff

```javascript
const support = new Support({
  mode: 'NeiGong',
  target: CoreHelper.Target.MuZhuang113,
});
support.use(CoreHelper.TeamSkills.JinGangNuMu);
```

### createCalculator

创建计算器
传入 ``dpsCore`` 和 ``support`` 以及 ``options`` 获取计算器结果

```typescript

/**
 * 创建易筋经计算器
 *
 * @param {DpsCore} core 核心类
 * @param {Support} support 辅助类
 * @param {YiJinJingValues} version 计算器版本
 */
export declare const createCalculator: (
  core: DpsCore, 
  support: Support, 
  options?: CreateCalculatorOptions
) => CalculatorResult;

const calculatorResult = createCalculator(dpsCore, support, {
  qiXueVersion: CoreHelper.YiJinJingQiXueVersion.XinZheng,
  skillEnchant: CoreHelper.YiJinJingSkillEnchant.JinGangRiLun,
});
```

### Profit

计算属性收益模块

```typescript
/**
 * Usage =================================================================
 * ========================================================================
 *
 * const profit = new Profit(core, support, version, result);
 * const profitList = profit.calculatroProfit();
 */
declare class Profit {
    core: DpsCore;
    support: Support;
    baseResult: CalculatorResult;
    baseDps: number;
    profitList: ProfitCore[];
    constructor(profitOptions: ProfitConstructorOptions);
    calculatroProfitCore(item: ProfitCore): ProfitCore;
    calculatroProfit(): ProfitCore[];
}
```


## Usage

```js
import { CoreHelper, createCalculator, createDpsCore, Support } from 'jx3-dps-core';

const newCore = createDpsCore(
  2904,
  15984,
  32.93,
  189.28,
  54.05,
  4480,
  45.74,
  'YiDuanJiaSu',
  1998
);

const support = new Support({
  mode: 'NeiGong',
  target: CoreHelper.Target.MuZhuang113,
});

support.use(CoreHelper.TeamSkills.JinGangNuMu);
support.use(CoreHelper.TeamSkills.QinLongJue);
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
const calculatorResult = createCalculator(newCore, support, {
  qiXueVersion: CoreHelper.YiJinJingQiXueVersion.XinZheng,
  skillEnchant: CoreHelper.YiJinJingSkillEnchant.JinGangRiLun,
});
const { dps, total, skills } = calculatorResult;
console.log('dps: ', dps);
```