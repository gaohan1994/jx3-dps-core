/**
 * 计算器核心类
 *
 * @Author: centerm.gaohan
 * @Date: 2021-08-07 20:43:49
 * @Last Modified by: Harper.Gao
 * @Last Modified time: 2021-11-19 10:25:28
 */
import invariant from 'invariant';
import { CharacterTypes, JiaSuValue } from '@/types';
import { floortNumberPlaces } from '@/componet';

class DpsCore {
  static JiaSuList = JiaSuValue;

  /**
   * 装分
   *
   * @type {number}
   * @memberof DpsCore
   */
  public score: number;

  /**
   * 角色主属性 元气 根骨 身法 力道 之一
   *
   * @type {CharacterTypes}
   * @memberof DpsCore
   */
  public type: CharacterTypes;

  /**
   * 气血
   *
   * @type {number}
   * @memberof DpsCore
   */
  public QiXue: number;

  /**
   * 基础攻击
   *
   * @type {number}
   * @memberof DpsCore
   */
  public JiChuGongJi: number;

  /**
   * 总攻击
   *
   * @type {number}
   * @memberof DpsCore
   */
  public ZongGongJi: number;

  /**
   * 计算面板攻击的系数
   *
   * @type {number}
   * @memberof DpsCore
   */
  public GongJiCoefficient: number;

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
   * 会心等级
   *
   * @type {number}
   * @memberof DpsCore
   */
  public HuiXinLevel: number;

  /**
   * 会心效果
   *
   * @type {number}
   * @memberof DpsCore
   */
  public HuiXiao: number;

  /**
   * 会心效果等级
   *
   * @type {number}
   * @memberof DpsCore
   */
  public HuiXiaoLevel: number;

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

  public mainCoeffiecient: any;

  constructor(options: any) {
    this.options = options;

    invariant(typeof options.JiChuGongJi === 'number', '攻击不能为空');
    this.JiChuGongJi = floortNumberPlaces(options.JiChuGongJi, 4);

    invariant(typeof options.PoFang === 'number', '破防不能为空');
    this.PoFang = floortNumberPlaces(options.PoFang, 2);

    invariant(typeof options.PoZhao === 'number', '破招不能为空');
    this.PoZhao = floortNumberPlaces(options.PoZhao);

    /**
     * @time 08-29
     * @param JiaSu
     *
     * 加速默认是一段加速修改为直接设置段数
     */
    invariant(options.JiaSu !== undefined, '加速不能为空');
    this.JiaSu = options.JiaSu || DpsCore.JiaSuList.YiDuanJiaSu;

    invariant(typeof options.WuShuang === 'number', '无双不能为空');
    this.WuShuang = floortNumberPlaces(options.WuShuang, 2);

    invariant(typeof options.WuQiShangHai === 'number', '武器伤害不能为空');
    this.WuQiShangHai = floortNumberPlaces(options.WuQiShangHai);

    invariant(typeof options.mainCoeffiecient === 'function', '主属性设置不能为空');
    this.mainCoeffiecient = options.mainCoeffiecient;

    invariant(
      typeof options.YuanQi === 'number' ||
        typeof options.GenGu === 'number' ||
        typeof options.LiDao === 'number' ||
        typeof options.ShenFa === 'number',
      '主属性不能为空'
    );

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

    if (options.ZongGongJi) {
      /**
       * 如果传入的总攻击则使用传入的
       */
      this.ZongGongJi = floortNumberPlaces(options.ZongGongJi, 4);
    } else {
      /**
       * 如果没传入总攻击则计算，需要传入攻击系数
       */
      this.GongJiCoefficient = options.GongJiCoefficient || 1;

      const ZGJ = floortNumberPlaces(
        options.mainCoeffiecient(this[this.type]).ZongGongJi +
          this.JiChuGongJi * this.GongJiCoefficient,
        4
      );
      this.ZongGongJi = ZGJ;
    }

    this.score = options.score;

    this.HuiXin = floortNumberPlaces(options.HuiXin, 2);
    this.HuiXiao = floortNumberPlaces(options.HuiXiao, 2);
  }
}

export default DpsCore;
