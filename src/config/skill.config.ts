/**
 * 技能增益配置文件
 * @Author: centerm.gaohan
 * @Date: 2021-08-31 17:33:35
 * @Last Modified by: Harper.Gao
 * @Last Modified time: 2021-11-19 10:23:42
 */
import { BuffKeys } from '@types';

export enum TeamSkillList {
  JinGangNuMu = '金刚怒目',
  QinLongJue = '擒龙诀',
  PoCangQiong = '破苍穹',
  XiuQi = '秀气',
  FenLan = '分澜',
}
export const TeamSkillConfig = [
  {
    name: TeamSkillList.JinGangNuMu,
    data: [{ gainTarget: BuffKeys.SolarAttackPowerBasePercent, value: 0.4, coverage: 1 }],
  },
  {
    // 擒龙诀 20%基础 25%覆盖
    name: TeamSkillList.QinLongJue,
    data: [{ gainTarget: BuffKeys.SolarAttackPowerBasePercent, value: 0.2, coverage: 0.25 }],
  },
  {
    name: TeamSkillList.PoCangQiong,
    data: [{ gainTarget: BuffKeys.HuiXiao, value: 0.1, coverage: 1 }],
  },
  {
    name: TeamSkillList.XiuQi,
    data: [
      { gainTarget: BuffKeys.Spunk, value: 111, coverage: 1 },
      { gainTarget: BuffKeys.SolarCriticalStrike, value: 70, coverage: 1 },
    ],
  },
  {
    name: TeamSkillList.FenLan,
    data: [{ gainTarget: BuffKeys.SolarAttackPowerBasePercent, value: 0.07, coverage: 1 }],
  },
];

export enum GroupSkillList {
  HongFa = '弘法',
  LiDiChengFo = '立地成佛',
  ChaoShengYan = '朝圣言',
  JieHuoZhan = '戒火斩',
  LieRiZhan = '烈日斩',
  HaoLingSanJun = '号令三军',
  MeiHuaDun = '梅花盾',
  HanXiaoQianJun = '寒宵千军',
}

export const GroupSkillConfig = [
  {
    name: GroupSkillList.JieHuoZhan,
    data: [{ gainTarget: BuffKeys.damageBonus, value: 0.03, coverage: 1 }],
  },
  {
    name: GroupSkillList.LieRiZhan,
    data: [{ gainTarget: BuffKeys.damageBonus, value: 0.05, coverage: 1 }],
  },
  {
    name: GroupSkillList.LiDiChengFo,
    data: [{ gainTarget: BuffKeys.ignoreDefense, value: 0.12, coverage: 1 }],
  },
  {
    name: GroupSkillList.HanXiaoQianJun,
    data: [{ gainTarget: BuffKeys.SolarOvercomePercent, value: 0.1, coverage: 0.5 }],
  },
  /**
   * @todo 新增团队技能宏法，默认覆盖率10%
   * @time 08-31
   */
  {
    name: GroupSkillList.HongFa,
    data: [{ gainTarget: BuffKeys.SolarAttackPowerBasePercent, value: 0.3, coverage: 0.1 }],
  },
  {
    name: GroupSkillList.MeiHuaDun,
    data: [{ gainTarget: BuffKeys.globalIgnoreDefense, value: 0.15, coverage: 0.2 }],
  },
];
