import DisjointSetItem from './DisjointSetItem'

export default class DisjointSet {
  constructor(keyCallback) {
    this.keyCallback = keyCallback
    this.items = {}
  }
  makeSet(itemValue) {
    const disjointSetItem = new DisjointSetItem(itemValue, this.keyCallback)
    if (!this.items[disjointSetItem.getKey()]) {
      this.items[disjointSetItem.getKey()] = disjointSetItem
    }
    return this
  }
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
  union(valueA, valueB) {
    const rootKeyA = this.find(valueA)
    const rootKeyB = this.find(valueB)

    if (rootKeyA === null || rootKeyB === null) {
      throw new Error('One or two values are not in sets')
    }
    if (rootKeyA === rootKeyB) {
      return this
    }
    const rootA = this.items[rootKeyA]
    const rootB = this.items[rootKeyB]

    if (rootA.getRank() < rootB.getRank()) {
      rootB.addChild(rootA)
      return this
    }
    rootA.addChild(rootB)
    return this
  }
  inSameSet(valueA, valueB) {
    const rootKeyA = this.find(valueA)
    const rootKeyB = this.find(valueB)
    if (rootKeyA === null || rootKeyB === null) {
      throw new Error('One or two values are not in sets')
    }
    return rootKeyA === rootKeyB
  }
}
