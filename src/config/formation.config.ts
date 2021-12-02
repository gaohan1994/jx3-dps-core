/**
 * 阵法增益配置文件
 * @Author: Harper.Gao
 * @Date: 2021-08-31 17:33:22
 * @Last Modified by: Harper.Gao
 * @Last Modified time: 2021-11-19 10:23:34
 */
import { BuffKeys } from '@/types';

export enum FormationList {
  TianGuLeiYinZhen = '和尚阵',
  DuJingZhen = '毒经阵',
  TianLuoZhen = '田螺阵',
  QiChunZhen = '气纯阵',
  MoWenZhen = '莫问阵',
}

export const FormationsConfig = [
  {
    name: FormationList.TianGuLeiYinZhen,
    data: [
      { gainTarget: BuffKeys.JiChuGongJiPercent, value: 0.15, coverage: 1 },
      { gainTarget: BuffKeys.PoFangPercent, value: 0.1, coverage: 1 },
      { gainTarget: BuffKeys.WuShuang, value: 1.95, coverage: 1 },
    ],
  },
  {
    name: FormationList.DuJingZhen,
    data: [
      { gainTarget: BuffKeys.JiChuGongJiPercent, value: 0.05, coverage: 1 },
      { gainTarget: BuffKeys.HuiXin, value: 0.03, coverage: 1 },
      { gainTarget: BuffKeys.HuiXiao, value: 0.1, coverage: 1 },
      { gainTarget: BuffKeys.PoFangLevel, value: 0.05, coverage: 1 },
    ],
  },
  {
    name: FormationList.TianLuoZhen,
    data: [
      { gainTarget: BuffKeys.JiChuGongJiPercent, value: 0.05, coverage: 1 },
      { gainTarget: BuffKeys.HuiXin, value: 0.05, coverage: 1 },
      { gainTarget: BuffKeys.HuiXiao, value: 0.15, coverage: 1 },
      { gainTarget: BuffKeys.globalIgnoreDefense, value: 0.05, coverage: 1 },
    ],
  },
  {
    name: FormationList.QiChunZhen,
    data: [
      { gainTarget: BuffKeys.HuiXin, value: 0.08, coverage: 1 },
      { gainTarget: BuffKeys.HuiXiao, value: 0.15, coverage: 1 },
      { gainTarget: BuffKeys.WuShuang, value: 1.95, coverage: 1 },
    ],
  },
  {
    name: FormationList.MoWenZhen,
    data: [
      { gainTarget: BuffKeys.JiChuGongJiPercent, value: 0.1, coverage: 1 },
      { gainTarget: BuffKeys.HuiXin, value: 0.08, coverage: 1 },
      { gainTarget: BuffKeys.WuShuang, value: 1.95, coverage: 1 },
    ],
  },
];
