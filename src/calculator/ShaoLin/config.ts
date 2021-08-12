import { EnChants } from "../../types";

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

export const YJJConfig = {
  [SkillNames.WeiTuoXianChu]: {
    skillTimes: 25,
    skillName: SkillNames.WeiTuoXianChu,
    skillTitle: '韦陀献杵',
  },
  [SkillNames.PoZhao]: {
    skillTimes: 30,
    skillName: SkillNames.PoZhao,
    skillTitle: '破招',
  },
  [SkillNames.NaYunShi]: {
    skillTimes: 39,
    skillName: SkillNames.NaYunShi,
    skillTitle: '拿云式',
  },
  [SkillNames.HengSaoLiuHe]: {
    skillTimes: 32,
    skillName: SkillNames.HengSaoLiuHe,
    skillTitle: '横扫六合',
  },
  [SkillNames.HengSaoLiuHeDot]: {
    skillTimes: 155,
    skillName: SkillNames.HengSaoLiuHeDot,
    skillTitle: '横扫六合DOT',
  },
  [SkillNames.ShouQueShi]: {
    skillTimes: 45,
    skillName: SkillNames.ShouQueShi,
    skillTitle: '守缺式',
  },
  [SkillNames.PuDuSiFang]: {
    skillTimes: 44,
    skillName: SkillNames.PuDuSiFang,
    skillTitle: '普渡四方',
  },
  [SkillNames.XiangMo]: {
    skillTimes: 64,
    skillName: SkillNames.XiangMo,
    skillTitle: '降魔',
  },
  [SkillNames.SuoDi]: {
    skillTimes: 39,
    skillName: SkillNames.SuoDi,
    skillTitle: '缩地',
  },
  [SkillNames.TiHuGuanDing]: {
    skillTimes: 22,
    skillName: SkillNames.TiHuGuanDing,
    skillTitle: '醍醐灌顶',
  },
  [SkillNames.FoGuo]: {
    skillTimes: 55,
    skillName: SkillNames.FoGuo,
    skillTitle: '佛果',
  },
  [SkillNames.LiuHeGun]: {
    skillTimes: 172,
    skillName: SkillNames.LiuHeGun,
    skillTitle: '六合棍',
  },
  [SkillNames.FeiJian]: {
    skillTimes: 50,
    skillName: SkillNames.FeiJian,
    skillTitle: '飞剑',
  },
  [EnChants.EnChantHand]: {
    skillTimes: 30,
    skillName: EnChants.EnChantHand,
    skillTitle: '附魔头',
  },
  [EnChants.EnChantShoe]: {
    skillTimes: 15,
    skillName: EnChants.EnChantShoe,
    skillTitle: '附魔鞋',
  },
}