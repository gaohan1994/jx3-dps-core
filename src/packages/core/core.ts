/**
 * 计算器核心类
 *
 * @Author: centerm.gaohan
 * @Date: 2021-08-07 20:43:49
 * @Last Modified by: Harper.Gao
 * @Last Modified time: 2021-11-21 17:54:47
 */
import invariant from 'invariant';
import { createEnum } from '@/types';

export enum JiaSuValue {
  YiDuanJiaSu = 'YiDuanJiaSu',
  ErDuanJiaSu = 'ErDuanJiaSu',
}

// 创建 K: V
export const CoreEnum = createEnum(['YuanQi', 'GenGu', 'LiDao', 'ShenFa']);
export type CoreEnum = keyof typeof CoreEnum;

export interface MainCoeffiecient {
  (yuanQi: number): {
    JiChuGongJi: number;
    ZongGongJi: number;
    PoFangLevel: number;
    HuiXinLevel: number;
  };
}

class DpsCore {
  static JiaSuList = JiaSuValue;
  public type: CoreEnum;
  public JiChuGongJi: number;
  public GongJiCoefficient: number;
  public ZongGongJi: number;
  public WuQiShangHai: number;
  public HuiXin: number;
  public HuiXiao: number;
  public PoFang: number;
  public PoZhao: number;
  public JiaSu: JiaSuValue;
  public WuShuang: number;
  public YuanQi?: number;
  public GenGu?: number;
  public LiDao?: number;
  public ShenFa?: number;
  public options: any;
  public mainCoeffiecient: MainCoeffiecient;
  constructor(options: any) {
    this.options = options;
    this.JiChuGongJi = options.JiChuGongJi || 1;

    this.GongJiCoefficient = options.GongJiCoefficient;

    this.PoFang = options.PoFang || 0;
    this.PoZhao = options.PoZhao || 0;

    // 加速默认是一段加速修改为直接设置段数
    this.JiaSu = options.JiaSu || DpsCore.JiaSuList.YiDuanJiaSu;
    this.WuShuang = options.WuShuang || 0;

    invariant(typeof options.mainCoeffiecient === 'function', '主属性设置不能为空');
    this.mainCoeffiecient = options.mainCoeffiecient;

    this.WuQiShangHai = options.WuQiShangHai || 0;
    this.HuiXin = options.HuiXin || 0;
    this.HuiXiao = options.HuiXiao || 0;
    this.YuanQi = options.YuanQi;
    this.GenGu = options.GenGu;
    this.LiDao = options.LiDao;
    this.ShenFa = options.ShenFa;
    this.type = options.type;
  }
}

export const createDpsCoreFactory = (coreType: CoreEnum, mainCoeffiecient: MainCoeffiecient) => {
  function createDpsCoreInstance(
    mainAttribute: number,
    JiChuGongJi: number,
    HuiXin: number,
    HuiXiao: number,
    PoFang: number,
    PoZhao: number,
    WuShuang: number,
    JiaSu: JiaSuValue,
    WuQiShangHai?: number
  ) {
    return new DpsCore({
      // 设置人物主属性
      // 设置职业成长
      type: coreType,
      [coreType]: mainAttribute,
      mainCoeffiecient,
      // 设置基础属性
      JiChuGongJi,
      GongJiCoefficient: 1,
      HuiXin,
      HuiXiao,
      PoFang,
      PoZhao,
      WuShuang,
      // 设置加速和武器伤害
      JiaSu,
      WuQiShangHai,
    });
  }

  return createDpsCoreInstance;
};

// 易筋经主属性成长
const YiJinJingMainCoeffiecient: MainCoeffiecient = (YuanQi: number) => ({
  JiChuGongJi: YuanQi * 0.18,
  ZongGongJi: YuanQi * 1.85,
  PoFangLevel: YuanQi * 0.3,
  HuiXinLevel: YuanQi * 0.38,
});

// 创建易筋经dpsCore
export const createDpsCore = createDpsCoreFactory(CoreEnum.YuanQi, YiJinJingMainCoeffiecient);
export default DpsCore;
