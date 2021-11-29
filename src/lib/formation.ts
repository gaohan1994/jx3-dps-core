/**
 * 阵法增益配置文件
 * @Author: centerm.gaohan
 * @Date: 2021-08-31 17:33:22
 * @Last Modified by: Harper.Gao
 * @Last Modified time: 2021-11-19 10:23:34
 */
import { FormationValue, BuffKeys } from '../types';

export const FormationsGains = {
  [FormationValue.TianGuLeiYinZhen]: {
    name: FormationValue.TianGuLeiYinZhen,
    data: [
      { gainTarget: BuffKeys.JiChuGongJiPercent, value: 0.15, coverage: 1 },
      { gainTarget: BuffKeys.PoFangPercent, value: 0.1, coverage: 1 },
      { gainTarget: BuffKeys.WuShuang, value: 1.95, coverage: 1 },
    ],
  },
  [FormationValue.DuJingZhen]: {
    name: FormationValue.DuJingZhen,
    data: [
      { gainTarget: BuffKeys.JiChuGongJiPercent, value: 0.05, coverage: 1 },
      { gainTarget: BuffKeys.HuiXin, value: 0.03, coverage: 1 },
      { gainTarget: BuffKeys.HuiXiao, value: 0.1, coverage: 1 },
      { gainTarget: BuffKeys.PoFangLevel, value: 0.05, coverage: 1 },
    ],
  },
  [FormationValue.TianLuoZhen]: {
    name: FormationValue.TianLuoZhen,
    data: [
      { gainTarget: BuffKeys.JiChuGongJiPercent, value: 0.05, coverage: 1 },
      { gainTarget: BuffKeys.HuiXin, value: 0.05, coverage: 1 },
      { gainTarget: BuffKeys.HuiXiao, value: 0.15, coverage: 1 },
      { gainTarget: BuffKeys.globalIgnoreDefense, value: 0.05, coverage: 1 },
    ],
  },
  [FormationValue.QiChunZhen]: {
    name: FormationValue.QiChunZhen,
    data: [
      { gainTarget: BuffKeys.HuiXin, value: 0.08, coverage: 1 },
      { gainTarget: BuffKeys.HuiXiao, value: 0.15, coverage: 1 },
      { gainTarget: BuffKeys.WuShuang, value: 1.95, coverage: 1 },
    ],
  },
  [FormationValue.MoWenZhen]: {
    name: FormationValue.MoWenZhen,
    data: [
      { gainTarget: BuffKeys.JiChuGongJiPercent, value: 0.1, coverage: 1 },
      { gainTarget: BuffKeys.HuiXin, value: 0.08, coverage: 1 },
      { gainTarget: BuffKeys.WuShuang, value: 1.95, coverage: 1 },
    ],
  },
};
