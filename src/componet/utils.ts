import { CoreEnum } from "../packages/core/core_new";

export function deepClone<T>(target: T): T {
  if (typeof target !== 'object') return;
  let newObj: any = target instanceof Array ? [] : {};

  for (let key in target) {
    if (target.hasOwnProperty(key)) {
      newObj[key] = typeof target[key] === 'object'
        ? deepClone(target[key])
        : target[key];
    }
  }

  return newObj;
}

export const mergeAttribute = function <T extends Object>(attribute1: T, attribute2: T) {
  for (let key in attribute2) {
    if (attribute1.hasOwnProperty(key)) {
      attribute1[key] += attribute2[key] as any;
    }
  }
}

export const getTargetAttribute = (attributes: any, target: string): number => {
  return attributes[target] ?? 0;
}

export const getMainAttribute =
  (mainAttributeType: string) => (attributes: any) => getTargetAttribute(attributes, mainAttributeType);

export const getYuanQiAttribute = getMainAttribute(CoreEnum.YuanQi);

type CombineAttribute = {
  target: string;
  value: number;
}
// 增加属性并返回增加属性之后的新的值
export const makeAttributeCombine = (prevAttributes: any, combineAttribute: CombineAttribute) => {
  const { target, value } = combineAttribute;
  const nextAttributes = deepClone(prevAttributes);
  nextAttributes[target] = nextAttributes[target] + value;
  return nextAttributes;
}

export const makeYuanQiAttributeCombine =
  (prevAttributes: any, yuanQi: number) => makeAttributeCombine(prevAttributes, { target: CoreEnum.YuanQi, value: yuanQi });

