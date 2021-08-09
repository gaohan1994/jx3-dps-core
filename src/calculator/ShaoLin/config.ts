import { SupportContextKeys } from "../../types";

/**
 * 少林的技能
 */
export const shaoLinSkills = {
  JinGangNuMu: {
    name: "JinGangNuMu",
    data: [
      { gainTarget: SupportContextKeys.JiChuGongJiPercent, value: 0.4 },
    ]
  },
  QinLongJue: {
    name: 'QinLongJue',
    data: [
      // 擒龙诀 20%基础 25%覆盖
      { gainTarget: SupportContextKeys.JiChuGongJiPercent, value: 0.2 * 0.25 },
    ]
  }
}
export enum SkillNames {
  WeiTuoXianChu = 'WeiTuoXianChu',
  LiuHeGun = 'LiuHeGun',
}