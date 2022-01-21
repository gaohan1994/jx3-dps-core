import { addition, multiplication } from '@componet/index';
import ChainComponent from '@componet/chain';
import { pipe } from '@componet/compose';
import { SkillChainPayload, YiJinJingQiXueVersion } from './calculatorWoker';
import { JiaSuValue } from '@packages/core/core';

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
  XinZheng = 'XinZheng',
  XinZhengGunWu = 'XinZhengGunWu',
  EnChantHand = 'EnChantHand',
  EnChantShoe = 'EnChantShoe',
}
// 技能名称
export enum SkillTitles {
  PoZhao = '破招',
  NaYunShi = '拿云式',
  HengSaoLiuHe = '横扫六合',
  HengSaoLiuHeDot = '横扫六合DOT',
  ShouQueShi = '守缺式',
  PuDuSiFang = '普度四方',
  XiangMo = '降魔',
  SuoDi = '缩地',
  TiHuGuanDing = '醍醐灌顶',
  FoGuo = '佛果',
  WeiTuoXianChu = '韦陀献杵',
  LiuHeGun = '六合棍',
  XinZheng = '心诤·扫击',
  XinZhengGunWu = '心诤·棍舞',
  EnChantHand = '附魔手',
  EnChantShoe = '附魔脚',
}

interface SkillTimesChainPipelinePayload extends SkillChainPayload {
  currentSkillConfig: number[];
  currentSkillTimes: number;
}

type SkillNameKeys = keyof typeof SkillNames;
export type SkillTimes = { [key in SkillNameKeys]: number };
const normalSkillTimes: SkillTimes = {
  PoZhao: 0,
  ShouQueShi: 0,
  PuDuSiFang: 0,
  TiHuGuanDing: 0,
  NaYunShi: 0,
  WeiTuoXianChu: 0,
  XiangMo: 0,
  HengSaoLiuHe: 0,
  HengSaoLiuHeDot: 0,
  EnChantHand: 0,
  EnChantShoe: 0,
  SuoDi: 0,
  FoGuo: 0,
  XinZheng: 0,
  XinZhengGunWu: 0,
  LiuHeGun: 172,
};

// 根据加速段位选择技能数
const calculateJiaSu = (payload: SkillTimesChainPipelinePayload) => {
  const { core, currentSkillConfig } = payload;
  const token = core.JiaSu === JiaSuValue.YiDuanJiaSu ? 0 : 1;
  const currentSkillTimes = currentSkillConfig[token];
  return { ...payload, currentSkillTimes };
};
// 根据是否有橙武增加技能次数
const calculateCWTimes = (payload: SkillTimesChainPipelinePayload) => {
  if (payload.currentSkillTimes === 0) {
    return payload;
  }
  const { support, currentSkillConfig } = payload;
  if (support.hasCw()) {
    const increaseCWSkillTimes = support.CWTimes * currentSkillConfig[2];
    payload.currentSkillTimes += increaseCWSkillTimes;
  }
  return payload;
};
// 创建技能管道
const getSkillTimesPipeline: (
  params: Partial<SkillTimesChainPipelinePayload>
) => SkillTimesChainPipelinePayload = pipe(calculateJiaSu, calculateCWTimes);

// 把管道生成的技能数量增加到配置文件里
const makeSkillTimesFromPipelineToConfig = (
  payload: SkillTimesChainPipelinePayload,
  skillName: SkillNameKeys
) => {
  const { currentSkillTimes } = payload;
  normalSkillTimes[skillName] = currentSkillTimes;
};

