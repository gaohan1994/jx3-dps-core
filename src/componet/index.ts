import numeral from 'numeral';

/**
 * 整理小数位数
 *
 * @export
 * @param {number} number
 * @param {number} [place]
 */
export function floortNumberPlaces(number: number, place?: number) {
  let index = 1;
  const currentPlace = place !== undefined ? place : 0;

  // 每多一位小数则 * 10
  for (let i = 0; i < currentPlace; i++) {
    index = index * 10;
  }
  return Math.floor(numeral(number).value() * index) / index;
}

/**
 * 乘法计算器
 *
 * @return {*}
 */
export const multiplication = function multiplicationCalculator(...rest: any[]): number {
  const params: number[] = Array.prototype.slice.call(arguments);
  return params.reduce((prevValue, currentValue) => {
    return prevValue * currentValue;
  }, 1);
};

/**
 * 加法计算器
 *
 * @return {*}
 */
export const addition = function additionCalculator(...rest: any[]): number {
  const params: number[] = Array.prototype.slice.call(arguments);
  return params.reduce((prevValue, currentValue) => {
    return prevValue + currentValue;
  }, 0);
};
