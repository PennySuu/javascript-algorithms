import Trie from '../Trie'

describe('Trie', () => {
  it('should create trie', () => {
    const trie = new Trie()
    expect(trie).toBeDefined()
    expect(trie.head.toString()).toBe('*')
  })
  it('should add words to trie', () => {
    const trie = new Trie()

    trie.addWord('pea')

    expect(trie.head.toString()).toBe('*:p')
    expect(trie.head.getChild('p').toString()).toBe('p:e')

    trie.addWord('per')
    expect(trie.head.toString()).toBe('*:p')
    expect(trie.head.getChild('p').toString()).toBe('p:e')
    expect(
      trie.head
        .getChild('p')
        .getChild('e')
        .toString()
    ).toBe('e:a,r')
  })
  it('should suggest next character', () => {
    const trie = new Trie()
    trie.addWord('cat')
    trie.addWord('cats')
    trie.addWord('car')
    trie.addWord('caption')

    expect(trie.suggesNextCharacters('ca')).toEqual(['t', 'r', 'p'])
    expect(trie.suggesNextCharacters('cat')).toEqual(['s'])
    expect(trie.suggesNextCharacters('cab')).toBeNull()
  })
  it('should check if word exists', () => {
    const trie = new Trie()

    trie.addWord('cat')
    trie.addWord('cats')
    trie.addWord('car')
    trie.addWord('caption')

    expect(trie.doesWordExist('cat')).toBeTruthy()
    expect(trie.doesWordExist('cap')).toBeTruthy()
    expect(trie.doesWordExist('call')).toBeFalsy()
  })
})
