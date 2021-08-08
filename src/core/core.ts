/**
 * 计算器核心类
 * 
 * @Author: centerm.gaohan 
 * @Date: 2021-08-07 20:43:49 
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-08 19:27:35
 */
import invariant = require('invariant');
import chalk = require('chalk');
import { CharacterTypes } from '../types';

class DpsCore {

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
  public ZongGongji: number;

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
   * @type {number}
   * @memberof DpsCore
   */
  public JiaSu: number;

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

  constructor(options: any) {
    this.options = options;

    invariant(typeof options.ZongGongji === 'number', '总攻击不能为空');
    this.ZongGongji = options.ZongGongji;

    invariant(typeof options.JiChuGongJi === 'number', '攻击不能为空');
    this.JiChuGongJi = options.JiChuGongJi;

    invariant(typeof options.PoFang === 'number', '破防不能为空');
    this.PoFang = options.PoFang;

    invariant(typeof options.PoZhao === 'number', '破招不能为空');
    this.PoZhao = options.PoZhao;

    invariant(typeof options.JiaSu === 'number', '加速不能为空');
    this.JiaSu = options.JiaSu;

    invariant(typeof options.WuShuang === 'number', '无双不能为空');
    this.WuShuang = options.WuShuang;

    invariant(typeof options.WuQiShangHai === 'number', '武器伤害不能为空');
    this.WuQiShangHai = options.WuQiShangHai;

    invariant(
      typeof options.YuanQi === 'number' ||
      typeof options.GenGu === 'number' ||
      typeof options.LiDao === 'number' ||
      typeof options.ShenFa === 'number',
      '主属性不能为空'
    );
    this.YuanQi = options.YuanQi;
    this.GenGu = options.GenGu;
    this.LiDao = options.LiDao;
    this.ShenFa = options.ShenFa;

    this.score = options.score;
    this.type = options.type;

    this.HuiXin = options.HuiXin;
    this.HuiXiao = options.HuiXiao;
  }

  /**
   * 打印属性
   *
   * @memberof DpsCore
   */
  public showAttributes() {
    console.log(chalk.yellow(`---- core start ----`));
    console.log(chalk.yellow(`
      主属性 ${this.getCharacterType()} ${this.YuanQi || this.LiDao || this.GenGu || this.ShenFa}
      武器伤害 ${this.WuQiShangHai}
      基础攻击 ${this.JiChuGongJi}
      总攻击 ${this.ZongGongji}
      会心 ${this.HuiXin}
      会心效果 ${this.HuiXiao}
      破防 ${this.PoFang}
      破招 ${this.PoZhao}
      加速 ${this.JiaSu}
      无双 ${this.WuShuang} 
    `));
    console.log(chalk.yellow(`---- core end ----`));
  }

  /**
   * 获取角色类型
   *
   * @memberof DpsCore
   */
  public getCharacterType = () => {
    switch (this.type) {
      case CharacterTypes.GenGu:
        return '根骨';
      case CharacterTypes.LiDao:
        return '力道';
      case CharacterTypes.ShenFa:
        return '身法';
      case CharacterTypes.YuanQi:
        return '元气';
      default:
        return;
    }
  }
}

export default DpsCore;