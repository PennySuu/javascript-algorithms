import LinkedListNode from './LinkedListNode'
import Comparator from '../../utils/Comparator'

export default class LinkedList {
  /**
   *@param {Function} [comparatorFunction]
   */
  constructor(comparatorFunction) {
    /** @var LinkedListNode */
    this.head = null

    /** @var LinkedListNode */
    this.tail = null

    this.compare = new Comparator(comparatorFunction)
  }
  //在头部插入一个节点
  prepend(value) {
    //构造一个新节点当做头部节点
    const newNode = new LinkedListNode(value, this.head)
    this.head = newNode

    //如果还没有尾部节点，让刚才创建的新节点作为尾部节点
    if (!this.tail) {
      this.tail = newNode
    }
    return this
  }
  /**
   *@description 在尾部插入一个节点
   *@param {*} value
   *@return {LinkedList}
   */
  append(value) {
    const newNode = new LinkedListNode(value)

    //如果没有头部节点，让刚才创建的新节点作为头部节点
    if (!this.head) {
      this.head = newNode
      this.tail = newNode

      return this
    }

    //将新节点作为尾部节点
    this.tail.next = newNode
    this.tail = newNode

    return this
  }
  /**
   *@description 删除某个节点
   *@param {*} value
   *@return {LinkedListNode}
   */
  delete(value) {
    if (!this.head) {
      return null
    }
    let deleteNode = null

    //如果删除的是头部节点，那么使下一个节点作为头部节点
    while (this.head && this.compare.equal(this.head, value)) {
      deleteNode = this.head
      this.head = this.head.next
    }

    let currentNode = this.head

    if (currentNode !== null) {
      while (currentNode.next) {
        //如果下一个节点将被删除，那么使下一个节点的下一下节点代替该节点
        if (this.compare.equal(currentNode.next.value, value)) {
          deleteNode = currentNode.next
          currentNode.next = currentNode.next.next
        } else {
          currentNode = currentNode.next
        }
      }
    }
    //如果删除的是最后一个节点，更新this.tail
    if (this.compare.equal(this.tail.value, value)) {
      this.tail = currentNode
    }
    return deleteNode
  }
  /**
   *@description 查找节点
   * @param {Object} findParams
   * @param {*} findParams.value
   * @param {function} [findParams.callback]
   * @return {LinkedListNode}
   */
  find(value = undefined, callback = undefined) {
    if (!this.head) {
      return null
    }

    let currentNode = this.head
    while (currentNode) {
      //如果有回调函数，使用回调函数去查找节点
      if (callback && callback(currentNode.value)) {
        return currentNode
      }
      if (value !== undefined && this.compare.equal(currentNode.value, value)) {
        return currentNode
      }
      currentNode = currentNode.next
    }
    return null
  }
  /**
   *@description 删除尾部节点
   * @return {LinkedListNode}
   */
  deleteTail() {
    if (this.head === this.tail) {
      const deletedTail = this.tail
      this.head = null
      this.tail = null

      return deletedTail
    }
    const deletedTail = this.tail

    let currentNode = this.head
    while (currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null
      } else {
        currentNode = currentNode.next
      }
    }
    this.tail = currentNode
    return deletedTail
  }
  /**
   *@description 删除头部节点
   * @return {LinkedListNode}
   */
  deleteHead() {
    if (!this.head) {
      return null
    }

    const deletedHead = this.head

    if (this.head.next) {
      this.head = this.head.next
    } else {
      this.head = null
      this.tail = null
    }

    return deletedHead
  }
  /**
   *@description 转换为数组
   * @return {LinkedListNode[]}
   */
  toArray() {
    const nodes = []

    let currentNode = this.head
    while (currentNode) {
      nodes.push(currentNode)
      currentNode = currentNode.next
    }

    return nodes
  }
  /**
   * @param {function} [callback]
   * @return {string}
   */
  toString(callback) {
    return this.toArray()
      .map(node => node.toString(callback))
      .toString()
  }
}
