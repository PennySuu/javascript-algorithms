import LinkedList from '../linked-list/LinkedList'

export default class Queue {
  constructor() {
    this.linkedList = new LinkedList()
  }
  isEmpty() {
    return !this.linkedList.tail
  }
  /**
   * 获得对头元素的值
   */
  peek() {
    if (!this.linkedList.head) {
      return null
    }
    return this.linkedList.head.value
  }
  /**
   * 入队
   * @param {*} value
   */
  enqueue(value) {
    this.linkedList.append(value)
  }
  /**
   * 出队
   */
  dequeue() {
    const removedHead = this.linkedList.deleteHead()
    return removedHead ? removedHead.value : null
  }
}
