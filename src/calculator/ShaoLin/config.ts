
import { DpsCore } from "../../packages/core";
import { EnChantsList, SkillContext } from "../../types";

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

export function getCWSkillTimes(skillName: string, times: number, CWTimes: number): number {
  switch (skillName) {
    // CW每触发一次 韦陀次数+2.5
    case SkillNames.WeiTuoXianChu: {
      return times + CWTimes * 2.5;
    }

    // CW触发一次 守缺次数+1.5
    case SkillNames.ShouQueShi: {
      return times + CWTimes * 0.5;
    }

    // CW触发一次 普度次数-3
    case SkillNames.PuDuSiFang: {
      return times - CWTimes * 3;
    }

    default: {
      return times;
    }
  }
}

export function getSkillTimes(skillName: string): any {
  switch (skillName) {
    case SkillNames.PoZhao: {
      return ({ core }: SkillContext) => {
        const isErDuanJiaSu = core.JiaSu === DpsCore.JiaSuList.ErDuanJiaSu;
        if (!isErDuanJiaSu) {
          return 30;
        }
        return 31;
      }
    }
    case SkillNames.NaYunShi: {
      return ({ core }: SkillContext) => {
        const isErDuanJiaSu = core.JiaSu === DpsCore.JiaSuList.ErDuanJiaSu;
        if (!isErDuanJiaSu) {
          return Math.round(33 * 1.5);
        }
        return Math.round(33 * 1.5 + 1.5);
      }
    }
    case SkillNames.WeiTuoXianChu: {
      return ({ core, support }: SkillContext) => {
        // console.log('core', core);
        // console.log('support', support);
        const isErDuanJiaSu = core.JiaSu === DpsCore.JiaSuList.ErDuanJiaSu;
        // 技能次数
        let times = 0;
        if (!isErDuanJiaSu) {
          times = Math.round(39 - (33 * 0.5));
        }
        times = Math.round(39 - (33 * 0.5) + 1.5);
        const hasCw = support.hasCw();
        if (hasCw) {
          return getCWSkillTimes(SkillNames.WeiTuoXianChu, times, support.CWTimes);
        }
        return times;
      }
    }
    case SkillNames.HengSaoLiuHe: {
      return 31;
    }
    case SkillNames.ShouQueShi: {
      return ({ support }: SkillContext) => {
        let times = 45;
        const hasCw = support.hasCw();
        if (hasCw) {
          return getCWSkillTimes(SkillNames.ShouQueShi, times, support.CWTimes);
        }
        return times;
      }
    }
    case SkillNames.HengSaoLiuHeDot: {
      return ({ core }: SkillContext) => {
        const isErDuanJiaSu = core.JiaSu === DpsCore.JiaSuList.ErDuanJiaSu;
        if (!isErDuanJiaSu) {
          return 155;
        }
        return 160;
      }
    }
    case SkillNames.PuDuSiFang: {
      return ({ core, support }: SkillContext) => {
        const isErDuanJiaSu = core.JiaSu === DpsCore.JiaSuList.ErDuanJiaSu;
        let times = 0;
        if (!isErDuanJiaSu) {
          times = 45;
        }
        times = 49;

        const hasCw = support.hasCw();
        if (hasCw) {
          return getCWSkillTimes(SkillNames.PuDuSiFang, times, support.CWTimes);
        }
        return times;
      }
    }
    case SkillNames.LiuHeGun: {
      return 172;
    }
    case SkillNames.TiHuGuanDing: {
      return 22;
    }
    case EnChantsList.EnChantHand: {
      return 30;
    }
    case EnChantsList.EnChantShoe: {
      return 15;
    }
    case SkillNames.XiangMo: {
      return (...rest: any) => {
        return getSkillTimes(SkillNames.NaYunShi)(...rest) + getSkillTimes(SkillNames.WeiTuoXianChu)(...rest);
      }
    }
    case SkillNames.SuoDi: {
      return (...rest: any) => {
        return (getSkillTimes(SkillNames.NaYunShi)(...rest) + getSkillTimes(SkillNames.WeiTuoXianChu)(...rest) + 3 * 5) / 2;
      }
    }
    case SkillNames.FoGuo: {
      return (...rest: any) => {
        return Math.floor(
          (
            getSkillTimes(SkillNames.NaYunShi)(...rest)
            + getSkillTimes(SkillNames.WeiTuoXianChu)(...rest)
            + getSkillTimes(SkillNames.PuDuSiFang)(...rest)
            + getSkillTimes(SkillNames.ShouQueShi)(...rest)
            + getSkillTimes(SkillNames.HengSaoLiuHe)
            + getSkillTimes(SkillNames.TiHuGuanDing)
          ) * 0.3 * 0.9
        );
      }
    }
  }
}

