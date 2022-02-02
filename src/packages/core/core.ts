/**
 * 计算器核心类
 *
 * @Author: centerm.gaohan
 * @Date: 2021-08-07 20:43:49
 * @Last Modified by: Harper.Gao
 * @Last Modified time: 2021-11-21 17:56:30
 */
import invariant from 'invariant';
import { createEnum } from '@types';

export const JiaSuValue = createEnum(['YiDuanJiaSu', 'ErDuanJiaSu']);
export type JiaSuValue = keyof typeof JiaSuValue;

export interface MainCoeffiecient {
  (Spunk: number): {
    SolarAttackPowerBase: number;
    ZongGongJi: number;
    PoFangLevel: number;
    HuiXinLevel: number;
  };
}

class DpsCore {
  static JiaSuList = JiaSuValue;
  public SolarAttackPowerBase: number;
  public GongJiCoefficient: number;
  public ZongGongJi: number;
  public WuQiShangHai: number;
  public HuiXin: number;
  public HuiXiao: number;
  public PoFang: number;
  public PoZhao: number;
  public JiaSu: JiaSuValue;
  public WuShuang: number;
  public Spunk?: number;
  public options: any;
  public mainCoeffiecient: MainCoeffiecient;
  constructor(options: any) {
    this.options = options;
    this.SolarAttackPowerBase = options.SolarAttackPowerBase || 1;

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
    this.Spunk = options.Spunk;
  }
}

export type CreateDpsCoreOptions = {
  mainAttribute: number;
  SolarAttackPowerBase: number;
  HuiXin: number;
  HuiXiao: number;
  PoFang: number;
  PoZhao: number;
  WuShuang: number;
  JiaSu: JiaSuValue;
  WuQiShangHai: number;
};

// 易筋经主属性成长
const YiJinJingMainCoeffiecient: MainCoeffiecient = (Spunk: number) => ({
  SolarAttackPowerBase: Spunk * 0.18,
  ZongGongJi: Spunk * 1.85,
  PoFangLevel: Spunk * 0.3,
  HuiXinLevel: Spunk * 0.38,
});

export const createDpsCore = (createDpsCoreOptions: CreateDpsCoreOptions) => {
  const { mainAttribute, ...restCreateCoreAttrs } = createDpsCoreOptions;
  return new DpsCore({
    mainCoeffiecient: YiJinJingMainCoeffiecient,
    Spunk: mainAttribute,
    GongJiCoefficient: 1,
    ...restCreateCoreAttrs,
  });
};

export default DpsCore;
