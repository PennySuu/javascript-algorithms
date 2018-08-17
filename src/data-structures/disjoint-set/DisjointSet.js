import DisjointSetItem from './DisjointSetItem'

export default class DisjointSet {
  /**
   * 并查集
   * @param {function(value:*)} keyCallback
   */
  constructor(keyCallback) {
    this.keyCallback = keyCallback
    // 集合中的元素
    this.items = {}
  }
  /**
   * 构造并查集中的元素
   * @param {*} itemValue
   * @returns {DisjointSet}
   */
  makeSet(itemValue) {
    const disjointSetItem = new DisjointSetItem(itemValue, this.keyCallback)
    // 如果之前没添加过，再进行添加
    if (!this.items[disjointSetItem.getKey()]) {
      this.items[disjointSetItem.getKey()] = disjointSetItem
    }
    return this
  }
  /**
   * 查找某个元素属于哪个集合
   * @param {*} itemValue
   * @returns {string|null}
   */
  find(itemValue) {
    const templateDisjointItem = new DisjointSetItem(
      itemValue,
      this.keyCallback
    )
    const requireDisjointItem = this.items[templateDisjointItem.getKey()]

    if (!requireDisjointItem) {
      return null
    }
    return requireDisjointItem.getRoot().getKey()
  }
  /**
   * Rank合并
   * @param {*} valueA
   * @param {*} valueB
   * @returns {DisjointSet}
   */
  union(valueA, valueB) {
    const rootKeyA = this.find(valueA)
    const rootKeyB = this.find(valueB)

    if (rootKeyA === null || rootKeyB === null) {
      throw new Error('One or two values are not in sets')
    }
    // 如果两个元素已经在同一个集合中直接返回
    if (rootKeyA === rootKeyB) {
      return this
    }

    const rootA = this.items[rootKeyA]
    const rootB = this.items[rootKeyB]

    // 如果rootB树比rootA树大，rootB作为根节点
    if (rootA.getRank() < rootB.getRank()) {
      rootB.addChild(rootA)
      return this
    }
    // 否则rootA作为根节点
    rootA.addChild(rootB)
    return this
  }
  /**
   * 判断两个元素是否在同一个集合
   * @param {*} valueA
   * @param {*} valueB
   * @returns {boolean}
   */
  inSameSet(valueA, valueB) {
    const rootKeyA = this.find(valueA)
    const rootKeyB = this.find(valueB)
    if (rootKeyA === null || rootKeyB === null) {
      throw new Error('One or two values are not in sets')
    }
    return rootKeyA === rootKeyB
  }
}
