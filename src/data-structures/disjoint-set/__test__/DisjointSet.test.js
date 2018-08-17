import DisjointSet from '../DisjointSet'

describe('DisjointSet', () => {
  it('should throw error when trying to union and check not existing sets', () => {
    function mergeNotExistingSets() {
      const disjointSet = new DisjointSet()
      disjointSet.union('A', 'B')
    }
    function checkNotExistingSets() {
      const disjointSet = new DisjointSet()
      disjointSet.inSameSet('A', 'B')
    }
    expect(mergeNotExistingSets).toThrow()
    expect(checkNotExistingSets).toThrow()
  })
  it('should do basic manipulations on disjoint set', () => {
    const disjoint = new DisjointSet()
    expect(disjoint.find('A')).toBeNull()
    expect(disjoint.find('B')).toBeNull()

    disjoint.makeSet('A')

    expect(disjoint.find('A')).toBe('A')
    expect(disjoint.find('B')).toBeNull()

    disjoint.makeSet('B')
    expect(disjoint.find('A')).toBe('A')
    expect(disjoint.find('B')).toBe('B')

    disjoint.makeSet('C')

    expect(disjoint.inSameSet('A', 'B')).toBe(false)

    disjoint.union('A', 'B')
    expect(disjoint.find('A')).toBe('A')
    expect(disjoint.find('B')).toBe('A')
    expect(disjoint.inSameSet('A', 'B')).toBe(true)
    expect(disjoint.inSameSet('B', 'A')).toBe(true)
    expect(disjoint.inSameSet('C', 'A')).toBe(false)

    disjoint.union('A', 'A')
    disjoint.union('B', 'C')
    expect(disjoint.find('A')).toBe('A')
    expect(disjoint.find('B')).toBe('A')
    expect(disjoint.find('C')).toBe('A')

    expect(disjoint.inSameSet('A', 'B')).toBe(true)
    expect(disjoint.inSameSet('B', 'A')).toBe(true)
    expect(disjoint.inSameSet('C', 'A')).toBe(true)

    disjoint
      .makeSet('E')
      .makeSet('F')
      .makeSet('G')
      .makeSet('H')
      .makeSet('I')

    disjoint
      .union('E', 'F')
      .union('F', 'G')
      .union('G', 'H')
      .union('H', 'I')

    expect(disjoint.inSameSet('A', 'I')).toBe(false)
    expect(disjoint.inSameSet('E', 'I')).toBe(true)

    disjoint.union('I', 'C')
    expect(disjoint.find('C')).toBe('E')
    expect(disjoint.find('I')).toBe('E')
    expect(disjoint.inSameSet('A', 'I')).toBe(true)
  })
  it('should union smaller set with bigger one making bigger one to be new root', () => {
    const disjointSet = new DisjointSet()
    disjointSet
      .makeSet('A')
      .makeSet('B')
      .makeSet('C')
      .union('B', 'C')
      .union('A', 'C')

    expect(disjointSet.find('A')).toBe('B')
  })
  it('should do basic manipulations on disjoint set with custom key extractor', () => {
    const keyExtractor = value => value.key
    const disjointSet = new DisjointSet(keyExtractor)
    const itemA = { key: 'A', value: 1 }
    const itemB = { key: 'B', value: 2 }
    const itemC = { key: 'C', value: 3 }

    expect(disjointSet.find(itemA)).toBeNull()
    expect(disjointSet.find(itemB)).toBeNull()

    disjointSet.makeSet(itemA)
    expect(disjointSet.find(itemA)).toBe('A')
    expect(disjointSet.find(itemB)).toBeNull()

    disjointSet.makeSet(itemB)
    expect(disjointSet.find(itemB)).toBe('B')

    disjointSet.makeSet(itemC)
    expect(disjointSet.inSameSet(itemA, itemB)).toBe(false)

    disjointSet.union(itemA, itemB)

    expect(disjointSet.find(itemA)).toBe('A')
    expect(disjointSet.find(itemB)).toBe('A')
    expect(disjointSet.inSameSet(itemA, itemB)).toBe(true)
    expect(disjointSet.inSameSet(itemB, itemA)).toBe(true)
    expect(disjointSet.inSameSet(itemA, itemC)).toBe(false)

    disjointSet.union(itemA, itemC)
    expect(disjointSet.find(itemA)).toBe('A')
    expect(disjointSet.find(itemB)).toBe('A')
    expect(disjointSet.find(itemC)).toBe('A')
    expect(disjointSet.inSameSet(itemA, itemB)).toBe(true)
    expect(disjointSet.inSameSet(itemB, itemA)).toBe(true)
    expect(disjointSet.inSameSet(itemA, itemC)).toBe(true)
  })
})
