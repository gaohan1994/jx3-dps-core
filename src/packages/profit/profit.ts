/**
 * 收益计算器
 * @Author: centerm.gaohan
 * @Date: 2021-09-03 16:23:37
 * @Last Modified by: Harper.Gao
 * @Last Modified time: 2021-11-21 17:59:07
 */

import invariant from 'invariant';
import YiJinJing from '@/calculator/ShaoLin/YiJinJing';
import { Gain, ProfitCore, SupportContextKeys } from '../../types';
import { deepClone } from '@/componet/utils';

type ProfitConstructorOptions = {
  /**
   * @todo 创建核心类的初始化参数
   * @param options
   */
  options: any;
  /**
   * @todo 计算类的增益列表
   *
   * @type {Gain[]}
   */
  gainList: Gain[];
};

class Profit {
  // 创建核心类的参数
  private baseOptions: any;

  private baseGainList: Gain[];

  private baseDps: number;

  private profitList: ProfitCore[] = [];

  constructor(profitOptions: ProfitConstructorOptions) {
    const { options, gainList = [] } = profitOptions;

    const YuanQiProfit: ProfitCore = {
      title: '元气收益',
      multiple: 10,
      // 325破防 = 73元气
      proportion: 325 / 73,
      attrProfit: 0,
      pointProfit: 0,
      gain: {
        name: 'Profit-YuanQi',
        data: [{ gainTarget: SupportContextKeys.YuanQi, value: 3 * 10, coverage: 1 }],
      },
      stone: new Map(),
      profitWithStone: new Map(),
    };
    /**
     * 设置五行石属性
     */
    YuanQiProfit.stone.set(6, 13);
    YuanQiProfit.stone.set(7, 21);
    YuanQiProfit.stone.set(8, 27);
    this.profitList.push(YuanQiProfit);

    const JiChuGongJiProfit: ProfitCore = {
      title: '基础攻击收益',
      multiple: 10,
      // 325破防 = 175基础攻击
      proportion: 325 / 175,
      attrProfit: 0,
      pointProfit: 0,
      gain: {
        name: 'Profit-JiChuGongJi',
        data: [
          { gainTarget: SupportContextKeys.JiChuGongJi, value: (175 / 73) * 3 * 10, coverage: 1 },
        ],
      },
      stone: new Map(),
      profitWithStone: new Map(),
    };
    /**
     * 设置五行石属性
     */
    JiChuGongJiProfit.stone.set(6, 38);
    JiChuGongJiProfit.stone.set(7, 51);
    JiChuGongJiProfit.stone.set(8, 66);
    this.profitList.push(JiChuGongJiProfit);

    const PoFangProfit: ProfitCore = {
      title: '破防收益',
      multiple: 100,
      proportion: 1,
      attrProfit: 0,
      pointProfit: 0,
      gain: {
        name: 'Profit-PoFang',
        data: [
          { gainTarget: SupportContextKeys.PoFangLevel, value: (325 * 3 * 100) / 73, coverage: 1 },
        ],
      },
      stone: new Map(),
      profitWithStone: new Map(),
    };
    /**
     * 设置五行石属性
     */
    PoFangProfit.stone.set(6, 72);
    PoFangProfit.stone.set(7, 96);
    PoFangProfit.stone.set(8, 124);
    this.profitList.push(PoFangProfit);

    const HuiXinProfit: ProfitCore = {
      title: '会心收益',
      multiple: 1000,
      proportion: 1,
      attrProfit: 0,
      pointProfit: 0,
      gain: {
        name: 'Profit-HuiXin',
        data: [
          { gainTarget: SupportContextKeys.HuiXinLevel, value: (325 * 3 * 1000) / 73, coverage: 1 },
        ],
      },
      stone: new Map(),
      profitWithStone: new Map(),
    };
    HuiXinProfit.stone.set(6, 72);
    HuiXinProfit.stone.set(7, 96);
    HuiXinProfit.stone.set(8, 124);
    this.profitList.push(HuiXinProfit);

    const HuiXiaoProfit: ProfitCore = {
      title: '会效收益',
      multiple: 10,
      proportion: 1,
      attrProfit: 0,
      pointProfit: 0,
      gain: {
        name: 'Profit-HuiXiao',
        data: [
          { gainTarget: SupportContextKeys.HuiXiaoLevel, value: (325 * 3 * 10) / 73, coverage: 1 },
        ],
      },
      stone: new Map(),
      profitWithStone: new Map(),
    };
    HuiXiaoProfit.stone.set(6, 72);
    HuiXiaoProfit.stone.set(7, 96);
    HuiXiaoProfit.stone.set(8, 124);
    this.profitList.push(HuiXiaoProfit);

    const WuShuangProfit: ProfitCore = {
      title: '无双收益',
      multiple: 10,
      proportion: 1,
      attrProfit: 0,
      pointProfit: 0,
      gain: {
        name: 'Profit-WuShuang',
        data: [
          { gainTarget: SupportContextKeys.WuShuangLevel, value: (325 * 3 * 10) / 73, coverage: 1 },
        ],
      },
      stone: new Map(),
      profitWithStone: new Map(),
    };
    WuShuangProfit.stone.set(6, 72);
    WuShuangProfit.stone.set(7, 96);
    WuShuangProfit.stone.set(8, 124);
    this.profitList.push(WuShuangProfit);

    const PoZhaoProfit: ProfitCore = {
      title: '破招收益',
      multiple: 10,
      proportion: 1,
      attrProfit: 0,
      pointProfit: 0,
      gain: {
        name: 'Profit-PoZhao',
        data: [{ gainTarget: SupportContextKeys.PoZhao, value: (325 * 3 * 10) / 73, coverage: 1 }],
      },
      stone: new Map(),
      profitWithStone: new Map(),
    };
    PoZhaoProfit.stone.set(6, 72);
    PoZhaoProfit.stone.set(7, 96);
    PoZhaoProfit.stone.set(8, 124);
    this.profitList.push(PoZhaoProfit);

    /**
     * 设置核心类
     *  */
    invariant(options !== undefined, '请输入初始化参数');
    this.baseOptions = deepClone(options);

    /**
     * 设置基础增益列表
     */
    this.baseGainList = deepClone(gainList);

    this.setBaseDps();
  }

