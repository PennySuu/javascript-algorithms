import Comparator from '../Comparator'

describe('Comparator', () => {
  it('should compare with default comparator function', () => {
    const comparator = new Comparator()
    expect(comparator.equal(0, 0)).toBeTruthy()
    expect(comparator.equal(1, 2)).toBeFalsy()

    expect(comparator.lessThan(1, 3)).toBeTruthy()
    expect(comparator.lessThan(3, 1)).toBeFalsy()

    expect(comparator.greaterThan(3, 1)).toBeTruthy()
    expect(comparator.greaterThan(1, 3)).toBeFalsy()

    expect(comparator.lessThanOrEqual(0, 0)).toBeTruthy()
    expect(comparator.lessThanOrEqual(1, 3)).toBeTruthy()
    expect(comparator.lessThanOrEqual(3, 1)).toBeFalsy()

    expect(comparator.greaterThanOrEqual(0, 0)).toBeTruthy()
    expect(comparator.greaterThanOrEqual(3, 1)).toBeTruthy()
    expect(comparator.greaterThanOrEqual(1, 3)).toBeFalsy()
  })

  it('should compare with custom comparator function', () => {
    const comparator = new Comparator((a, b) => {
      if (a.length === b.length) {
        return 0
      }
      return a.length < b.length ? -1 : 1
    })

    expect(comparator.equal('aa', 'ba')).toBeTruthy()
    expect(comparator.equal('a', 'ab')).toBeFalsy()
    expect(comparator.lessThan('a', 'ab')).toBeTruthy()
    expect(comparator.lessThan('ab', 'a')).toBeFalsy()
    expect(comparator.greaterThan('abc', 'c')).toBeTruthy()
    expect(comparator.greaterThan('b', 'a')).toBeFalsy()

    comparator.reverse()

    expect(comparator.lessThan('abc', 'b')).toBeTruthy()
    expect(comparator.greaterThanOrEqual('abc', 'a')).toBeFalsy()
  })
})
