/**
 * 阵法增益配置文件
 * @Author: centerm.gaohan 
 * @Date: 2021-08-31 17:33:22 
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-09-02 13:49:27
 */
import { Formation, FormationValue, SupportContextKeys } from "../types";

export const FormationsGains: Formation = {
  [FormationValue.TianGuLeiYinZhen]: {
    name: FormationValue.TianGuLeiYinZhen,
    data: [
      { gainTarget: SupportContextKeys.JiChuGongJiPercent, value: 0.15, coverage: 1 },
      { gainTarget: SupportContextKeys.PoFangPercent, value: 0.1, coverage: 1 },
      { gainTarget: SupportContextKeys.WuShuang, value: 1.95, coverage: 1 },
    ]
  },
  [FormationValue.DuJingZhen]: {
    name: FormationValue.DuJingZhen,
    data: [
      { gainTarget: SupportContextKeys.JiChuGongJiPercent, value: 0.05, coverage: 1 },
      { gainTarget: SupportContextKeys.HuiXin, value: 0.03, coverage: 1 },
      { gainTarget: SupportContextKeys.HuiXiao, value: 0.1, coverage: 1 },
      { gainTarget: SupportContextKeys.PoFangLevel, value: 0.05, coverage: 1 },
    ],
  },
  [FormationValue.TianLuoZhen]: {
    name: FormationValue.TianLuoZhen,
    data: [
      { gainTarget: SupportContextKeys.JiChuGongJiPercent, value: 0.05, coverage: 1 },
      { gainTarget: SupportContextKeys.HuiXin, value: 0.05, coverage: 1 },
      { gainTarget: SupportContextKeys.HuiXiao, value: 0.15, coverage: 1 },
      { gainTarget: SupportContextKeys.globalIgnoreDefense, value: 0.05, coverage: 1 },
    ],
  },
  [FormationValue.QiChunZhen]: {
    name: FormationValue.QiChunZhen,
    data: [
      { gainTarget: SupportContextKeys.HuiXin, value: 0.08, coverage: 1 },
      { gainTarget: SupportContextKeys.HuiXiao, value: 0.15, coverage: 1 },
      { gainTarget: SupportContextKeys.WuShuang, value: 1.95, coverage: 1 },
    ],
  },
  [FormationValue.MoWenZhen]: {
    name: FormationValue.MoWenZhen,
    data: [
      { gainTarget: SupportContextKeys.JiChuGongJiPercent, value: 0.1, coverage: 1 },
      { gainTarget: SupportContextKeys.HuiXin, value: 0.08, coverage: 1 },
      { gainTarget: SupportContextKeys.WuShuang, value: 1.95, coverage: 1 },
    ]
  }
}