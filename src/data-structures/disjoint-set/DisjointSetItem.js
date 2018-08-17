export default class DisjointSetItem {
  /**
   * 并查集中的元素
   * @param {*} value
   * @param {function(value:*)} keyCallback
   */
  constructor(value, keyCallback) {
    // 元素的值
    this.value = value
    // 自定义获取元素值的函数
    this.keyCallback = keyCallback
    // 该元素的父元素
    /** @var {DisjointSetItem} this.parent */
    this.parent = null
    // 该元素的孩子元素
    this.children = {}
  }
  /**
   * 获取元素的值
   * @returns {*}
   */
  getKey() {
    if (this.keyCallback) {
      return this.keyCallback(this.value)
    }
    return this.value
  }
  /**
   * 设置元素的父节点
   * @param {DisjointSetItem} parentItem
   * @param {boolean} forceSettingParentChild
   * @returns {DisjointSetItem}
   */
  setParent(parentItem, forceSettingParentChild = true) {
    this.parent = parentItem
    if (forceSettingParentChild) {
      parentItem.addChild(this)
    }
    return this
  }
  /**
   * 为元素添加孩子节点
   * @param {DisjointSetItem} childItem
   * @returns {DisjointSetItem}
   */
  addChild(childItem) {
    this.children[childItem.getKey()] = childItem
    childItem.setParent(this, false)
    return this
  }
  /**
   * 获取该元素的所有孩子
   * @returns {DisjointSetItem[]}
   */
  getChildren() {
    return Object.values(this.children)
  }
  /**
   * 判断元素是否为根节点
   * @returns {boolean}
   */
  isRoot() {
    return this.parent === null
  }
  /**
   * 获取元素的根节点
   * @returns {DisjointSetItem}
   */
  getRoot() {
    return this.isRoot() ? this : this.parent.getRoot()
  }
  /**
   * 获取元素所有后代节点的个数
   * @returns {number}
   */
  getRank() {
    if (this.getChildren().length === 0) {
      return 0
    }
    let rank = 0
    /** @var {DisjointSetItem} child */
    this.getChildren().forEach(child => {
      // 记录child本身
      rank += 1
      // 记录child的孩子元素
      rank += child.getRank()
    })
    return rank
  }
}
