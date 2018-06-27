import MinHeap from '../heap/MinHeap'
import Comparator from '../../utils/Comparator'

// 优先队列的实现和堆基本一致，区别是我们以元素的权重作为比较的关键值，而不是元素的值
// 继承`MinHeap`类，可以使用`MinHeap`类实现的方法，比如：peek、poll
export default class PriorityQueue extends MinHeap {
  constructor() {
    super()
    // 记录元素的值与权重的对应关系
    this.priorities = {}
    // 重写比较方法，使用权重作为关键值
    this.compare = new Comparator(this.comparePriority.bind(this))
  }

  /**
   * 插入带有权重的元素
   * @param {*} item
   * @param {numer} priority
   * @return {PriorityQueue}
   */
  add(item, priority = 0) {
    this.priorities[item] = priority
    // 调用`MinHeap`父类的方法
    super.add(item)

    return this
  }
  /**
   * 移除元素
   * @param {*} item
   * @param {Function} customFindingComparator
   * @return {PriorityQueue}
   */
  remove(item, customFindingComparator) {
    super.remove(item, customFindingComparator)
    delete this.priorities[item]

    return this
  }
  /**
   * 更改元素的权重
   * @param {*} item
   * @param {number} priority
   * @return {PriorityQueue}
   */
  changePriority(item, priority) {
    // 因为我们在构造器函数中重写了比较方法，这里需要找到元素值与`item`相等的元素，所以传入comparator
    this.remove(item, new Comparator(this.compareValue))
    this.add(item, priority)

    return this
  }

  /**
   * 查找某个元素
   * @param {*} item
   * @return {Nmuber[]}
   */
  findByValue(item) {
    return this.find(item, new Comparator(this.compareValue))
  }

  /**
   * 判断是否有某个元素
   * @param {*} item
   * @return {boolean}
   */
  hasValue(item) {
    return this.findByValue(item).length > 0
  }
  /**
   * 以权重作为比较的关键值
   * @param {} a
   * @param {*} b
   * @return {number}
   */
  comparePriority(a, b) {
    if (this.priorities[a] === this.priorities[b]) {
      return 0
    }
    return this.priorities[a] < this.priorities[b] ? -1 : 1
  }
  /**
   * 以元素的值作为比较的关键值
   * @param {*} a
   * @param {*} b
   * @return {number}
   */
  compareValue(a, b) {
    if (a === b) {
      return 0
    }
    return a < b ? -1 : 1
  }
}
