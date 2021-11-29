/**
 * 技能增益配置文件
 * @Author: centerm.gaohan
 * @Date: 2021-08-31 17:33:35
 * @Last Modified by: Harper.Gao
 * @Last Modified time: 2021-11-19 10:23:42
 */
import { BuffKeys, GroupSkillBuffList, TeamSkillValue } from '../types';

export const TeamSkillGains = {
  /**
   * 少林技能
   */
  [TeamSkillValue.JinGangNuMu]: {
    name: TeamSkillValue.JinGangNuMu,
    data: [{ gainTarget: BuffKeys.JiChuGongJiPercent, value: 0.4, coverage: 1 }],
  },
  [TeamSkillValue.QinLongJue]: {
    name: TeamSkillValue.QinLongJue,
    data: [
      // 擒龙诀 20%基础 25%覆盖
      { gainTarget: BuffKeys.JiChuGongJiPercent, value: 0.2, coverage: 0.25 },
    ],
  },

  [TeamSkillValue.PoCangQiong]: {
    name: TeamSkillValue.PoCangQiong,
    data: [{ gainTarget: BuffKeys.HuiXiao, value: 0.1, coverage: 1 }],
  },
  [TeamSkillValue.XiuQi]: {
    name: TeamSkillValue.XiuQi,
    data: [
      { gainTarget: BuffKeys.YuanQi, value: 111, coverage: 1 },
      { gainTarget: BuffKeys.HuiXinLevel, value: 70, coverage: 1 },
    ],
  },
  [TeamSkillValue.FenLan]: {
    name: TeamSkillValue.FenLan,
    data: [{ gainTarget: BuffKeys.JiChuGongJiPercent, value: 0.07, coverage: 1 }],
  },
};

export const GroupSkillGains = {
  [GroupSkillBuffList.JieHuoZhan]: {
    name: GroupSkillBuffList.JieHuoZhan,
    data: [{ gainTarget: BuffKeys.damageBonus, value: 0.03, coverage: 1 }],
  },
  [GroupSkillBuffList.LieRiZhan]: {
    name: GroupSkillBuffList.LieRiZhan,
    data: [{ gainTarget: BuffKeys.damageBonus, value: 0.05, coverage: 1 }],
  },
  [GroupSkillBuffList.LiDiChengFo]: {
    name: GroupSkillBuffList.LiDiChengFo,
    data: [{ gainTarget: BuffKeys.ignoreDefense, value: 0.12, coverage: 1 }],
  },
  [GroupSkillBuffList.HanXiaoQianJun]: {
    name: GroupSkillBuffList.HanXiaoQianJun,
    data: [{ gainTarget: BuffKeys.PoFangPercent, value: 0.1, coverage: 1 }],
  },
  /**
   * @todo 新增团队技能宏法，默认覆盖率10%
   * @time 08-31
   */
  [GroupSkillBuffList.HongFa]: {
    name: GroupSkillBuffList.HongFa,
    data: [{ gainTarget: BuffKeys.JiChuGongJiPercent, value: 0.3, coverage: 0.1 }],
  },
  [GroupSkillBuffList.MeiHuaDun]: {
    name: GroupSkillBuffList.MeiHuaDun,
    data: [{ gainTarget: BuffKeys.globalIgnoreDefense, value: 0.15, coverage: 0.2 }],
  },
};
