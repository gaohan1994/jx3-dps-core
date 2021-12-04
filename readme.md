## 剑网三计算器核心库

## Why

把剑三核心计算抽离出来，全门派都可以使用，目前只配置了少林门派，后续待完善

## Usage

```js
import Calculator, {
  YiJinJing,
  DpsCore,
  Support,
  YiJinJing,
} from 'jx3-dps-core';

// 创建计算器方法1
const YJJ = new Calculator.YiJinJing({
  core: {...},
  support: {...},
});

YJJ.total().then((result) => {
  console.log('result', result);
  console.log('result', result.totalExpectation);
  console.log('result', result.dps);
});

// 创建计算器方法2

const YJJ = new YiJinJing({
  core: {...},
  support: {...},
});
YJJ.total().then((result) => {
  console.log('result', result);
  console.log('result', result.totalExpectation);
  console.log('result', result.dps);
});
```

"_moduleAliases": {
    "@": "src"
    // "@/calculator": "src/calculator",
    // "@/component": "src/component",
    // "@/config": "src/config",
    // "@/packages": "src/packages",
    // "@/types": "src/types.ts"
  }
