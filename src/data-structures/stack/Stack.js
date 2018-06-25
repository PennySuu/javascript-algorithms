import LinkedList from '../linked-list/LinkedList'

export default class Stack {
  constructor() {
    this.linkedList = new LinkedList()
  }
  isEmpty() {
    return !this.linkedList.tail
  }
  /**
   * 获取尾部元素值
   */
  peek() {
    if (this.isEmpty()) {
      return null
    }
    return this.linkedList.tail.value
  }
  /**
   * 入栈
   * @param {*} value
   */
  push(value) {
    this.linkedList.append(value)
  }
  /**
   * 出栈
   */
  pop() {
    const removedTail = this.linkedList.deleteTail()
    return removedTail ? removedTail.value : null
  }
  toArray() {
    return this.linkedList
      .toArray()
      .map(linkedListNode => linkedListNode.value)
      .reverse()
  }
  toString(callback) {
    return this.linkedList.toString(callback)
  }
}
