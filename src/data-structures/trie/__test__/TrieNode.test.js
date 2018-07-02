import TrieNode from '../TrieNode'

describe('TrieNode', () => {
  it('should create trie node', () => {
    const trieNode = new TrieNode('p', true)

    expect(trieNode.character).toBe('p')
    expect(trieNode.isCompleteWord).toBeTruthy()
    expect(trieNode.toString()).toBe('p*')
  })
  it('sholud add child nodes', () => {
    const trieNode = new TrieNode('p')
    trieNode.addChild('e', false)
    trieNode.addChild('a', true)
    trieNode.addChild('k', true)
    expect(trieNode.toString()).toBe('p:e,a,k')
  })
  it('should get child nodes', () => {
    const trieNode = new TrieNode('p')
    trieNode.addChild('e')
    trieNode.addChild('a', true)
    expect(trieNode.getChild('e').toString()).toBe('e')
    expect(trieNode.getChild('a').toString()).toBe('a*')
    expect(trieNode.getChild('x')).toBeUndefined()
  })
  it('should check if node has specific child', () => {
    const trieNode = new TrieNode('p')
    trieNode.addChild('e')
    trieNode.addChild('a', true)
    expect(trieNode.hasChild('e')).toBeTruthy()
    expect(trieNode.hasChild('a')).toBeTruthy()
    expect(trieNode.hasChild('x')).toBeFalsy()
  })
  it('should suggest next children', () => {
    const trieNode = new TrieNode('p')
    trieNode.addChild('e')
    trieNode.addChild('a', true)
    expect(trieNode.suggestChildren()).toEqual(['e', 'a'])
  })
})
