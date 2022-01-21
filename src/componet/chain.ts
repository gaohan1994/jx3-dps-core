/**
 * @todo
 * 新增职责链设计模式
 * 用来创建技能次数、技能计算等模块
 */

const NEXT_CHAIN_SUCCESSOR = 'NEXT_CHAIN_SUCCESSOR';
type NEXT_CHAIN_SUCCESSOR = typeof NEXT_CHAIN_SUCCESSOR;

interface ChainFunc<T> {
  (params: T): NEXT_CHAIN_SUCCESSOR;
}

class ChainComponent<T> {
  static NEXT_CHAIN_SUCCESSOR: NEXT_CHAIN_SUCCESSOR = NEXT_CHAIN_SUCCESSOR;

  private func: ChainFunc<T>;
  private nextChain: ChainComponent<T>;

  constructor(func: ChainFunc<T>) {
    this.func = func;
    this.nextChain = null;
  }

  public setNextSuccessor(nextChain: ChainComponent<T>): ChainComponent<T> {
    return (this.nextChain = nextChain);
  }

  public passRequest(...rest: any[]) {
    const result = this.func.apply(this, arguments);
    if (result === NEXT_CHAIN_SUCCESSOR) {
      return this.nextChain && this.nextChain.passRequest.apply(this.nextChain, arguments);
    }
    return result;
  }
}

export default ChainComponent;
