
import { Options, SkillInfo, SkillTimeLib, skillTimesIsNumber } from "../../packages/core/skill";
import { EnChantsList, JiaSuValue, SkillContext, YiJinJingValues } from "../../types";
import curry from "../../componet/curry";

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

/**
 * @time 08-31
 * 柯里化合并技能数
 */
const mergeSkillTimes = curry<SkillTimeLib>(function () {
  const skills: SkillTimeLib[] = [].slice.call(arguments);

  let mergedSkillTiems: {
    [name: string]: number
  } = {
    [JiaSuValue.YiDuanJiaSu]: 0,
    [JiaSuValue.ErDuanJiaSu]: 0,
  };

  for (let index = 0; index < skills.length; index++) {
    const currentSkill = skills[index];
    if (skillTimesIsNumber(currentSkill)) {
      for (let key in mergedSkillTiems) {
        mergedSkillTiems[key] += currentSkill;
      }
    } else {
      for (let key in mergedSkillTiems) {
        mergedSkillTiems[key] += currentSkill[key as JiaSuValue];
      }
    }
  }
  return mergedSkillTiems;
});

/**
 * @time 08-31
 * 操作技能数
 */
const updateSkillTimes = function (value: SkillTimeLib, callback: (value: number) => number): SkillTimeLib {
  let times = value;
  if (skillTimesIsNumber(times)) {
    times = callback(times);
  } else {
    for (let key in times) {
      times[key as JiaSuValue] = callback(times[key as JiaSuValue]);
    }
  }
  return times;
}

// 获得正式版技能数
export function getNormalSkillTimes(skillName: string): SkillTimeLib {
  switch (skillName) {
    case SkillNames.PoZhao: {
      return 30;
    }
    case SkillNames.NaYunShi: {
      return {
        YiDuanJiaSu: 26 * 1.5,
        ErDuanJiaSu: 33 * 1.5 + 1.5
      }
    }
    case SkillNames.WeiTuoXianChu: {
      return {
        YiDuanJiaSu: Math.round(38 - (26 * 0.5)),
        ErDuanJiaSu: Math.round(38 - (26 * 0.5) + 1.5)
      }
    }
    case SkillNames.HengSaoLiuHe: {
      return 32;
    }
    case SkillNames.ShouQueShi: {
      return 45;
    }
    case SkillNames.HengSaoLiuHeDot: {
      return {
        YiDuanJiaSu: 155,
        ErDuanJiaSu: 160,
      };
    }
    case SkillNames.PuDuSiFang: {
      return {
        YiDuanJiaSu: 45,
        ErDuanJiaSu: 49
      };
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
      return mergeSkillTimes(
        getNormalSkillTimes(SkillNames.NaYunShi),
        getNormalSkillTimes(SkillNames.WeiTuoXianChu),
      );
    }
    case SkillNames.SuoDi: {
      return updateSkillTimes(
        mergeSkillTimes(
          getNormalSkillTimes(SkillNames.NaYunShi),
          getNormalSkillTimes(SkillNames.WeiTuoXianChu),
        ),
        (value) => (value + 3 * 5) / 2,
      );
    }
    case SkillNames.FoGuo: {
      return updateSkillTimes(
        mergeSkillTimes(
          getNormalSkillTimes(SkillNames.NaYunShi),
          getNormalSkillTimes(SkillNames.WeiTuoXianChu),
          getNormalSkillTimes(SkillNames.PuDuSiFang),
          getNormalSkillTimes(SkillNames.ShouQueShi),
          getNormalSkillTimes(SkillNames.HengSaoLiuHe),
          getNormalSkillTimes(SkillNames.TiHuGuanDing),
        ),
        (value) => value * 0.3 * 0.9
      );
    }
  }
}

// 讲武堂技能数
export function getImmortalSkillConfig(skillName: string): SkillTimeLib {
  switch (skillName) {
    case SkillNames.PoZhao: {
      return {
        YiDuanJiaSu: 30,
        ErDuanJiaSu: 31
      }
    }
    case SkillNames.NaYunShi: {
      return {
        YiDuanJiaSu: 33 * 1.5,
        ErDuanJiaSu: 33 * 1.5 + 1.5
      }
    }
    case SkillNames.WeiTuoXianChu: {
      return {
        YiDuanJiaSu: Math.round(39 - (33 * 0.5)),
        ErDuanJiaSu: Math.round(39 - (33 * 0.5) + 1.5)
      }
    }
    case SkillNames.HengSaoLiuHe: {
      return 31;
    }
    case SkillNames.ShouQueShi: {
      return 45;
    }
    case SkillNames.HengSaoLiuHeDot: {
      return {
        YiDuanJiaSu: 155,
        ErDuanJiaSu: 160,
      };
    }
    case SkillNames.PuDuSiFang: {
      return {
        YiDuanJiaSu: 45,
        ErDuanJiaSu: 49
      };
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
      return mergeSkillTimes(
        getImmortalSkillConfig(SkillNames.NaYunShi),
        getImmortalSkillConfig(SkillNames.WeiTuoXianChu),
      );
    }
    case SkillNames.SuoDi: {
      return updateSkillTimes(
        mergeSkillTimes(
          getImmortalSkillConfig(SkillNames.NaYunShi),
          getImmortalSkillConfig(SkillNames.WeiTuoXianChu),
        ),
        (value) => (value + 3 * 5) / 2,
      );
    }
    case SkillNames.FoGuo: {
      return updateSkillTimes(
        mergeSkillTimes(
          getImmortalSkillConfig(SkillNames.NaYunShi),
          getImmortalSkillConfig(SkillNames.WeiTuoXianChu),
          getImmortalSkillConfig(SkillNames.PuDuSiFang),
          getImmortalSkillConfig(SkillNames.ShouQueShi),
          getImmortalSkillConfig(SkillNames.HengSaoLiuHe),
          getImmortalSkillConfig(SkillNames.TiHuGuanDing),
        ),
        (value) => value * 0.3 * 0.9
      );
    }
  }
}