export const createSkillTimesChain = (payload: SkillChainPayload): SkillTimes => {
  const poZhaoChain = new ChainComponent((payload: SkillChainPayload) => {
    const config = [30, 30, 0];
    makeSkillTimesFromPipelineToConfig(
      getSkillTimesPipeline({
        ...payload,
        currentSkillConfig: config,
      }),
      'PoZhao'
    );
    return ChainComponent.NEXT_CHAIN_SUCCESSOR;
  });

  const NaYunBaseSkillTimes = 28;
  const naYunChain = new ChainComponent((payload: SkillChainPayload) => {
    const config = [NaYunBaseSkillTimes * 1.5, NaYunBaseSkillTimes * 1.5 + 1.5, 0];
    makeSkillTimesFromPipelineToConfig(
      getSkillTimesPipeline({
        ...payload,
        currentSkillConfig: config,
      }),
      'NaYunShi'
    );
    return ChainComponent.NEXT_CHAIN_SUCCESSOR;
  });
  const weiTuoXianChuChain = new ChainComponent((payload: SkillChainPayload) => {
    const config = [36 - NaYunBaseSkillTimes * 0.5, 36 - NaYunBaseSkillTimes * 0.5 + 1.5, 2.5];
    makeSkillTimesFromPipelineToConfig(
      getSkillTimesPipeline({
        ...payload,
        currentSkillConfig: config,
      }),
      'WeiTuoXianChu'
    );
    return ChainComponent.NEXT_CHAIN_SUCCESSOR;
  });
  const hengSaoLiuHeChain = new ChainComponent((payload: SkillChainPayload) => {
    const config = [44, 44, 0];
    makeSkillTimesFromPipelineToConfig(
      getSkillTimesPipeline({
        ...payload,
        currentSkillConfig: config,
      }),
      'HengSaoLiuHe'
    );
    return ChainComponent.NEXT_CHAIN_SUCCESSOR;
  });
  const hengSaoLiuHeDOTChain = new ChainComponent((payload: SkillChainPayload) => {
    const config = [155, 155, 0];
    makeSkillTimesFromPipelineToConfig(
      getSkillTimesPipeline({
        ...payload,
        currentSkillConfig: config,
      }),
      'HengSaoLiuHeDot'
    );
    return ChainComponent.NEXT_CHAIN_SUCCESSOR;
  });
  const shouQueShiChain = new ChainComponent((payload: SkillChainPayload) => {
    const config = [45, 45, 0.5];
    makeSkillTimesFromPipelineToConfig(
      getSkillTimesPipeline({
        ...payload,
        currentSkillConfig: config,
      }),
      'ShouQueShi'
    );
    return ChainComponent.NEXT_CHAIN_SUCCESSOR;
  });
  const puDuSiFangChain = new ChainComponent((payload: SkillChainPayload) => {
    const config = [45, 49, -3];
    makeSkillTimesFromPipelineToConfig(
      getSkillTimesPipeline({
        ...payload,
        currentSkillConfig: config,
      }),
      'PuDuSiFang'
    );
    return ChainComponent.NEXT_CHAIN_SUCCESSOR;
  });
  const tiHuGuanDingChain = new ChainComponent((payload: SkillChainPayload) => {
    const { qiXueVersion } = payload.options;
    if (qiXueVersion !== YiJinJingQiXueVersion.TiHuGuanDing) {
      return ChainComponent.NEXT_CHAIN_SUCCESSOR;
    }
    const config = [45, 49, -3];
    makeSkillTimesFromPipelineToConfig(
      getSkillTimesPipeline({
        ...payload,
        currentSkillConfig: config,
      }),
      'TiHuGuanDing'
    );
    return ChainComponent.NEXT_CHAIN_SUCCESSOR;
  });

  const xinZhengChain = new ChainComponent((payload: SkillChainPayload) => {
    const { qiXueVersion } = payload.options;
    if (qiXueVersion !== YiJinJingQiXueVersion.XinZheng) {
      return ChainComponent.NEXT_CHAIN_SUCCESSOR;
    }
    const config = [11, 11, 0];
    makeSkillTimesFromPipelineToConfig(
      getSkillTimesPipeline({
        ...payload,
        currentSkillConfig: config,
      }),
      'XinZheng'
    );
    return ChainComponent.NEXT_CHAIN_SUCCESSOR;
  });
  const xinZhengGunWuChain = new ChainComponent(() => {
    normalSkillTimes.XinZhengGunWu = normalSkillTimes.XinZheng * 6;
    return ChainComponent.NEXT_CHAIN_SUCCESSOR;
  });
  const enChantHandChain = new ChainComponent((payload: SkillChainPayload) => {
    const config = [30, 30, 0];
    makeSkillTimesFromPipelineToConfig(
      getSkillTimesPipeline({
        ...payload,
        currentSkillConfig: config,
      }),
      'EnChantHand'
    );
    return ChainComponent.NEXT_CHAIN_SUCCESSOR;
  });
  const enChantShoeChain = new ChainComponent((payload: SkillChainPayload) => {
    const config = [15, 15, 0];
    makeSkillTimesFromPipelineToConfig(
      getSkillTimesPipeline({
        ...payload,
        currentSkillConfig: config,
      }),
      'EnChantShoe'
    );
    return ChainComponent.NEXT_CHAIN_SUCCESSOR;
  });
  const suoDiChain = new ChainComponent(() => {
    normalSkillTimes.SuoDi =
      addition(normalSkillTimes.NaYunShi, normalSkillTimes.WeiTuoXianChu + 3 * 5) / 2;
    return ChainComponent.NEXT_CHAIN_SUCCESSOR;
  });
  const foGuoChain = new ChainComponent((payload: SkillChainPayload) => {
    const { qiXueVersion } = payload.options;
    const baseFuoGuoSkillTimes =
      qiXueVersion === YiJinJingQiXueVersion.XinZheng
        ? addition(
            normalSkillTimes.NaYunShi,
            normalSkillTimes.WeiTuoXianChu,
            normalSkillTimes.PuDuSiFang,
            normalSkillTimes.ShouQueShi,
            normalSkillTimes.HengSaoLiuHe,
            normalSkillTimes.XinZheng,
            normalSkillTimes.XinZhengGunWu
          )
        : addition(
            normalSkillTimes.NaYunShi,
            normalSkillTimes.WeiTuoXianChu,
            normalSkillTimes.PuDuSiFang,
            normalSkillTimes.ShouQueShi,
            normalSkillTimes.HengSaoLiuHe,
            normalSkillTimes.TiHuGuanDing
          );
    normalSkillTimes.FoGuo = multiplication(baseFuoGuoSkillTimes, 0.35, 0.9);
    return ChainComponent.NEXT_CHAIN_SUCCESSOR;
  });
  const xiangMoChain = new ChainComponent(() => {
    normalSkillTimes.XiangMo = addition(normalSkillTimes.NaYunShi, normalSkillTimes.WeiTuoXianChu);
    return null;
  });
  poZhaoChain
    .setNextSuccessor(xinZhengChain)
    .setNextSuccessor(xinZhengGunWuChain)
    .setNextSuccessor(naYunChain)
    .setNextSuccessor(weiTuoXianChuChain)
    .setNextSuccessor(hengSaoLiuHeChain)
    .setNextSuccessor(hengSaoLiuHeDOTChain)
    .setNextSuccessor(shouQueShiChain)
    .setNextSuccessor(puDuSiFangChain)
    .setNextSuccessor(tiHuGuanDingChain)
    .setNextSuccessor(enChantHandChain)
    .setNextSuccessor(enChantShoeChain)
    .setNextSuccessor(suoDiChain)
    .setNextSuccessor(foGuoChain)
    .setNextSuccessor(xiangMoChain);

  poZhaoChain.passRequest(payload);

  return normalSkillTimes;
};
