import LinkedList from '../linked-list/LinkedList'

export default class Stack {
  constructor() {
    this.linkedList = new LinkedList()
  }
  /**
   * @return {boolean}
   */
  isEmpty() {
    return !this.linkedList.tail
  }
  /**
   * 获取尾部元素值
   * @return {*}
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
   * @return {*}
   */
  pop() {
    const removedTail = this.linkedList.deleteTail()
    return removedTail ? removedTail.value : null
  }
  /**
   * @return {*[]}
   */
  toArray() {
    return this.linkedList
      .toArray()
      .map(linkedListNode => linkedListNode.value)
      .reverse()
  }
  /**
   * @param {Function} callback
   * @return {string}
   */
  toString(callback) {
    return this.linkedList.toString(callback)
  }
}
