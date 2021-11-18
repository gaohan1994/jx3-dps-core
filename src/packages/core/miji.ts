import { Target } from '../support';
import Skill from './skill_new';

// 秘籍的类型
export type MiJiTag = 0 | 1;
// 属性秘籍
export const ValueMiJi = 0;
// 忽视防御秘籍
export const IgnoreDefenceMiJi = 1;

export class MiJi {
  public _options: any;

  // 秘籍增益对象
  public target: string;
  // 秘籍数值
  public value: number;
  // 秘籍的类型
  public tag: MiJiTag;
  // 是否已经加成过
  public used: boolean;

  constructor(options: any) {
    this._options = options;
    this.target = options.target;
    this.tag = options.tag;
    this.value = options.value;
    this.used = false;
  }
}

// 创建秘籍
export const createMiJi = function (target: string, value: number, tag?: MiJiTag) {
  return new MiJi({ target, value, tag: tag !== undefined ? tag : ValueMiJi });
}

/**
 * 返回秘籍加成的技能
 */
export const combination = function combineSkillWithMiJi(skill: Skill, target: Target): Skill {
  let _target = target;

  // 拿到秘籍
  let miJi = skill.miJi;

  /**
   * 加成属性秘籍
   *
   * @param {Skill} skill
   * @param {MiJi} miJi
   */
  function combineValueMiJi(skill: any, miJi: MiJi) {
    const { target, value } = miJi;
    skill[target] += value;
  }

  /**
   * 加成无视防御秘籍
   *
   * @param {*} skill
   * @param {MiJi} miJi
   */
  function combineIgnoreDefenceMiJi(skill: Skill, miJi: MiJi) {
    const { value } = miJi;

    // 剩余防御系数
    const remainingDefenceCoefficient = 1 - value;
    // 剩余内防
    const remainingNeiDang = _target.neiFang * remainingDefenceCoefficient;
    // 承伤系数
    const coefficient = _target.defenseCoefficient / (_target.defenseCoefficient + remainingNeiDang);

    skill.targetDamageCoefficient = coefficient;
  }

  // 遍历秘籍
  for (let i = 0; i < miJi.length; i++) {
    const currentMiJi = miJi[i];
    const { tag } = currentMiJi;

    // 如果已经加成过这个秘籍则不会再次加成
    if (currentMiJi.used === true) {
      continue;
    }

    try {
      switch (tag) {
        case ValueMiJi: {
          combineValueMiJi(skill, currentMiJi);
          break;
        }
        case IgnoreDefenceMiJi: {
          combineIgnoreDefenceMiJi(skill, currentMiJi);
          break;
        }
        default: {
          break;
        }
      }
    } finally {
      // currentMiJi.used = true;
    }
  }

  return skill;
}