export const YJJConfig = {
  [SkillNames.PoZhao]: {
    skillTimes: getSkillTimes(SkillNames.PoZhao),
    skillName: SkillNames.PoZhao,
    skillTitle: '破招',
  },
  [SkillNames.NaYunShi]: {
    skillTimes: getSkillTimes(SkillNames.NaYunShi),
    skillName: SkillNames.NaYunShi,
    skillTitle: '拿云式',
  },
  [SkillNames.WeiTuoXianChu]: {
    skillTimes: getSkillTimes(SkillNames.WeiTuoXianChu),
    skillName: SkillNames.WeiTuoXianChu,
    skillTitle: '韦陀献杵',
  },
  [SkillNames.HengSaoLiuHe]: {
    skillTimes: getSkillTimes(SkillNames.HengSaoLiuHe),
    skillName: SkillNames.HengSaoLiuHe,
    skillTitle: '横扫六合',
  },
  [SkillNames.ShouQueShi]: {
    skillTimes: getSkillTimes(SkillNames.ShouQueShi),
    skillName: SkillNames.ShouQueShi,
    skillTitle: '守缺式',
  },
  [SkillNames.HengSaoLiuHeDot]: {
    skillTimes: getSkillTimes(SkillNames.HengSaoLiuHeDot),
    skillName: SkillNames.HengSaoLiuHeDot,
    skillTitle: '横扫六合DOT',
  },
  [SkillNames.PuDuSiFang]: {
    skillTimes: getSkillTimes(SkillNames.PuDuSiFang),
    skillName: SkillNames.PuDuSiFang,
    skillTitle: '普渡四方',
  },
  [SkillNames.LiuHeGun]: {
    skillTimes: getSkillTimes(SkillNames.LiuHeGun),
    skillName: SkillNames.LiuHeGun,
    skillTitle: '六合棍',
  },
  [SkillNames.XiangMo]: {
    skillTimes: getSkillTimes(SkillNames.XiangMo),
    skillName: SkillNames.XiangMo,
    skillTitle: '降魔',
  },
  [SkillNames.SuoDi]: {
    skillTimes: getSkillTimes(SkillNames.SuoDi),
    skillName: SkillNames.SuoDi,
    skillTitle: '缩地',
  },
  [SkillNames.TiHuGuanDing]: {
    skillTimes: getSkillTimes(SkillNames.TiHuGuanDing),
    skillName: SkillNames.TiHuGuanDing,
    skillTitle: '醍醐灌顶',
  },
  [SkillNames.FoGuo]: {
    skillTimes: getSkillTimes(SkillNames.FoGuo),
    skillName: SkillNames.FoGuo,
    skillTitle: '佛果',
  },
  [SkillNames.FeiJian]: {
    skillTimes: getSkillTimes(SkillNames.FeiJian),
    skillName: SkillNames.FeiJian,
    skillTitle: '飞剑',
  },
  [EnChantsList.EnChantHand]: {
    skillTimes: getSkillTimes(EnChantsList.EnChantHand),
    skillName: EnChantsList.EnChantHand,
    skillTitle: '附魔手',
  },
  [EnChantsList.EnChantShoe]: {
    skillTimes: getSkillTimes(EnChantsList.EnChantShoe),
    skillName: EnChantsList.EnChantShoe,
    skillTitle: '附魔鞋',
  },
}

