/**
 * 计算器核心类
 * 
 * @Author: centerm.gaohan 
 * @Date: 2021-08-07 20:43:49 
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-11-18 18:51:54
 */
import invariant from 'invariant';
import { CharacterTypes } from '../../types';

/**
 * 角色加速段数
 */
export enum JiaSuValue {
  YiDuanJiaSu = 'YiDuanJiaSu',
  ErDuanJiaSu = 'ErDuanJiaSu',
}

function createEnum<T extends string>(keys: Array<T>): { [K in T]: K } {
  return keys.reduce((result, key) => {
    result[key] = key
    return result;
  }, Object.create(null));
}

// 创建 K: V
export const CoreEnum = createEnum(['YuanQi', 'GenGu', 'LiDao', 'ShenFa']);

export type CoreEnum = keyof typeof CoreEnum;

class DpsCore {
  static JiaSuList = JiaSuValue;
  /**
   * 角色主属性 元气 根骨 身法 力道 之一
   *
   * @type {CharacterTypes}
   * @memberof DpsCore
   */
  public type: CoreEnum;
  /**
   * 基础攻击
   *
   * @type {number}
   * @memberof DpsCore
   */
  public JiChuGongJi: number;
  /**
   * 攻击系数 计算总攻击用的
   *
   * @type {number}
   * @memberof DpsCore
   */
  public GongJiCoefficient: number;
  /**
   * 总攻击
   *
   * @type {number}
   * @memberof DpsCore
   */
  public ZongGongJi: number;
  /**
   * 武器伤害
   *
   * @type {number}
   * @memberof DpsCore
   */
  public WuQiShangHai: number;
  /**
   * 会心
   *
   * @type {number}
   * @memberof DpsCore
   */
  public HuiXin: number;
  /**
   * 会心效果
   *
   * @type {number}
   * @memberof DpsCore
   */
  public HuiXiao: number;
  /**
   * 破防
   *
   * @type {number}
   * @memberof DpsCore
   */
  public PoFang: number;
  /**
   * 破招
   *
   * @type {number}
   * @memberof DpsCore
   */
  public PoZhao: number;
  /**
   * 加速
   *
   * @type {JiaSuValue}
   * @memberof DpsCore
   */
  public JiaSu: JiaSuValue;
  /**
   * 无双
   *
   * @type {number}
   * @memberof DpsCore
   */
  public WuShuang: number;
  /**
   * 元气
   *
   * @type {number}
   * @memberof DpsCore
   */
  public YuanQi?: number;
  /**
   * 根骨
   *
   * @type {number}
   * @memberof DpsCore
   */
  public GenGu?: number;
  /**
   * 力道
   *
   * @type {number}
   * @memberof DpsCore
   */
  public LiDao?: number;
  /**
   * 身法
   *
   * @type {number}
   * @memberof DpsCore
   */
  public ShenFa?: number;

  public options: any;

  public mainCoeffiecient: Function;

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

    try {

    } catch (error) {
      console.log('初始化计算核心类时出错！请检查传递参数', error)
    }
  }

  /**
   * 打印属性
   *
   * @memberof DpsCore
   */
  public showAttributes() {
    console.log(`
      主属性 ${this.YuanQi || this.LiDao || this.GenGu || this.ShenFa}
      武器伤害 ${this.WuQiShangHai}
      基础攻击 ${this.JiChuGongJi}
      总攻击 ${this.ZongGongJi}
      会心 ${this.HuiXin}
      会心效果 ${this.HuiXiao}
      破防 ${this.PoFang}
      破招 ${this.PoZhao}
      加速 ${this.JiaSu}
      无双 ${this.WuShuang}
    `);
  }
}

/**
 * 计算dps core 的总攻击并赋值
 */
export const createDpsCoreZongGongJi = function (core: DpsCore): void {
  /**
   * 计算总攻击
   * 总攻击 = 主属性加成的总攻击 + 基础攻击 * 基础攻击转化系数
   */
  const zongGongJi = core.mainCoeffiecient(core[core.type]).ZongGongJi + core.JiChuGongJi * core.GongJiCoefficient;
  core.ZongGongJi = zongGongJi;
}

/**
 * 根据角色属性创建角色
 */
export const createDpsCoreFactory = function createDpsCoreFactoryCombineCoreType(coreType: CoreEnum, mainCoeffiecient: Function) {

  function createDpsCore(
    mainAttribute: number,
    JiChuGongJi: number,
    HuiXin: number,
    HuiXiao: number,
    PoFang: number,
    PoZhao: number,
    WuShuang: number,
    JiaSu: JiaSuValue,
    WuQiShangHai?: number,
  ) {
    return new DpsCore({
      /**
       * 设置人物主属性
       * 
       * 设置职业成长
       * @param coreType
       * @param mainCoeffiecient
       */
      type: coreType,
      [coreType]: mainAttribute,
      mainCoeffiecient,
      /**
       * 设置基础属性
       */
      JiChuGongJi,
      GongJiCoefficient: 1,
      HuiXin,
      HuiXiao,
      PoFang,
      PoZhao,
      WuShuang,
      /**
       * 设置加速和武器伤害
       */
      JiaSu,
      WuQiShangHai,
    });
  }

  return createDpsCore;
}

const YiJinJingMainCoeffiecient = (YuanQi: number) => {
  return {
    JiChuGongJi: YuanQi * 0.18,
    ZongGongJi: YuanQi * 1.85,
    PoFangLevel: YuanQi * 0.3,
    HuiXinLevel: YuanQi * 0.38
  };
}

export const createYiJinJingFactory = createDpsCoreFactory(CoreEnum.YuanQi, YiJinJingMainCoeffiecient);

export default DpsCore;