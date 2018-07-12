import BinaryTreeNode from '../BinaryTreeNode'
import Comparator from '../../../utils/Comparator'

export default class BinarySearchTreeNode extends BinaryTreeNode {
  /**
   *
   * @param {*} node value
   * @param {*} compareFunction
   */
  constructor(value = null, compareFunction = undefined) {
    super(value)
    this.compareFunction = compareFunction
    this.nodeValueComparator = new Comparator(compareFunction)
  }
  /**
   * 插入子节点
   * @param {*} value
   * @return {BinarySearchTreeNode}
   */
  insert(value) {
    if (this.nodeValueComparator.equal(this.value, null)) {
      this.value = value
      return this
    }
    // 插入的节点比本节点小，应插入到左边
    if (this.nodeValueComparator.lessThan(value, this.value)) {
      if (this.left) {
        return this.left.inset(value)
      }
      const newNode = new BinarySearchTreeNode(value, this.compareFunction)
      this.setLeft(newNode)
      return newNode
    }
    // 插入的节点大于本节点，应插入到右边
    if (this.nodeValueComparator.greaterThan(value, this.value)) {
      if (this.right) {
        return this.right.insert(value)
      }
      const newNode = new BinarySearchTreeNode(value, this.compareFunction)
      this.setRight(newNode)

      return newNode
    }
    return this
  }
  /**
   * 查询某个节点
   * @param {*} value
   * @return {BinarySearchTreeNode}
   */
  find(value) {
    // 要查询的节点与本节点相等，返回本节点
    if (this.nodeValueComparator.equal(this.value, value)) {
      return this
    }
    // 要查询的节点小于本节点，应沿左树进行查找
    if (this.nodeValueComparator.lessThan(value, this.value) && this.left) {
      return this.left.find(value)
    }
    // 要查询的节点大于本节点，应沿右树进行查找
    if (this.nodeValueComparator.greaterThan(value, this.value) && this.right) {
      return this.right.find(value)
    }
    // 没找到返回null
    return null
  }
  /**
   *
   * @param {*} value
   * @return {boolean}
   */
  contains(value) {
    return !!this.find(value)
  }
  /**
   * 移除某个节点
   * @param {*} value
   */
  remove(value) {
    const nodeToRemove = this.find(value)
    // 没有找到要移除的节点
    if (!nodeToRemove) {
      throw new Error('Item not found in the tree')
    }
    const { parent } = nodeToRemove

    if (!nodeToRemove.left && !nodeToRemove.right) {
      // 要移除的节点没有孩子节点
      if (parent) {
        // 如果该节点有父节点，删除父节点与该节点间的联系
        parent.removeChild(nodeToRemove)
      } else {
        // 如果该节点没有父亲节，将该节点的值设为undefined
        nodeToRemove.setValue(undefined)
      }
    } else if (nodeToRemove.left && nodeToRemove.right) {
      // 要移除的节点有孩子节点且有两个
      // 从要移除的节点的右孩子节点树（较大节点）中找出最小的那个节点，用来替换将要移除的节点
      const nextBiggerNode = nodeToRemove.right.finMin()

      // 如果刚才找到的节点不等于要移除节点的右孩子节点
      if (!this.nodeComparator.equal(nextBiggerNode, nodeToRemove.right)) {
        // 将刚才找到的节点删除
        this.remove(nextBiggerNode.value)
        // 替换为要移除的节点
        nodeToRemove.setValue(nextBiggerNode.value)
      } else {
        // 如果刚才找到的节点等于要移除节点的右孩子节点
        // 将要移除节点的值设为右节点的值
        nodeToRemove.setValue(nodeToRemove.right.value)
        // 并把将要移除节点的右孩子节点直接用它的右子节点替换
        nodeToRemove.setRight(nodeToRemove.right.right)
      }
    } else {
      // 如果要移除的节点只有一个孩子节点
      const childNode = nodeToRemove.left || nodeToRemove.right
      if (parent) {
        // 如果该节点有父节点，用孩子节点替换该节点
        parent.replaceChild(nodeToRemove, childNode)
      } else {
        // 如果该节点没有父节点，将孩子节点复制到该节点去
        BinaryTreeNode.copyNode(childNode, nodeToRemove)
      }
    }
    return true
  }
  /**
   * 查找最小的节点
   * @return {BinarySearchTreeNode}
   */
  finMin() {
    if (!this.left) {
      return this
    }
    return this.left.finMin()
  }
}
