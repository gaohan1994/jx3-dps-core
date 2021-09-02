import numeral from 'numeral';
import compose from './compose';
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

export {
  compose,
  CoreMiddleware,
  // curry
};