export const YJJConfig: {
  [name: string]: Partial<SkillInfo>,
} = {
  [SkillNames.PoZhao]: {
    // skillTimesLib: getNormalSkillTimes(SkillNames.PoZhao),
    skillName: SkillNames.PoZhao,
    skillTitle: '破招',
  },
  [SkillNames.NaYunShi]: {
    // skillTimesLib: getNormalSkillTimes(SkillNames.NaYunShi),
    skillName: SkillNames.NaYunShi,
    skillTitle: '拿云式',
  },
  [SkillNames.WeiTuoXianChu]: {
    // skillTimesLib: getNormalSkillTimes(SkillNames.WeiTuoXianChu),
    skillName: SkillNames.WeiTuoXianChu,
    skillTitle: '韦陀献杵',

    // 每触发一次cw增加2.5次韦陀
    cwSkillTimesImpact: (cwTimes) => {
      return cwTimes * 2.5
    }
  },
  [SkillNames.HengSaoLiuHe]: {
    // skillTimesLib: getNormalSkillTimes(SkillNames.HengSaoLiuHe),
    skillName: SkillNames.HengSaoLiuHe,
    skillTitle: '横扫六合',
  },
  [SkillNames.ShouQueShi]: {
    // skillTimesLib: getNormalSkillTimes(SkillNames.ShouQueShi),
    skillName: SkillNames.ShouQueShi,
    skillTitle: '守缺式',
    // 每触发一次cw增加0.5次守缺
    cwSkillTimesImpact: (cwTimes) => {
      return cwTimes * 0.5;
    }
  },
  [SkillNames.HengSaoLiuHeDot]: {
    // skillTimesLib: getNormalSkillTimes(SkillNames.HengSaoLiuHeDot),
    skillName: SkillNames.HengSaoLiuHeDot,
    skillTitle: '横扫六合DOT',
  },
  [SkillNames.PuDuSiFang]: {
    // skillTimesLib: getNormalSkillTimes(SkillNames.PuDuSiFang),
    skillName: SkillNames.PuDuSiFang,
    skillTitle: '普渡四方',
    // 每触发一次cw减少3次普度
    cwSkillTimesImpact: (cwTimes) => {
      return - (cwTimes * 3)
    }
  },
  [SkillNames.LiuHeGun]: {
    // skillTimesLib: getNormalSkillTimes(SkillNames.LiuHeGun),
    skillName: SkillNames.LiuHeGun,
    skillTitle: '六合棍',
  },
  [SkillNames.XiangMo]: {
    // skillTimesLib: getSkillTimes(SkillNames.XiangMo),
    skillName: SkillNames.XiangMo,
    skillTitle: '降魔',
  },
  [SkillNames.SuoDi]: {
    // skillTimesLib: getNormalSkillTimes(SkillNames.SuoDi),
    skillName: SkillNames.SuoDi,
    skillTitle: '缩地',
  },
  [SkillNames.TiHuGuanDing]: {
    // skillTimesLib: getNormalSkillTimes(SkillNames.TiHuGuanDing),
    skillName: SkillNames.TiHuGuanDing,
    skillTitle: '醍醐灌顶',
  },
  [SkillNames.FoGuo]: {
    // skillTimesLib: getNormalSkillTimes(SkillNames.FoGuo),
    skillName: SkillNames.FoGuo,
    skillTitle: '佛果',
  },
  [SkillNames.FeiJian]: {
    // skillTimesLib: getNormalSkillTimes(SkillNames.FeiJian),
    skillName: SkillNames.FeiJian,
    skillTitle: '飞剑',
  },
  [EnChantsList.EnChantHand]: {
    // skillTimesLib: getNormalSkillTimes(EnChantsList.EnChantHand),
    skillName: EnChantsList.EnChantHand,
    skillTitle: '附魔手',
  },
  [EnChantsList.EnChantShoe]: {
    // skillTimesLib: getNormalSkillTimes(EnChantsList.EnChantShoe),
    skillName: EnChantsList.EnChantShoe,
    skillTitle: '附魔鞋',
  },
}

export const getYJJConfig = (version: YiJinJingValues): {
  [name: string]: SkillInfo,
} => {

  let currentGetSkillFunction: (skillName: string) => SkillTimeLib;

  if (version === YiJinJingValues.Normal) {
    currentGetSkillFunction = getNormalSkillTimes;
  } else if (version === YiJinJingValues.Immortal) {
    currentGetSkillFunction = getImmortalSkillConfig;
  }

  for (let key in YJJConfig) {
    YJJConfig[key].skillTimesLib = currentGetSkillFunction(YJJConfig[key].skillName)
  }
  return YJJConfig as any;
}
