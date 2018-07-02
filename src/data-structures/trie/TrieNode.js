import HasTable from '../hash-table/HashTable'

export default class TrieNode {
  constructor(character, isCompleteWord = false) {
    this.character = character
    this.isCompleteWord = isCompleteWord
    this.children = new HasTable()
  }
  getChild(character) {
    return this.children.get(character)
  }
  addChild(character, isCompleteWord = false) {
    if (!this.children.has(character)) {
      this.children.set(character, new TrieNode(character, isCompleteWord))
    }
    return this.children.get(character)
  }
  hasChild(character) {
    return this.children.has(character)
  }
  suggestChildren() {
    return [...this.children.getKeys()]
  }
  toString() {
    let childrenAsString = this.suggestChildren().toString()
    childrenAsString = childrenAsString ? `:${childrenAsString}` : ''
    const isCompleteWord = this.isCompleteWord ? '*' : ''
    return `${this.character}${isCompleteWord}${childrenAsString}`
  }
}
