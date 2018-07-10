import BinarySearchTreeNode from './BinarySearchTreeNode'

export default class BinarySearchTree {
  constructor(nodeValueCompareFunction) {
    this.root = new BinarySearchTreeNode(null, nodeValueCompareFunction)

    this.nodeComparator = this.root.nodeComparator
  }
  insert(value) {
    return this.root.insert(value)
  }
  contains(value) {
    return this.root.contains(value)
  }
  remove(value) {
    return this.root.remove(value)
  }
  toString() {
    return this.root.toString()
  }
}
