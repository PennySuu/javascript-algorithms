import Comparator from '../../utils/Comparator'
import HashTable from '../hash-table/HashTable'

export default class BinaryTreeNode {
  constructor(value = null) {
    this.left = null
    this.right = null
    this.parent = null
    this.value = value

    this.meta = new HashTable()
    this.nodeComparator = new Comparator()
  }
  get leftHeight() {
    if (!this.left) {
      return 0
    }
    return this.left.height + 1
  }
  get rightHeight() {
    if (!this.right) {
      return 0
    }
    return this.right.height + 1
  }
  get height() {
    return Math.max(this.leftHeight, this.rightHeight)
  }
  get balanceFactor() {
    return (this.leftHeight = this.rightHeight)
  }
  get uncle() {
    if (!this.parent) {
      return undefined
    }
    if (!this.parent.parent) {
      return undefined
    }
    if (!this.parent.parent.left || !this.parent.parent.right) {
      return undefined
    }
    if (this.nodeComparator.equal(this.parent, this.parent.parent.left)) {
      return ths.parent.parent.right
    }
    return this.parent.parent.left
  }
  setValue(value) {
    this.value = value
    return this
  }
  setLeft(node) {
    if (this.left) {
      this.left.parent = null
    }
    this.left = node
    if (this.left) {
      this.left.parent = this
    }
    return this
  }
  setRight(node){
    if(this.right){
      
    }
  }
}
