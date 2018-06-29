import PriorityQueue from '../PriorityQueue'

describe('PriorityQueue', () => {
  it('should create defualt priority queue', () => {
    const priorityQueue = new PriorityQueue()
    expect(priorityQueue).toBeDefined()
  })
  it('should insert items to the queue and respect priorities', () => {
    const priorityQueue = new PriorityQueue()
    priorityQueue.add(10, 1)
    expect(priorityQueue.peek()).toBe(10)

    priorityQueue.add(11, 0)
    expect(priorityQueue.peek()).toBe(11)
  })
  it('should poll from queue with respect to prioprities', () => {
    const priorityQueue = new PriorityQueue()
    priorityQueue.add(5, 1)
    priorityQueue.add(4, 2)
    priorityQueue.add(8, 0)
    priorityQueue.add(9, 0)

    expect(priorityQueue.poll()).toBe(8)
    expect(priorityQueue.poll()).toBe(9)
    expect(priorityQueue.poll()).toBe(5)
    expect(priorityQueue.poll()).toBe(4)
  })
  it('should be possible to change priority of internal nodes', () => {
    const priorityQueue = new PriorityQueue()
    priorityQueue.add(5, 1)
    priorityQueue.add(4, 2)
    priorityQueue.add(8, 0)
    priorityQueue.add(8, 0)

    priorityQueue.changePriority(8, 3)
    priorityQueue.changePriority(5, 0)

    expect(priorityQueue.toString()).toBe('5,8,4')
  })
  it('shoule be possible to change priority of head node', () => {
    const priorityQueue = new PriorityQueue()
    priorityQueue.add(5, 1)
    priorityQueue.add(4, 2)
    priorityQueue.add(8, 0)
    priorityQueue.add(9, 0)

    priorityQueue.changePriority(9, 10)
    priorityQueue.changePriority(5, 10)
    expect(priorityQueue.poll()).toBe(8)
    expect(priorityQueue.poll()).toBe(4)
    expect(priorityQueue.poll()).toBe(5)
    expect(priorityQueue.poll()).toBe(9)
  })
  it('should be possible to change priority along with node addition', () => {
    const priorityQueue = new PriorityQueue()
    priorityQueue.add(5, 1)
    priorityQueue.add(4, 2)
    priorityQueue.add(8, 0)
    priorityQueue.add(9, 0)

    priorityQueue.changePriority(9, 10)
    priorityQueue.changePriority(5, 10)
    priorityQueue.add(1, 8)

    expect(priorityQueue.poll()).toBe(8)
    expect(priorityQueue.poll()).toBe(4)
    expect(priorityQueue.poll()).toBe(1)
    expect(priorityQueue.poll()).toBe(5)
    expect(priorityQueue.poll()).toBe(9)
  })
  it('should be possible to search in priority queue by value', () => {
    const priorityQueue = new PriorityQueue()
    priorityQueue.add(5, 1)
    priorityQueue.add(4, 2)
    priorityQueue.add(8, 0)
    priorityQueue.add(9, 0)
    priorityQueue.add(1, 8)

    expect(priorityQueue.hasValue(9)).toBeTruthy()
    expect(priorityQueue.hasValue(100)).toBeFalsy()
  })
})