  private async setBaseDps() {
    const baseCalculator = new YiJinJing({ ...this.baseOptions });
    baseCalculator.setGain(this.baseGainList);

    const result = await baseCalculator.total();
    /**
     * 设置基础dps
     */
    this.baseDps = result.dps;
  }

  public async calculatroProfitCore(item: ProfitCore): Promise<any> {
    /**
     * 获取当前增益列表
     */
    const currentGainList = this.baseGainList.concat(item.gain);

    /**
     * 创建当前收益的计算器
     */
    const currentCalculator = new YiJinJing({ ...this.baseOptions });
    currentCalculator.setGain(currentGainList);

    /**
     * 计算增加增益之后的dps
     */
    const result = await currentCalculator.total();

    /**
     * 计算单位收益
     */
    const attrProfit = ((result.dps / this.baseDps - 1) * 100) / item.multiple;
    /**
     * 计算单分收益
     */
    const pointProfit = attrProfit * item.proportion;

    const currentProfitCore: ProfitCore = {
      ...item,
      attrProfit,
      pointProfit,
      baseDps: this.baseDps,
      profitDps: result.dps,
    };

    // 设置石头收益
    currentProfitCore.stone.forEach((value, key) => {
      currentProfitCore.profitWithStone.set(key, currentProfitCore.pointProfit * value);
    });

    return currentProfitCore;
  }

  /**
   * 计算收益
   *
   * @return {*}  {ProfitCore[]}
   * @memberof Profit
   */
  public calculatroProfit(): Promise<ProfitCore[]> {
    let newProfitList: ProfitCore[] = [];

    const promises: Array<Promise<ProfitCore>> = [];

    /**
     * 遍历每一项收益并计算各收益的值
     */
    this.profitList.forEach(item => {
      const result = this.calculatroProfitCore(item);
      promises.push(result);
    });

    return Promise.all(promises).then(response => {
      newProfitList = response;

      return newProfitList;
    });
  }
}

export default Profit;
