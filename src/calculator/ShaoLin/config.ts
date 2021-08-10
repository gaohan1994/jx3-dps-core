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
  PoZhao = 'PoZhao',
  NaYunShi = 'NaYunShi',
  HengSaoLiuHe = 'HengSaoLiuHe',
  HengSaoLiuHeDot = 'HengSaoLiuHeDot',
  ShouQueShi = 'ShouQueShi',
  PuDuSiFang = 'PuDuSiFang',
  XiangMo = 'XiangMo',
  SuoDi = 'SuoDi',
  TiHuGuanDing = 'TiHuGuanDing',
  FoGuo = 'FoGuo',
  WeiTuoXianChu = 'WeiTuoXianChu',
  LiuHeGun = 'LiuHeGun',
  FeiJian = 'FeiJian',
}