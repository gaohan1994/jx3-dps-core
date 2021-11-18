import numeral from 'numeral';
import compose, { composeSync, pipe } from './compose';
import CoreMiddleware from './middleware';
// import curry from './curry';

/**
 * 整理小数位数
 *
 * @export
 * @param {number} number
 * @param {number} [place]
 */
export function floortNumberPlaces(number: number, place?: number) {
  let index = 1;
  let currentPlace = place !== undefined ? place : 0;

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
const multiplication = function multiplicationCalculator(...rest: any[]): number {
  const params: number[] = Array.prototype.slice.call(arguments);
  return params.reduce((prevValue, currentValue) => {
    return prevValue * currentValue;
  }, 1);
}

/**
 * 加法计算器
 *
 * @return {*} 
 */
const addition = function additionCalculator(...rest: any[]): number {
  const params: number[] = Array.prototype.slice.call(arguments);
  return params.reduce((prevValue, currentValue) => {
    return prevValue + currentValue;
  }, 0);
}


export {
  compose,
  CoreMiddleware,
  multiplication,
  addition,
  composeSync,
  pipe,
};