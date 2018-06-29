import MinHeap from '../MinHeap'
import Comparator from '../../../utils/Comparator'

describe('MinHeap', () => {
  it('should create an empty min heap', () => {
    const minHeap = new MinHeap()

    expect(minHeap).toBeDefined()
    expect(minHeap.peek()).toBeNull()
    expect(minHeap.isEmpty()).toBeTruthy()
  })
  it('should add items to the heap and heapify it up', () => {
    const minHeap = new MinHeap()

    minHeap.add(5)
    expect(minHeap.isEmpty()).toBeFalsy()
    expect(minHeap.peek()).toBe(5)
    expect(minHeap.toString()).toBe('5')

    minHeap.add(3)
    expect(minHeap.peek()).toBe(3)
    expect(minHeap.toString()).toBe('3,5')

    minHeap.add(10)
    expect(minHeap.peek()).toBe(3)
    expect(minHeap.toString()).toBe('3,5,10')

    minHeap.add(1)
    expect(minHeap.peek()).toBe(1)
    expect(minHeap.toString()).toBe('1,3,10,5')

    minHeap.add(1)
    expect(minHeap.peek()).toBe(1)
    expect(minHeap.toString()).toBe('1,1,10,5,3')

    expect(minHeap.poll()).toBe(1)
    expect(minHeap.toString()).toBe('1,3,10,5')

    expect(minHeap.poll()).toBe(1)
    expect(minHeap.toString()).toBe('3,5,10')

    expect(minHeap.poll()).toBe(3)
    expect(minHeap.toString()).toBe('5,10')
  })
  it('should poll items from the heap and heapify it down', () => {
    const minHeap = new MinHeap()

    minHeap.add(9)
    minHeap.add(14)
    minHeap.add(8)
    minHeap.add(28)
    minHeap.add(11)
    minHeap.add(27)

    expect(minHeap.toString()).toBe('8,11,9,28,14,27')

    expect(minHeap.poll()).toBe(8)
    expect(minHeap.toString()).toBe('9,11,27,28,14')

    expect(minHeap.poll()).toBe(9)
    expect(minHeap.toString()).toBe('11,14,27,28')

    expect(minHeap.poll()).toBe(11)
    expect(minHeap.toString()).toBe('14,28,27')

    expect(minHeap.poll()).toBe(14)
    expect(minHeap.toString()).toBe('27,28')

    expect(minHeap.poll()).toBe(27)
    expect(minHeap.toString()).toBe('28')

    expect(minHeap.poll()).toBe(28)
    expect(minHeap.toString()).toBe('')

    expect(minHeap.poll()).toBeNull()
    expect(minHeap.toString()).toBe('')
  })

  it('should heapigy down through the right branch as well', () => {
    const minHeap = new MinHeap()

    minHeap.add(1)
    minHeap.add(10)
    minHeap.add(8)

    expect(minHeap.toString()).toBe('1,10,8')

    minHeap.add(9)
    expect(minHeap.toString()).toBe('1,9,8,10')

    expect(minHeap.poll()).toBe(1)
    expect(minHeap.toString()).toBe('8,9,10')
  })

  it('should be possible to find item indices in heap', () => {
    const minHeap = new MinHeap()

    minHeap.add(8)
    minHeap.add(18)
    minHeap.add(8)
    minHeap.add(28)
    minHeap.add(9)
    minHeap.add(14)

    expect(minHeap.toString()).toBe('8,9,8,28,18,14')

    expect(minHeap.find(8)).toEqual([0, 2])
    expect(minHeap.find(9)).toEqual([1])
    expect(minHeap.find(1)).toEqual([])
  })
  it('should be possible to remove items from heap with heapify down', () => {
    const minHeap = new MinHeap()

    minHeap.add(1)
    minHeap.add(5)
    minHeap.add(2)
    minHeap.add(3)
    minHeap.add(8)
    minHeap.add(6)

    expect(minHeap.toString()).toBe('1,3,2,5,8,6')
    expect(minHeap.remove(1).toString()).toBe('2,3,6,5,8')
    expect(minHeap.remove(3).toString()).toBe('2,5,6,8')
  })
  it('should be possible to remove items from heap with heapify up', () => {
    const minHeap = new MinHeap()

    minHeap.add(3)
    minHeap.add(10)
    minHeap.add(5)
    minHeap.add(11)
    minHeap.add(12)
    minHeap.add(6)
    minHeap.add(7)
    minHeap.add(15)
    minHeap.add(16)
    minHeap.add(13)
    minHeap.add(14)
    minHeap.add(8)

    expect(minHeap.toString()).toBe('3,10,5,11,12,6,7,15,16,13,14,8')
    expect(minHeap.remove(11).toString()).toBe('3,8,5,10,12,6,7,15,16,13,14')
  })

  it('should be possible to remove items from heap with', () => {
    const minHeap = new MinHeap()
    minHeap.add('dddd')
    minHeap.add('ccc')
    minHeap.add('bb')
    minHeap.add('a')

    expect(minHeap.toString()).toBe('a,bb,ccc,dddd')
    const comparator = new Comparator((a, b) => {
      if (a.length === b.length) {
        return 0
      }
      return a.length < b.length ? -1 : 1
    })
    minHeap.remove('hey', comparator)
    expect(minHeap.toString()).toBe('a,bb,dddd')
  })
})
