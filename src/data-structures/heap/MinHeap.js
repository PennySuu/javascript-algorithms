import Comparator from '../../utils/Comparator'

export default class MinHeap {
  /**
   * @param {Function} comparatorFunction
   */
  constructor(comparatorFunction) {
    // Array representation of the heap
    this.heapContainer = []
    this.compare = new Comparator(comparatorFunction)
  }
  /**
   * 获取左子节点索引
   * @param {number} parentInex
   * @return {number}
   */
  getLeftChildIndex(parentInex) {
    return 2 * parentInex + 1
  }
  /**
   * 获取右子节点索引
   * @param {number} parentInex
   * @return {number}
   */
  getRightChildIndex(parentInex) {
    return 2 * parentInex + 2
  }
  /**
   * 获取父节点索引
   * @param {number} childIndex
   * @return {number}
   */
  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2)
  }
  /**
   * 判断是否有父节点
   * @param {number} childIndex
   * @return {boolean}
   */
  hasParent(childIndex) {
    return this.getParentIndex(childIndex) >= 0
  }
  /**
   * 判断是否有左子节点
   * @param {number} parentIndex
   * @return {boolean}
   */
  hasLeftChild(parentIndex) {
    return this.getLeftChildIndex(parentIndex) < this.heapContainer.length
  }
  /**
   * 判断是否有右子节点
   * @param {number} parentIndex
   * @return {boolean}
   */
  hasRightChild(parentIndex) {
    return this.getRightChildIndex(parentIndex) < this.heapContainer.length
  }
  /**
   * 获取左子节点
   * @param {number} parentInex
   * @return {*}
   */
  leftChild(parentIndex) {
    return this.heapContainer[this.getLeftChildIndex(parentIndex)]
  }
  /**
   * 获取右子节点
   * @param {number} parentInex
   * @return {*}
   */
  rightChild(parentIndex) {
    return this.heapContainer[this.getRightChildIndex(parentIndex)]
  }
  /**
   * 获取父节点
   * @param {number} childIndex
   * @return {*}
   */
  parent(childIndex) {
    return this.heapContainer(this.getParentIndex(childIndex))
  }
  /**
   * 交换两个节点
   * @param {number} indexOne
   * @param {number} indexTwo
   */
  swap(indexOne, indexTwo) {
    const tmp = this.heapContainer[indexTwo]
    this.heapContainer[indexTwo] = this.heapContainer[indexOne]
    this.heapContainer[indexOne] = tmp
  }
  /**
   * 获取根节点的值
   * @return {*}
   */
  peek() {
    if (this.heapContainer.length === 0) {
      return null
    }
    return this.heapContainer[0]
  }
  /**
   * 移除根节点
   * @return {*}
   */
  poll() {
    if (this.heapContainer.length === 0) {
      return null
    }

    if (this.heapContainer.length === 1) {
      return this.heapContainer.pop()
    }

    const item = this.heapContainer[0]
    // 将最后一个节点移动根节点的位置
    this.heapContainer[0] = this.heapContainer.pop()
    // 对根节点进行向下排序
    this.heapifyDown()
    return item
  }
  /**
   * 插入新节点
   * @param {*} item
   * @return {MinHeap}
   */
  add(item) {
    // 将新节点插入最末尾
    this.heapContainer.push(item)
    // 对新节点进行向下排序
    this.heapifyUp()
    return this
  }
  /**
   * 删除
   * @param {*} item
   * @param {Function} customFindingComparator
   */
  remove(item, customFindingComparator) {
    // 查询需要删除的元素的总数
    const customComparator = customFindingComparator || this.compare
    const numberOfItemsRemove = this.find(item, customComparator).length

    for (let iteration = 0; iteration < numberOfItemsRemove; iteration += 1) {
      // 每次删除之后需要重新获取`item`的索引，因为删除之后重新排序，索引也会跟着变化
      const indexToRemove = this.find(item, customComparator).pop()

      // 如果要删除的是最后一个元素，直接删除，且不需要重新排序
      if (indexToRemove === this.heapContainer.length - 1) {
        this.heapContainer.pop()
      } else {
        // 用最后一个元素替换删除的元素
        this.heapContainer[indexToRemove] = this.heapContainer.pop()

        // 获取父节点
        const parentItem = this.hasParent(indexToRemove)
          ? this.parent(indexToRemove)
          : null
        // 获取左子节点
        const leftChild = this.hasLeftChild(indexToRemove)
          ? this.leftChild(indexToRemove)
          : null

        // 开始计算排序
        // 1. 有子节点时，如果没有父节点或者父节点比刚才替换的节点小时，向下重排
        // 2. 否则向上重排（没有子节点说明在最后一层，只能向上；有子节点，但是父节点比该节点大，因为我们实现的是小根堆，也要向上）
        if (
          leftChild !== null &&
          (parent === null ||
            this.compare.lessThan(
              parentItem,
              this.heapContainer[indexToRemove]
            ))
        ) {
          this.heapifyDown(indexToRemove)
        } else {
          this.heapifyUp(indexToRemove)
        }
      }
    }

    return this
  }
  /**
   * 查找某个元素，返回符合条件的元素的索引
   * @param {*} item
   * @param {Comparator} customComparator
   * @return {Number[]}
   */
  find(item, customComparator) {
    const foundItemIndices = []
    const comparator = customComparator || this.compare
    for (
      let itemIndex = 0;
      itemIndex < this.heapContainer.length;
      itemIndex++
    ) {
      if (comparator.equal(item, this.heapContainer[itemIndex])) {
        foundItemIndices.push(itemIndex)
      }
    }

    return foundItemIndices
  }
  /**
   * 向上重排
   * @param {number} customStartIndex
   */
  heapifyUp(customStartIndex) {
    // 获取最后一个元素或某个索引下的元素，向上比较、交互，直到某个父节点比当前值小为止
    let currentIndex = customStartIndex || this.heapContainer.length - 1
    while (
      this.hasParent(currentIndex) &&
      this.compare.lessThan(
        this.heapContainer[currentIndex],
        this.parent(currentIndex)
      )
    ) {
      this.swap(currentIndex, this.getParentIndex(currentIndex))
      currentIndex = this.getParentIndex(currentIndex)
    }
  }
  /**
   * 向下重排
   * @param {number} customStartIndex
   */
  heapifyDown(customStartIndex) {
    // 将根元素或某个元素和它的子元素中最小的比较，如果根元素比最小的子元素大，则交换，交换后继续进行比较、交换，直到该元素比任何一个子元素都小为止
    let currentIndex = customStartIndex || 0
    let nextIndex = null
    while (this.hasLeftChild(currentIndex)) {
      // 获取两个子元素中最小的一个
      if (
        this.hasRightChild(currentIndex) &&
        this.compare.lessThan(
          this.rightChild(currentIndex),
          this.leftChild(currentIndex)
        )
      ) {
        nextIndex = this.getRightChildIndex(currentIndex)
      } else {
        nextIndex = this.getLeftChildIndex(currentIndex)
      }

      //如果该元素比最小的子元素还小，good，什么都不需要做
      if (
        this.compare.lessThan(
          this.heapContainer[currentIndex],
          this.heapContainer[nextIndex]
        )
      ) {
        break
      }

      this.swap(currentIndex, nextIndex)
      currentIndex = nextIndex
    }
  }
  /**
   * @return {boolean}
   */
  isEmpty() {
    return !this.heapContainer.length
  }
  /**
   * @return {string}
   */
  toString() {
    return this.heapContainer.toString()
  }
}
