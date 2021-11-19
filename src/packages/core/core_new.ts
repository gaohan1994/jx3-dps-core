/**
 * 计算器核心类
 *
 * @Author: centerm.gaohan
 * @Date: 2021-08-07 20:43:49
 * @Last Modified by: Harper.Gao
 * @Last Modified time: 2021-11-19 10:25:13
 */
import invariant from 'invariant';
import { CharacterTypes } from '../../types';

export enum JiaSuValue {
  YiDuanJiaSu = 'YiDuanJiaSu',
  ErDuanJiaSu = 'ErDuanJiaSu',
}

function createEnum<T extends string>(keys: Array<T>): { [K in T]: K } {
  return keys.reduce((result, key) => {
    result[key] = key;
    return result;
  }, Object.create(null));
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

    invariant(typeof options.JiChuGongJi === 'number', '攻击不能为空');
    this.JiChuGongJi = options.JiChuGongJi;

    this.GongJiCoefficient = options.GongJiCoefficient;

    invariant(typeof options.PoFang === 'number', '破防不能为空');
    this.PoFang = options.PoFang;

    invariant(typeof options.PoZhao === 'number', '破招不能为空');
    this.PoZhao = options.PoZhao;

    /**
     * @time 08-29
     * @param JiaSu
     *
     * 加速默认是一段加速修改为直接设置段数
     */
    this.JiaSu = options.JiaSu || DpsCore.JiaSuList.YiDuanJiaSu;

    invariant(typeof options.WuShuang === 'number', '无双不能为空');
    this.WuShuang = options.WuShuang;

    invariant(typeof options.WuQiShangHai === 'number', '武器伤害不能为空');
    this.WuQiShangHai = options.WuQiShangHai;

    invariant(typeof options.mainCoeffiecient === 'function', '主属性设置不能为空');
    this.mainCoeffiecient = options.mainCoeffiecient;

    invariant(
      typeof options.YuanQi === 'number' ||
        typeof options.GenGu === 'number' ||
        typeof options.LiDao === 'number' ||
        typeof options.ShenFa === 'number',
      '主属性不能为空'
    );
    this.HuiXin = options.HuiXin;

    this.HuiXiao = options.HuiXiao;

    if (options.YuanQi !== undefined) {
      this.YuanQi = options.YuanQi;
      this.type = CharacterTypes.YuanQi;
    }
    if (options.GenGu !== undefined) {
      this.GenGu = options.GenGu;
      this.type = CharacterTypes.GenGu;
    }
    if (options.LiDao !== undefined) {
      this.LiDao = options.LiDao;
      this.type = CharacterTypes.LiDao;
    }
    if (options.ShenFa !== undefined) {
      this.ShenFa = options.ShenFa;
      this.type = CharacterTypes.ShenFa;
    }
    this.type = options.type;
  }
}

export const createDpsCoreFactory = (coreType: CoreEnum, mainCoeffiecient: MainCoeffiecient) => {
  function createDpsCore(
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

  return createDpsCore;
};

const YiJinJingMainCoeffiecient: MainCoeffiecient = (YuanQi: number) => ({
  JiChuGongJi: YuanQi * 0.18,
  ZongGongJi: YuanQi * 1.85,
  PoFangLevel: YuanQi * 0.3,
  HuiXinLevel: YuanQi * 0.38,
});

export const createYiJinJingFactory = createDpsCoreFactory(
  CoreEnum.YuanQi,
  YiJinJingMainCoeffiecient
);

export default DpsCore;
