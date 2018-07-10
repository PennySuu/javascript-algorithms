import Comparator from '../../utils/Comparator'
import HashTable from '../hash-table/HashTable'

export default class BinaryTreeNode {
  /**
   *
   * @param {*} value
   */
  constructor(value = null) {
    // 左节点
    this.left = null
    // 右节点
    this.right = null
    // 父节点
    this.parent = null
    // 节点值
    this.value = value
    // 存储节点的元数据
    this.meta = new HashTable()
    // 比较二叉树节点
    this.nodeComparator = new Comparator()
  }
  /**
   * @return {number}
   */
  get leftHeight() {
    if (!this.left) {
      return 0
    }
    return this.left.height + 1
  }
  /**
   * @return {number}
   */
  get rightHeight() {
    if (!this.right) {
      return 0
    }
    return this.right.height + 1
  }
  /**
   * 获取树的深度
   * @return {number}
   */
  get height() {
    return Math.max(this.leftHeight, this.rightHeight)
  }
  /**
   * @return {number}
   */
  get balanceFactor() {
    return (this.leftHeight = this.rightHeight)
  }
  /**
   * 获取父节点的兄弟节点
   */
  get uncle() {
    // 判断是否有父节点
    if (!this.parent) {
      return undefined
    }
    // 判断父节点是否有父节点
    if (!this.parent.parent) {
      return undefined
    }
    // 判断祖父节点是否有两个孩子节点
    if (!this.parent.parent.left || !this.parent.parent.right) {
      return undefined
    }
    // 判断祖父节点的左节点是否是父节点
    if (this.nodeComparator.equal(this.parent, this.parent.parent.left)) {
      // 父节点的兄弟节点是右节点
      return ths.parent.parent.right
    }
    // 父节点的兄弟节点是左节点
    return this.parent.parent.left
  }
  /**
   *
   * @param {*} value
   * @return {BinaryTreeNode}
   */
  setValue(value) {
    this.value = value
    return this
  }
  /**
   *
   * @param {BinaryTreeNode} node
   * @return {BinaryTreeNode}
   */
  setLeft(node) {
    // 重置左节点的父节点，因为左节点可能会被置为空，空节点没有父节点
    if (this.left) {
      this.left.parent = null
    }
    this.left = node
    if (this.left) {
      this.left.parent = this
    }
    return this
  }
  /**
   *
   * @param {BinaryTreeNode} node
   * @return {BinaryTreeNode}
   */
  setRight(node) {
    if (this.right) {
      this.left.parent = null
    }
    this.right = node
    if (node) {
      this.right.parent = this
    }
    return this
  }
  /**
   *
   * @param {BinaryTreeNode} nodeToRemove
   * @return {boolean}
   */
  removeChild(nodeToRemove) {
    if (this.left && this.nodeComparator.equal(this.left, nodeToRemove)) {
      this.left = null
      return true
    }
    if (this.right && this.nodeComparator.equal(this.right, nodeToRemove)) {
      this.right = null
      return true
    }
    return false
  }
  /**
   *
   * @param {BinaryTreeNode} nodeToReplace
   * @param {BinaryTreeNode} replacementNode
   * @return {boolean}
   */
  replaceChild(nodeToReplace, replacementNode) {
    if (!nodeToReplace || !replacementNode) {
      return false
    }
    if (this.left && this.nodeComparator.equal(this.left, nodeToReplace)) {
      this.left = replacementNode
      return true
    }
    if (this.right && this.nodeComparator.equal(this.right, nodeToReplace)) {
      this.right = replacementNode
      return true
    }
    return false
  }
  /**
   *
   * @param {BinaryTreeNode} sourceNode
   * @param {BinaryTreeNode} targetNode
   */
  static copyNode(sourceNode, targetNode) {
    targetNode.setValue(sourceNode.value)
    targetNode.setLeft(sourceNode.left)
    targetNode.setRight(sourceNode.right)
  }
  /**
   * 获取中根遍历的值
   */
  traverseInOrder() {
    let traverse = []
    // 左节点
    if (this.left) {
      traverse = traverse.concat(this.left.traverseInOrder())
    }
    // 根节点
    traverse.push(this.value)
    // 右节点
    if (this.right) {
      traverse = traverse.concat(this.right.traverseInOrder())
    }
    return traverse
  }
  toString() {
    return this.traverseInOrder().toString()
  }
}
